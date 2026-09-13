#!/usr/bin/env node
// Usage: npm run new:post -- "My Post Title"
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Usage: npm run new:post -- "My Post Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const today = new Date().toISOString().slice(0, 10);
const dir = join(__dirname, '..', 'src', 'content', 'blog');
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const filePath = join(dir, `${slug}.md`);
if (existsSync(filePath)) {
  console.error(`A post already exists at ${filePath}`);
  process.exit(1);
}

const contents = `---
title: "${title.replace(/"/g, '\\"')}"
description: ""
date: ${today}
tags: []
draft: true
---

Write your post here.
`;

writeFileSync(filePath, contents);
console.log(`Created ${filePath}`);
console.log('It is marked draft: true - flip to false when ready to publish.');
