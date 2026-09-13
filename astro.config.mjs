// @ts-check
import { defineConfig } from 'astro/config';

// This site is deployed to GitHub Pages at the apex domain brandonmbooth.net
// (see public/CNAME). Because it's a custom domain, `base` stays "/".
export default defineConfig({
  site: 'https://www.brandonmbooth.net',
  base: '/',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
