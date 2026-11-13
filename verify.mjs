import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const html = await readFile(new URL('index.html', import.meta.url), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Element IDs must be unique');
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const value = match[1];
  if (value.startsWith('#')) assert(ids.includes(value.slice(1)), `Missing anchor ${value}`);
  else if (!/^(https?:|mailto:|tel:)/.test(value)) await access(new URL(value, import.meta.url));
}
for (const match of html.matchAll(/(?:aria-controls|aria-labelledby|data-dialog)="([^"]+)"/g)) assert(ids.includes(match[1]), `Missing accessible target ${match[1]}`);
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'One primary heading');
for (const text of ['Executive Landscaping Inc.', 'Oct 2026', 'May 2025 – Aug 2026', 'Nov 2023 – May 2024', 'Feb 2022 – Aug 2023', '81 tables', '75 row-level security policies', '240+', '500K+', '35%', 'AI-102', 'GPA 3.7', 'vasusvs111@gmail.com']) assert(html.includes(text), `Missing resume fact: ${text}`);
for (const stale of ['Capital One', 'Cognizant', 'vasu.mekala@applywizard.ai', 'AWS Certified', 'Claude Certified', '96.4%', '94.2%', 'Stamford', 'M.S. Data Science']) assert(!html.includes(stale), `Outdated reference content: ${stale}`);
const pdf = await readFile(new URL('Vasu_Mekala_AI_ML_Engineer_Resume.pdf', import.meta.url));
assert.equal(createHash('sha256').update(pdf).digest('hex'), '93b1573a940d0d21b9135565ca2a8c1614222e0c5592f4cd826b84205cc0527e', 'Download must match supplied resume v15');
assert.equal((html.match(/data-category=/g) || []).length, 33, 'Skill count matches visible summary');
console.log('PASS: local links, anchor targets, unique IDs, dialog/tab targets, resume facts, stale-content exclusions, 33 skills, and resume PDF checksum.');
