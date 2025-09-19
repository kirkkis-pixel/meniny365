import type { APIRoute } from 'astro';
import namesOrigins from '../../../data/comprehensive-names-origins.json';

export const GET: APIRoute = async ({ params }) => {
  const name = params.name;
  
  if (!name) {
    return new Response(JSON.stringify({ error: 'Name parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Try to find the name (case-insensitive)
  const normalizedName = name.toLowerCase();
  const foundName = Object.values(namesOrigins).find((entry: any) => 
    entry.name.toLowerCase() === normalizedName || 
    entry.slug === normalizedName ||
    entry.name.toLowerCase().replace(/[^a-z]/g, '') === normalizedName.replace(/[^a-z]/g, '')
  );
  
  if (!foundName) {
    return new Response(JSON.stringify({ error: 'Name not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify(foundName), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
