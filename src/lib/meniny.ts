import { formatDateForUrl, parseDateFromUrl } from './date';
import { addDays, subDays } from 'date-fns';

export interface MeninyData {
  [date: string]: string[];
}

let meninyCache: MeninyData | null = null;

/**
 * Load meniny data from JSON files
 */
async function loadMeninyData(): Promise<MeninyData> {
  if (meninyCache) {
    return meninyCache;
  }

  try {
    // Try to load the simple 2025 data first
    const response = await fetch('/src/data/meniny-sk/meniny-2025-simple.json');
    if (response.ok) {
      meninyCache = await response.json();
      return meninyCache!;
    }
  } catch (error) {
    console.warn('Could not load simple meniny data, using fallback');
  }

  // Fallback: create empty data structure
  meninyCache = {};
  return meninyCache;
}

/**
 * Get names for a specific date
 */
export async function getNamesByDate(isoDate: string): Promise<string[]> {
  const data = await loadMeninyData();
  return data[isoDate] || [];
}

/**
 * Get all dates for a specific name
 */
export async function getDatesByName(name: string): Promise<string[]> {
  const data = await loadMeninyData();
  const dates: string[] = [];
  
  for (const [date, names] of Object.entries(data)) {
    if (names.includes(name)) {
      dates.push(date);
    }
  }
  
  return dates.sort();
}

/**
 * Get next occurrence of a name after a given date
 */
export async function getNextOccurrence(name: string, fromDate: Date): Promise<Date | null> {
  const dates = await getDatesByName(name);
  const fromStr = formatDateForUrl(fromDate);
  
  for (const dateStr of dates) {
    if (dateStr > fromStr) {
      return parseDateFromUrl(dateStr);
    }
  }
  
  return null;
}

/**
 * Get previous occurrence of a name before a given date
 */
export async function getPrevOccurrence(name: string, fromDate: Date): Promise<Date | null> {
  const dates = await getDatesByName(name);
  const fromStr = formatDateForUrl(fromDate);
  
  for (let i = dates.length - 1; i >= 0; i--) {
    if (dates[i] < fromStr) {
      return parseDateFromUrl(dates[i]);
    }
  }
  
  return null;
}

/**
 * Get previous/next day with names
 */
export function getAdjacentDay(isoDate: string, direction: 1 | -1): string {
  const date = parseDateFromUrl(isoDate);
  const newDate = direction === 1 ? addDays(date, 1) : subDays(date, 1);
  return formatDateForUrl(newDate);
}

/**
 * Get all unique names from the dataset
 */
export async function getAllNames(): Promise<string[]> {
  const data = await loadMeninyData();
  const nameSet = new Set<string>();
  
  for (const names of Object.values(data)) {
    names.forEach(name => nameSet.add(name));
  }
  
  return Array.from(nameSet).sort();
}

/**
 * Search names by partial match
 */
export async function searchNames(query: string): Promise<string[]> {
  const allNames = await getAllNames();
  const normalizedQuery = query.toLowerCase().trim();
  
  return allNames.filter(name => 
    name.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Get names for a specific month
 */
export async function getNamesForMonth(year: number, month: number): Promise<{[day: number]: string[]}> {
  const data = await loadMeninyData();
  const monthData: {[day: number]: string[]} = {};
  
  for (let day = 1; day <= 31; day++) {
    const dateStr = formatDateForUrl(new Date(year, month - 1, day));
    if (data[dateStr]) {
      monthData[day] = data[dateStr];
    }
  }
  
  return monthData;
}
