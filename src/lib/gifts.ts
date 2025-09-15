import giftsData from '../data/gifts/gifts-sk.json';
import { getAffiliateUrl, Vendor } from './affiliates';

export interface GiftFilters {
  name: string;
  budgetMin?: number;
  budgetMax?: number;
  relation?: string;
  styles?: string[];
  delivery?: "dnes" | "2dni" | "týždeň";
}

export interface GiftIdea {
  title: string;
  why: string;
  priceHint?: string;
  tags: string[];
  affiliateUrl: string;
  vendor: Vendor;
  category: string;
}

export interface SeedIdea {
  title: string;
  why: string;
  vendor: Vendor;
  basePrice: number;
  category: string;
}

/**
 * Get seed ideas based on filters
 */
export function getSeedIdeas(filters: GiftFilters): SeedIdea[] {
  const { budgetMin = 5, budgetMax = 500, relation = "rodina", styles = ["klasicky"] } = filters;
  
  const allIdeas: SeedIdea[] = [];
  
  // Get ideas from all categories
  Object.entries(giftsData.categories).forEach(([categoryKey, category]) => {
    category.items.forEach(item => {
      // Check if price fits budget
      if (item.basePrice >= budgetMin && item.basePrice <= budgetMax) {
        allIdeas.push({
          title: item.title,
          why: item.why,
          vendor: item.vendor as Vendor,
          basePrice: item.basePrice,
          category: categoryKey
        });
      }
    });
  });
  
  // Apply relation weighting
  const relationWeight = giftsData.relations[relation as keyof typeof giftsData.relations]?.weight || 1.0;
  
  // Apply style filtering
  const filteredIdeas = allIdeas.filter(idea => {
    if (styles.length === 0) return true;
    
    // Check if any style tags match the idea
    return styles.some(style => {
      const styleTags = giftsData.styles[style as keyof typeof giftsData.styles]?.tags || [];
      return styleTags.some(tag => 
        idea.title.toLowerCase().includes(tag) || 
        idea.why.toLowerCase().includes(tag)
      );
    });
  });
  
  // Sort by relevance (price proximity to budget center, relation weight)
  const budgetCenter = (budgetMin + budgetMax) / 2;
  filteredIdeas.sort((a, b) => {
    const aPriceDiff = Math.abs(a.basePrice - budgetCenter);
    const bPriceDiff = Math.abs(b.basePrice - budgetCenter);
    return aPriceDiff - bPriceDiff;
  });
  
  // Return top 15 ideas for LLM processing
  return filteredIdeas.slice(0, 15);
}

/**
 * Generate tags for an idea based on filters
 */
export function generateTags(idea: SeedIdea, filters: GiftFilters): string[] {
  const tags: string[] = [];
  
  // Add category tag
  tags.push(giftsData.categories[idea.category as keyof typeof giftsData.categories]?.label || idea.category);
  
  // Add style tags
  if (filters.styles) {
    filters.styles.forEach(style => {
      const styleTags = giftsData.styles[style as keyof typeof giftsData.styles]?.tags || [];
      tags.push(...styleTags);
    });
  }
  
  // Add relation tag
  if (filters.relation) {
    const relationLabel = giftsData.relations[filters.relation as keyof typeof giftsData.relations]?.label;
    if (relationLabel) {
      tags.push(relationLabel);
    }
  }
  
  // Add price range tag
  if (filters.budgetMin && filters.budgetMax) {
    const budgetKey = Object.keys(giftsData.budgets).find(key => {
      const budget = giftsData.budgets[key as keyof typeof giftsData.budgets];
      return budget.min <= filters.budgetMin! && budget.max >= filters.budgetMax!;
    });
    
    if (budgetKey) {
      const budgetLabel = giftsData.budgets[budgetKey as keyof typeof giftsData.budgets].label;
      tags.push(budgetLabel);
    }
  }
  
  // Remove duplicates
  return [...new Set(tags)];
}

/**
 * Format price hint based on delivery speed
 */
export function formatPriceHint(basePrice: number, delivery?: string): string {
  if (!delivery) return `${basePrice}€`;
  
  const deliveryConfig = giftsData.delivery[delivery as keyof typeof giftsData.delivery];
  if (!deliveryConfig) return `${basePrice}€`;
  
  const adjustedPrice = Math.round(basePrice * deliveryConfig.premium);
  return `${adjustedPrice}€`;
}

/**
 * Convert seed ideas to gift ideas with affiliate URLs
 */
export function convertToGiftIdeas(seedIdeas: SeedIdea[], filters: GiftFilters): GiftIdea[] {
  return seedIdeas.map(idea => {
    const productSlug = idea.title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    return {
      title: idea.title,
      why: idea.why,
      priceHint: formatPriceHint(idea.basePrice, filters.delivery),
      tags: generateTags(idea, filters),
      affiliateUrl: getAffiliateUrl(idea.vendor, productSlug),
      vendor: idea.vendor,
      category: idea.category
    };
  });
}
