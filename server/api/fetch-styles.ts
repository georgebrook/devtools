import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async(event) => {
  try {
    const protocol = event.node.req.headers['x-forwarded-proto'] || 'https';
    const host = event.node.req.headers.host;
    const url = `${protocol}://${host}/mock-data/styles.json`;

    const response = await fetch(url);
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
