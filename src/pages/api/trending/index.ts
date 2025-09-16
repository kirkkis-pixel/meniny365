import type { APIRoute } from 'astro';

// Sample trending data - in production this would come from a database or external API
const trendingData = {
  lastUpdated: new Date().toISOString(),
  items: [
    { name: "Luna", trendScore: 95, trendsDelta: 45, viewsDelta: 38, label: "rising" },
    { name: "Nina", trendScore: 87, trendsDelta: 32, viewsDelta: 28, label: "rising" },
    { name: "Zoe", trendScore: 82, trendsDelta: 28, viewsDelta: 25, label: "rising" },
    { name: "Mia", trendScore: 78, trendsDelta: 22, viewsDelta: 20, label: "rising" },
    { name: "Emma", trendScore: 75, trendsDelta: 18, viewsDelta: 16, label: "rising" },
    { name: "Sofia", trendScore: 72, trendsDelta: 15, viewsDelta: 14, label: "rising" },
    { name: "Eva", trendScore: 68, trendsDelta: 12, viewsDelta: 11, label: "rising" },
    { name: "Anna", trendScore: 65, trendsDelta: 10, viewsDelta: 9, label: "rising" },
    { name: "Maria", trendScore: 62, trendsDelta: 8, viewsDelta: 7, label: "rising" },
    { name: "Jana", trendScore: 60, trendsDelta: 6, viewsDelta: 5, label: "rising" },
    { name: "Zuzana", trendScore: 58, trendsDelta: 4, viewsDelta: 3, label: "rising" },
    { name: "Martina", trendScore: 55, trendsDelta: 2, viewsDelta: 1, label: "rising" },
    { name: "Petra", trendScore: 52, trendsDelta: 0, viewsDelta: 0, label: "stable" },
    { name: "Monika", trendScore: 50, trendsDelta: -2, viewsDelta: -1, label: "stable" },
    { name: "Lucia", trendScore: 48, trendsDelta: -4, viewsDelta: -3, label: "stable" },
    { name: "Katarina", trendScore: 45, trendsDelta: -6, viewsDelta: -5, label: "cooling" },
    { name: "Barbora", trendScore: 42, trendsDelta: -8, viewsDelta: -7, label: "cooling" },
    { name: "Veronika", trendScore: 40, trendsDelta: -10, viewsDelta: -9, label: "cooling" },
    { name: "Alena", trendScore: 38, trendsDelta: -12, viewsDelta: -11, label: "cooling" },
    { name: "Kristina", trendScore: 35, trendsDelta: -15, viewsDelta: -14, label: "cooling" }
  ]
};

export const GET: APIRoute = async ({ request }) => {
  try {
    return new Response(JSON.stringify(trendingData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error in trending API:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
