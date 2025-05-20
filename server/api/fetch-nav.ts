import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { defineEventHandler, getQuery, createError } from 'h3';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const type = query.type;

  if (
    typeof type !== 'string' ||
    !['main', 'tools', 'options', 'styles'].includes(type)
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid nav type' });
  }

  // Path relative to this file
  const filePath = join(__dirname, '..', '..', 'lib', 'mock-data', `${type}-nav.json`);

  try {
    console.log('Reading nav file:', filePath);
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read nav file:', err);
    throw createError({ statusCode: 500, statusMessage: `Navigation data not found` });
  }
});
