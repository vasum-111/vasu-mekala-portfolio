import { mkdir, copyFile } from 'node:fs/promises';
const files = ['index.html', 'styles.css', 'app.js', 'favicon.svg', 'Vasu_Mekala_AI_ML_Engineer_Resume.pdf'];
await mkdir(new URL('./dist/', import.meta.url), { recursive: true });
for (const file of files) await copyFile(new URL(file, import.meta.url), new URL(`dist/${file}`, import.meta.url));
console.log(`Built ${files.length} static files in dist/.`);
