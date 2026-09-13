---
# Removed at Brandon's request - kept only as a draft (excluded from the blog index/RSS and,
# in production builds, from its own page too) since no delete-capable tool is available to
# remove this file outright. Safe to delete this file whenever convenient.
title: "Welcome to the new site"
description: "This site replaces my old Weebly page and is now fully self-hosted from a git repo."
date: 2026-09-12
tags: ["meta"]
draft: true
---

This is a sample post to show how blogging works on the new site. Every post is just a
Markdown file in `src/content/blog/`, with a small block of metadata (title, date, tags) at
the top called "frontmatter."

To write a new post, run:

```bash
npm run new:post -- "My Post Title"
```

which creates a new file pre-filled with today's date and a title slug, ready to edit. Delete
this post whenever you're ready to publish your first real one.
