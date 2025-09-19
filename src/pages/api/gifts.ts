import type { APIRoute } from 'astro';
import { generateGiftSuggestions, type GiftOption } from '../../lib/giftDatabase';

interface GiftFilters {
  budget: '10-30' | '30-60' | '60+';
  relationship: 'rodina' | 'priatel' | 'kolega' | 'partner';
  type: string[]; // ['zážitok', 'fyzický darček', 'digitálne']
  style: string[]; // ['minimalistický', 'luxusný', 'hravý', 'eco']
  delivery: 'dnes' | 'do-2-dni' | 'neskôr';
  name?: string;
}

interface GiftResult {
  title: string;
  why: string;
  vendor: 'alza' | 'mall' | 'bonami' | 'brasty' | 'other';
  affiliateUrl: string;
  tags: string[];
  imageUrl?: string;
  price?: string;
  category?: string;
}

// Cache for responses
const responseCache = new Map<string, GiftResult[]>();

function generateCacheKey(filters: GiftFilters): string {
  return JSON.stringify(filters);
}

function filterGifts(gifts: GiftResult[], filters: GiftFilters): GiftResult[] {
  return gifts.filter(gift => {
    // Check type filter
    if (filters.type.length > 0) {
      const hasMatchingType = filters.type.some(type => {
        if (type === 'zážitok') return gift.tags.includes('zážitok');
        if (type === 'digitálne') return gift.tags.includes('digitálne');
        if (type === 'fyzický darček') return !gift.tags.includes('digitálne') && !gift.tags.includes('zážitok');
        return false;
      });
      if (!hasMatchingType) return false;
    }

    // Check style filter
    if (filters.style.length > 0) {
      const hasMatchingStyle = filters.style.some(style => 
        gift.tags.includes(style)
      );
      if (!hasMatchingStyle) return false;
    }

    return true;
  });
}

function getGiftsForFilters(filters: GiftFilters): GiftResult[] {
  // Generate dynamic suggestions
  const allSuggestions = generateGiftSuggestions(
    filters.budget,
    filters.relationship,
    filters.type,
    filters.style,
    filters.name
  );

  // Filter by type and style
  const filteredGifts = filterGifts(allSuggestions, filters);

  // If no filters are applied or very few results, return more suggestions
  const hasFilters = filters.type.length > 0 || filters.style.length > 0;
  const minResults = hasFilters ? 15 : 20;
  
  // Shuffle and return 15-20 results for variety
  const shuffled = filteredGifts.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(20, Math.max(minResults, shuffled.length)));
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const filters: GiftFilters = await request.json();
    
    // Generate cache key
    const cacheKey = generateCacheKey(filters);
    
    // Check cache first
    if (responseCache.has(cacheKey)) {
      return new Response(JSON.stringify({
        success: true,
        gifts: responseCache.get(cacheKey)
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
        }
      });
    }
    
    // Get gifts based on filters
    const gifts = getGiftsForFilters(filters);
    
    // Cache the response
    responseCache.set(cacheKey, gifts);
    
    return new Response(JSON.stringify({
      success: true,
      gifts
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
  } catch (error) {
    console.error('Error in gifts API:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Chyba pri načítaní darčekov'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
