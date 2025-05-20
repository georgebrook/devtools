import { readFile } from 'fs/promises';
import { join } from 'path';
import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async(event) => {
  const filePath = join(process.cwd(), 'public', 'mock-data', 'styles.json');

  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read styles.json:', err);
    throw createError({ statusCode: 500, statusMessage: 'Styles data not found' });
  }
});
