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
    // Fetch the file from the public folder as a URL instead of reading from disk
    const response = await fetch(`${event.node.req.headers.origin}/mock-data/${type}-nav.json`);
    if (!response.ok) {
      throw new Error('Navigation data not found');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw createError({ statusCode: 500, statusMessage: 'Navigation data not found' });
  }
});
