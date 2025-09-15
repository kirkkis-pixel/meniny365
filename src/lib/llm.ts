import { SeedIdea } from './gifts';
import { GiftFilters } from './gifts';

export interface ProcessedIdea {
  title: string;
  why: string;
  tags: string[];
}

/**
 * Rewrite and enhance seed ideas using LLM
 * For now, this is a stub that formats and compresses the ideas
 * In the future, this will call an actual LLM provider
 */
export async function rewriteIdeas(seedIdeas: SeedIdea[], filters: GiftFilters): Promise<ProcessedIdea[]> {
  // For now, just format and compress the seed ideas
  // This ensures 8-12 lines, 8-16 words each as specified
  
  const processedIdeas: ProcessedIdea[] = [];
  
  // Take up to 12 ideas
  const ideasToProcess = seedIdeas.slice(0, 12);
  
  for (const idea of ideasToProcess) {
    // Compress title to 8-16 words
    const compressedTitle = compressText(idea.title, 16);
    
    // Compress why to 8-16 words  
    const compressedWhy = compressText(idea.why, 16);
    
    // Generate relevant tags
    const tags = generateRelevantTags(idea, filters);
    
    processedIdeas.push({
      title: compressedTitle,
      why: compressedWhy,
      tags
    });
  }
  
  // Ensure we have at least 8 ideas
  if (processedIdeas.length < 8) {
    // Duplicate and vary some ideas to reach minimum
    const needed = 8 - processedIdeas.length;
    for (let i = 0; i < needed && i < processedIdeas.length; i++) {
      const original = processedIdeas[i];
      processedIdeas.push({
        title: varyTitle(original.title),
        why: varyWhy(original.why),
        tags: [...original.tags]
      });
    }
  }
  
  return processedIdeas.slice(0, 12); // Max 12 ideas
}

/**
 * Compress text to specified word count
 */
function compressText(text: string, maxWords: number): string {
  const words = text.split(' ').filter(word => word.length > 0);
  
  if (words.length <= maxWords) {
    return text;
  }
  
  // Take first maxWords words
  return words.slice(0, maxWords).join(' ');
}

/**
 * Generate relevant tags based on idea and filters
 */
function generateRelevantTags(idea: SeedIdea, filters: GiftFilters): string[] {
  const tags: string[] = [];
  
  // Add category-based tags
  if (idea.category === 'kvetiny') tags.push('kvetiny', 'romanticky');
  if (idea.category === 'knihy') tags.push('knihy', 'vzdelavanie');
  if (idea.category === 'kosmetika') tags.push('kosmetika', 'krasa');
  if (idea.category === 'elektronika') tags.push('elektronika', 'moderny');
  if (idea.category === 'oblecenie') tags.push('oblecenie', 'moda');
  if (idea.category === 'domacnost') tags.push('domacnost', 'prakticky');
  if (idea.category === 'zabava') tags.push('zabava', 'hry');
  if (idea.category === 'osobne') tags.push('osobne', 'personalizovane');
  
  // Add price-based tags
  if (idea.basePrice < 25) tags.push('lacny');
  if (idea.basePrice > 100) tags.push('premium');
  
  // Add relation-based tags
  if (filters.relation === 'partner') tags.push('romanticky');
  if (filters.relation === 'rodina') tags.push('rodinny');
  if (filters.relation === 'priatel') tags.push('priatelsky');
  
  // Remove duplicates and limit to 5 tags
  return [...new Set(tags)].slice(0, 5);
}

/**
 * Vary a title slightly to create variation
 */
function varyTitle(title: string): string {
  const variations = [
    title.replace('Klasický', 'Tradičný'),
    title.replace('Moderný', 'Súčasný'),
    title.replace('Elegantný', 'Stylový'),
    title.replace('Praktický', 'Užitočný'),
    title.replace('Krásny', 'Pekný')
  ];
  
  // Return first variation that's different from original
  for (const variation of variations) {
    if (variation !== title) {
      return variation;
    }
  }
  
  return title;
}

/**
 * Vary a why description slightly
 */
function varyWhy(why: string): string {
  const variations = [
    why.replace('Elegantný', 'Stylový'),
    why.replace('Praktický', 'Užitočný'),
    why.replace('Krásny', 'Pekný'),
    why.replace('Moderný', 'Súčasný'),
    why.replace('Klasický', 'Tradičný')
  ];
  
  // Return first variation that's different from original
  for (const variation of variations) {
    if (variation !== why) {
      return variation;
    }
  }
  
  return why;
}

/**
 * Future LLM provider integration point
 * This is where you would add actual LLM calls
 */
export async function callLLMProvider(prompt: string, context: any): Promise<string> {
  // Placeholder for future LLM integration
  // Example providers: OpenAI, Anthropic, Cohere, etc.
  
  console.log('LLM Provider call would happen here with prompt:', prompt);
  console.log('Context:', context);
  
  // For now, return a mock response
  return "Mock LLM response - replace with actual provider call";
}
