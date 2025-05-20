import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async(event) => {
  try {
    const response = await fetch(`${event.node.req.headers.origin}/mock-data/styles.json`);
    if (!response.ok) {
      throw new Error('Styles data not found');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch styles.json:', err);
    throw createError({ statusCode: 500, statusMessage: 'Styles data not found' });
  }
});
