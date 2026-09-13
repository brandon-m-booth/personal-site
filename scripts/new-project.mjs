#!/usr/bin/env node
// Usage: npm run new:project -- "My Project Title"
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Usage: npm run new:project -- "My Project Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const dir = join(__dirname, '..', 'src', 'content', 'projects');
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const filePath = join(dir, `${slug}.md`);
if (existsSync(filePath)) {
  console.error(`A project already exists at ${filePath}`);
  process.exit(1);
}

const contents = `---
title: "${title.replace(/"/g, '\\"')}"
category: research # research | personal | work
summary: "One or two sentence summary shown on the projects index card."
dates: "2026-present"
organization: ""
order: 0
image: "" # e.g. /images/projects/your-image.jpg (put the file in public/images/projects/)
imageAlt: ""
links: []
  # - label: "Paper (PDF)"
  #   url: "https://example.com/paper.pdf"
  # - label: "Code"
  #   url: "https://github.com/you/repo"
tags: []
draft: true
featured: false
---

Write the full project description, updates, and pictures here in Markdown.

## Updates

- **2026-09-12**: Project page created.
`;

writeFileSync(filePath, contents);
console.log(`Created ${filePath}`);
console.log('It is marked draft: true - flip to false when ready to publish.');
