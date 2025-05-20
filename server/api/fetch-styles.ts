import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { defineEventHandler, createError } from 'h3';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineEventHandler(async() => {
  const filePath = join(__dirname, '..', '..', 'lib', 'mock-data', 'styles.json');

  try {
    console.log('Reading styles file:', filePath);
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read styles.json:', err);
    throw createError({ statusCode: 500, statusMessage: 'Styles data not found' });
  }
});
