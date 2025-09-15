import wikidataInfo from '../data/insights/wikidata.json';

export interface NameInsight {
  name: string;
  origin: string;
  meaning: string;
  gender: string;
  languageOfOrigin: string;
  relatedNames: string[];
  sourceUrl?: string;
}

export interface InternationalVariant {
  name: string;
  language: string;
  country?: string;
}

/**
 * Get origin and meaning summary for a name
 */
export function getOriginSummary(name: string): string {
  const info = wikidataInfo[name as keyof typeof wikidataInfo];
  
  if (!info) {
    return `Informácie o pôvode mena ${name} nie sú dostupné.`;
  }
  
  const { description, languageOfOrigin, gender } = info;
  
  let summary = '';
  
  // Add origin information
  if (languageOfOrigin && languageOfOrigin !== 'unknown') {
    summary += `Meno ${name} má pôvod v ${languageOfOrigin.toLowerCase()} jazyku. `;
  }
  
  // Add meaning from description
  if (description?.sk) {
    summary += description.sk;
  } else if (description?.en) {
    summary += description.en;
  } else {
    summary += `Meno ${name} je ${gender === 'male' ? 'mužské' : gender === 'female' ? 'ženské' : 'krstné'} meno.`;
  }
  
  // Add gender information if available
  if (gender && gender !== 'unknown') {
    summary += ` Je to ${gender === 'male' ? 'mužské' : 'ženské'} meno.`;
  }
  
  return summary;
}

/**
 * Get international variants of a name
 */
export function getInternationalVariants(name: string): InternationalVariant[] {
  const info = wikidataInfo[name as keyof typeof wikidataInfo];
  
  if (!info || !info.relatedNames || info.relatedNames.length === 0) {
    return [];
  }
  
  // Map related names to international variants
  const variants: InternationalVariant[] = info.relatedNames.map(relatedName => {
    // Try to determine language/country based on name patterns
    let language = 'Unknown';
    let country = undefined;
    
    if (relatedName.endsWith('o') || relatedName.endsWith('a')) {
      language = 'Italian';
      country = 'Italy';
    } else if (relatedName.endsWith('e') || relatedName.endsWith('ne')) {
      language = 'French';
      country = 'France';
    } else if (relatedName.endsWith('s') || relatedName.endsWith('es')) {
      language = 'Spanish';
      country = 'Spain';
    } else if (relatedName.endsWith('n') || relatedName.endsWith('en')) {
      language = 'German';
      country = 'Germany';
    } else if (relatedName.endsWith('h') || relatedName.endsWith('ah')) {
      language = 'English';
      country = 'USA/UK';
    } else if (relatedName.endsWith('j') || relatedName.endsWith('ij')) {
      language = 'Russian';
      country = 'Russia';
    } else if (relatedName.endsWith('sz') || relatedName.endsWith('z')) {
      language = 'Hungarian';
      country = 'Hungary';
    }
    
    return {
      name: relatedName,
      language,
      country
    };
  });
  
  return variants;
}

/**
 * Get complete name insight
 */
export function getNameInsight(name: string): NameInsight | null {
  const info = wikidataInfo[name as keyof typeof wikidataInfo];
  
  if (!info) {
    return null;
  }
  
  return {
    name,
    origin: getOriginSummary(name),
    meaning: info.description?.sk || info.description?.en || `Informácie o význame mena ${name} nie sú dostupné.`,
    gender: info.gender,
    languageOfOrigin: info.languageOfOrigin,
    relatedNames: info.relatedNames || [],
    sourceUrl: info.sourceUrl
  };
}

/**
 * Get source citation for a name
 */
export function getSourceCitation(name: string): string | null {
  const info = wikidataInfo[name as keyof typeof wikidataInfo];
  return info?.sourceUrl || null;
}

/**
 * Check if name has available insights
 */
export function hasInsights(name: string): boolean {
  const info = wikidataInfo[name as keyof typeof wikidataInfo];
  return !!info && (!!info.description?.sk || !!info.description?.en);
}

/**
 * Get fallback text for names without insights
 */
export function getFallbackText(name: string): string {
  return `Informácie o pôvode a význame mena ${name} sa práve pripravujú. Skúste to neskôr alebo navštívte našu stránku s populárnymi menami.`;
}
