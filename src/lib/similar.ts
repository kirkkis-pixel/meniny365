// Simple name similarity based on string similarity
// In production, this would use embeddings or more sophisticated algorithms

export interface SimilarName {
  name: string;
  similarity: number;
  reason: string;
}

/**
 * Calculate simple string similarity between two names
 */
function calculateSimilarity(name1: string, name2: string): number {
  const s1 = name1.toLowerCase();
  const s2 = name2.toLowerCase();
  
  // Exact match
  if (s1 === s2) return 1.0;
  
  // Check if one contains the other
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;
  
  // Calculate Levenshtein distance
  const distance = levenshteinDistance(s1, s2);
  const maxLength = Math.max(s1.length, s2.length);
  
  return 1 - (distance / maxLength);
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }
  
  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Get similar names based on string similarity
 */
export function getSimilarNames(targetName: string, allNames: string[], k: number = 8): SimilarName[] {
  const similarities: SimilarName[] = [];
  
  for (const name of allNames) {
    if (name === targetName) continue;
    
    const similarity = calculateSimilarity(targetName, name);
    
    if (similarity > 0.3) { // Only include names with reasonable similarity
      let reason = '';
      
      if (similarity > 0.8) {
        reason = 'Veľmi podobné meno';
      } else if (similarity > 0.6) {
        reason = 'Podobné meno';
      } else if (similarity > 0.4) {
        reason = 'Čiastočne podobné meno';
      } else {
        reason = 'Mierne podobné meno';
      }
      
      similarities.push({
        name,
        similarity,
        reason
      });
    }
  }
  
  // Sort by similarity (descending) and return top k
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, k);
}

/**
 * Get similar names with additional context
 */
export function getSimilarNamesWithContext(
  targetName: string, 
  allNames: string[], 
  k: number = 8
): SimilarName[] {
  const similarities = getSimilarNames(targetName, allNames, k);
  
  // Add more context to reasons
  return similarities.map(similar => {
    const { name, similarity, reason } = similar;
    
    let enhancedReason = reason;
    
    // Check for common patterns
    if (targetName.length === name.length) {
      enhancedReason += ' (rovnaká dĺžka)';
    }
    
    if (targetName[0] === name[0]) {
      enhancedReason += ' (začína rovnakým písmenom)';
    }
    
    if (targetName.endsWith(name.slice(-2)) || name.endsWith(targetName.slice(-2))) {
      enhancedReason += ' (podobný koniec)';
    }
    
    return {
      ...similar,
      reason: enhancedReason
    };
  });
}

/**
 * Get names that start with the same letter
 */
export function getNamesByFirstLetter(targetName: string, allNames: string[]): string[] {
  const firstLetter = targetName[0].toLowerCase();
  
  return allNames
    .filter(name => name.toLowerCase().startsWith(firstLetter) && name !== targetName)
    .slice(0, 10); // Limit to 10 names
}

/**
 * Get names with similar length
 */
export function getNamesByLength(targetName: string, allNames: string[]): string[] {
  const targetLength = targetName.length;
  
  return allNames
    .filter(name => {
      const lengthDiff = Math.abs(name.length - targetLength);
      return lengthDiff <= 2 && name !== targetName;
    })
    .sort((a, b) => Math.abs(a.length - targetLength) - Math.abs(b.length - targetLength))
    .slice(0, 10); // Limit to 10 names
}
