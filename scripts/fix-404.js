import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve('dist');
const indexFile = resolve(distDir, 'index.html');
const fourOhFourFile = resolve(distDir, '404.html');

if (existsSync(indexFile)) {
    copyFileSync(indexFile, fourOhFourFile);
    console.log('✅ Copied dist/index.html to dist/404.html for GitHub Pages SPA support.');
} else {
    console.error('❌ dist/index.html not found. Build probably failed.');
    process.exit(1);
}
