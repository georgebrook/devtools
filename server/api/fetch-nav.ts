import { defineEventHandler, getQuery, createError } from 'h3';

export default defineEventHandler(async(event) => {
  const query = getQuery(event);
  const type = query.type;

  if (
    typeof type !== 'string' ||
    !['main', 'tools', 'options', 'styles'].includes(type)
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid nav type' });
  }

  try {
    // Build absolute URL to the static JSON file
    // Vercel will serve this as a static asset
    const protocol = event.node.req.headers['x-forwarded-proto'] || 'https';
    const host = event.node.req.headers.host;
    const url = `${protocol}://${host}/mock-data/${type}-nav.json`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Navigation data not found');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch nav JSON:', err);
    throw createError({ statusCode: 500, statusMessage: 'Navigation data not found' });
  }
});
