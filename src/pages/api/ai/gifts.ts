import type { APIRoute } from 'astro';
import { getSeedIdeas, convertToGiftIdeas, type GiftFilters } from '../../../lib/gifts';
import { rewriteIdeas } from '../../../lib/llm';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface GiftRequest {
  filters: GiftFilters;
}

interface GiftResponse {
  ideas: Array<{
    title: string;
    why: string;
    priceHint?: string;
    tags: string[];
    affiliateUrl: string;
    vendor: string;
    category: string;
  }>;
  cacheKey: string;
  generatedAt: string;
}

// Cache directory
const CACHE_DIR = path.join(process.cwd(), '.astro', 'tmp');
const CACHE_FILE = path.join(CACHE_DIR, 'gifts-cache.json');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Load cache
let cache: Record<string, GiftResponse> = {};
try {
  if (fs.existsSync(CACHE_FILE)) {
    const cacheData = fs.readFileSync(CACHE_FILE, 'utf8');
    cache = JSON.parse(cacheData);
  }
} catch (error) {
  console.warn('Could not load gifts cache:', error);
  cache = {};
}

// Save cache
function saveCache() {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.warn('Could not save gifts cache:', error);
  }
}

// Generate cache key from filters
function generateCacheKey(filters: GiftFilters): string {
  const keyData = {
    name: filters.name,
    budgetMin: filters.budgetMin,
    budgetMax: filters.budgetMax,
    relation: filters.relation,
    styles: filters.styles?.sort(),
    delivery: filters.delivery
  };
  
  return crypto.createHash('md5').update(JSON.stringify(keyData)).digest('hex');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: GiftRequest = await request.json();
    const { filters } = body;
    
    // Validate required fields
    if (!filters.name || filters.name.trim().length === 0) {
      return new Response(JSON.stringify({ 
        error: 'Name is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate cache key
    const cacheKey = generateCacheKey(filters);
    
    // Check cache first
    if (cache[cacheKey]) {
      console.log('Returning cached gift ideas for:', filters.name);
      return new Response(JSON.stringify(cache[cacheKey]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate new ideas
    console.log('Generating new gift ideas for:', filters.name);
    
    // Step 1: Get seed ideas
    const seedIdeas = getSeedIdeas(filters);
    
    if (seedIdeas.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'No gift ideas found for the given criteria' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Step 2: Process with LLM (stub for now)
    const processedIdeas = await rewriteIdeas(seedIdeas, filters);
    
    // Step 3: Convert to final format with affiliate URLs
    const finalIdeas = convertToGiftIdeas(seedIdeas, filters);
    
    // Step 4: Format response
    const response: GiftResponse = {
      ideas: finalIdeas.map(idea => ({
        title: idea.title,
        why: idea.why,
        priceHint: idea.priceHint,
        tags: idea.tags,
        affiliateUrl: idea.affiliateUrl,
        vendor: idea.vendor,
        category: idea.category
      })),
      cacheKey,
      generatedAt: new Date().toISOString()
    };
    
    // Cache the result
    cache[cacheKey] = response;
    saveCache();
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error generating gift ideas:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Handle preflight requests
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
};
