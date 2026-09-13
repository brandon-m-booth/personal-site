#!/usr/bin/env node
// Reads every *.bib file in src/data/publications/, parses it, and produces:
//   - src/data/publications.generated.json   (used by the Astro pages at build time)
//   - public/publications.json               (same data, fetched by the client-side
//                                              search/sort/filter UI in the browser)
//
// This runs automatically before `astro dev` and `astro build` (see package.json
// "predev"/"prebuild" scripts) so you never have to run it by hand - just edit the
// .bib file(s) and restart/rebuild.
//
// Each publication renders in four formats: APA, MLA, Chicago (author-date), and
// raw BibTeX (copied verbatim from your source file, not re-serialized, so it always
// matches exactly what you pasted in).

import '@citation-js/plugin-bibtex';
import { plugins, Cite } from '@citation-js/core';
import '@citation-js/plugin-csl';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUB_DIR = join(ROOT, 'src', 'data', 'publications');
const CSL_DIR = join(ROOT, 'src', 'data', 'csl-styles');
const OUT_DATA = join(ROOT, 'src', 'data', 'publications.generated.json');
const OUT_PUBLIC = join(ROOT, 'public', 'publications.json');

// Register the extra CSL styles we ship in src/data/csl-styles/ (citation-js only
// bundles apa/vancouver/harvard1 out of the box).
const csl = plugins.config.get('@csl');
csl.templates.add('mla', readFileSync(join(CSL_DIR, 'mla.csl'), 'utf-8'));
csl.templates.add('chicago', readFileSync(join(CSL_DIR, 'chicago-author-date.csl'), 'utf-8'));

function readAllBibFiles() {
  if (!existsSync(PUB_DIR)) return '';
  const files = readdirSync(PUB_DIR).filter((f) => f.endsWith('.bib'));
  return files.map((f) => readFileSync(join(PUB_DIR, f), 'utf-8')).join('\n\n');
}

// citation-js's bibtex->CSL-JSON conversion only keeps fields that map to a known
// CSL variable, so custom fields like `category` and `pdf` get silently dropped.
// We recover them ourselves with a light-touch scan of the raw source, and we also
// grab each entry's own raw BibTeX text (rather than re-serializing through
// citation-js) so the "BibTeX" citation format shown on the site is byte-for-byte
// what you pasted in.
function extractRawFieldsByKey(rawBib) {
  const byKey = {};
  // Split on entry starts: @type{key,
  const entryStart = /@(\w+)\s*\{\s*([^\s,]+)\s*,/g;
  const matches = [...rawBib.matchAll(entryStart)];

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const key = match[2];
    const start = match.index;
    const end = i + 1 < matches.length ? matches[i + 1].index : rawBib.length;
    let block = rawBib.slice(start, end);

    // Trim the block to just this entry (drop trailing blank lines / next entry's
    // leading whitespace) by cutting at the last top-level closing brace.
    const lastBrace = block.lastIndexOf('}');
    if (lastBrace !== -1) block = block.slice(0, lastBrace + 1);

    const categoryMatch = block.match(/\bcategory\s*=\s*\{([^}]*)\}/i);
    const pdfMatch = block.match(/\bpdf\s*=\s*\{([^}]*)\}/i);
    // citation-js's bibtex->CSL URL handling can mangle already-percent-encoded
    // URLs (e.g. "%2B" becomes "%252B"), so we take the url field straight from
    // the source text ourselves rather than trusting entry.URL.
    const urlMatch = block.match(/\burl\s*=\s*\{([^}]*)\}/i);

    byKey[key] = {
      category: categoryMatch ? categoryMatch[1].trim().toLowerCase() : null,
      pdf: pdfMatch ? pdfMatch[1].trim() : null,
      url: urlMatch ? urlMatch[1].trim() : null,
      rawBibtex: block.trim(),
    };
  }
  return byKey;
}

function fallbackCategory(cslType) {
  switch (cslType) {
    case 'article-journal':
      return 'journal';
    case 'paper-conference':
      return 'conference';
    case 'book':
      return 'book';
    case 'patent':
    case 'document':
      return 'patent';
    case 'manuscript':
    case 'speech':
      return 'unpublished';
    case 'article':
    case 'post-weblog':
      return 'preprint';
    default:
      return 'other';
  }
}

const CATEGORY_LABELS = {
  journal: 'Journal Articles',
  conference: 'Conference Papers',
  book: 'Books',
  patent: 'Patents',
  preprint: 'Preprints',
  unpublished: 'Unpublished',
  other: 'Other',
};

function formatAuthors(authorList) {
  if (!authorList || authorList.length === 0) return '';
  return authorList
    .map((a) => {
      if (a.literal) return a.literal;
      return [a.given, a.family].filter(Boolean).join(' ');
    })
    .join(', ');
}

function safeFormat(cite, template) {
  try {
    return cite.format('bibliography', { format: 'html', template, lang: 'en-US' }).trim();
  } catch (err) {
    console.warn(`  ! Failed to format with template "${template}":`, err.message);
    return '';
  }
}

function main() {
  const rawBib = readAllBibFiles();
  if (!rawBib.trim()) {
    console.warn('No .bib files found in src/data/publications/ - writing an empty list.');
    writeJson([]);
    return;
  }

  const rawFieldsByKey = extractRawFieldsByKey(rawBib);
  const cite = new Cite(rawBib);

  const entries = cite.data.map((entry) => {
    const extra = rawFieldsByKey[entry.id] || {};
    const category = extra.category || fallbackCategory(entry.type);
    const year =
      entry.issued && entry.issued['date-parts'] && entry.issued['date-parts'][0]
        ? entry.issued['date-parts'][0][0]
        : null;
    const venue = entry['container-title'] || entry.publisher || '';
    const single = new Cite([entry]);

    return {
      id: entry.id,
      title: entry.title || '(untitled)',
      authors: formatAuthors(entry.author),
      year,
      venue,
      type: entry.type,
      category,
      categoryLabel: CATEGORY_LABELS[category] || 'Other',
      note: entry.note || '',
      url: extra.url || entry.URL || extra.pdf || '',
      pdf: extra.pdf || '',
      formats: {
        apa: safeFormat(single, 'apa'),
        mla: safeFormat(single, 'mla'),
        chicago: safeFormat(single, 'chicago'),
        bibtex: extra.rawBibtex || '',
      },
    };
  });

  // Default sort: newest first, then title.
  entries.sort((a, b) => {
    if ((b.year || 0) !== (a.year || 0)) return (b.year || 0) - (a.year || 0);
    return a.title.localeCompare(b.title);
  });

  writeJson(entries);
  console.log(`Built ${entries.length} publication entries.`);
}

function writeJson(entries) {
  mkdirSync(dirname(OUT_DATA), { recursive: true });
  mkdirSync(dirname(OUT_PUBLIC), { recursive: true });
  const json = JSON.stringify(entries, null, 2);
  writeFileSync(OUT_DATA, json);
  writeFileSync(OUT_PUBLIC, json);
}

main();
