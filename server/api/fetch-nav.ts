import { readFile } from 'fs/promises';
import { join } from 'path';
import { defineEventHandler, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const type = query.type;

  if (
    typeof type !== 'string' ||
    !['main', 'tools', 'options', 'styles'].includes(type)
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid nav type' });
  }

  const filePath = join(process.cwd(), 'lib', 'mock-data', `${type}-nav.json`);

  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: 'Navigation data not found' });
  }
});
