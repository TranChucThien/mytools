// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL / BASE_PATH come from actions/configure-pages in CI, so the same build
// works on https://<user>.github.io/<repo>/ and on the custom domain at "/".
export default defineConfig({
  site: process.env.SITE_URL || 'https://congcumienphi.id.vn',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
