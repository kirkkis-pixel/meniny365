import type { APIRoute } from 'astro';

interface NameData {
  name: string;
  slug: string;
  gender: 'M' | 'F' | 'U';
  origin: string;
  meaning: string;
  description: string;
  wikipediaUrl?: string;
  wikipediaExtract?: string;
  variants: string[];
  [key: string]: any;
}

// Get all Slovak names
async function getAllSlovakNames(): Promise<string[]> {
  const names = new Set<string>();
  
  // Get names from Wikidata
  try {
    const wikidataQuery = `
      SELECT DISTINCT ?nameLabel WHERE {
        ?name wdt:P31 wd:Q202444 .
        ?name wdt:P407 wd:Q9058 .
        ?name rdfs:label ?nameLabel .
        FILTER(LANG(?nameLabel) = "sk")
      }
      ORDER BY ?nameLabel
    `;
    
    const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(wikidataQuery)}&format=json`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'meniny365.sk/1.0 (https://meniny365.sk)',
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      data.results.bindings.forEach((binding: any) => {
        if (binding.nameLabel?.value) {
          names.add(binding.nameLabel.value);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching from Wikidata:', error);
  }
  
  // Add comprehensive list of Slovak names
  const commonSlovakNames = [
    'Adam', 'Adriana', 'Agáta', 'Albert', 'Albín', 'Alexandra', 'Alexej', 'Alfonz', 'Alfréd', 'Alica',
    'Alojz', 'Alžbeta', 'Amália', 'Andrej', 'Anna', 'Anton', 'Antonín', 'Arnold', 'Artúr', 'Augustín',
    'Aurel', 'Barbora', 'Beáta', 'Bela', 'Benedikt', 'Bernard', 'Blahoslav', 'Blanka', 'Bohdan', 'Bohumil',
    'Bohuslav', 'Boleslav', 'Branislav', 'Brigita', 'Bronislav', 'Cecília', 'Cyril', 'Dagmar', 'Dalibor',
    'Daniel', 'Dávid', 'Denis', 'Diana', 'Dobromil', 'Dominik', 'Dorota', 'Dušan', 'Eduard', 'Elena',
    'Eliška', 'Emil', 'Erik', 'Eva', 'Ferdinand', 'Filip', 'František', 'Gabriel', 'Gabriela', 'Gejza',
    'Gustáv', 'Hana', 'Henrich', 'Hugo', 'Igor', 'Irena', 'Ivan', 'Ivana', 'Izabela', 'Jana',
    'Ján', 'Jaroslav', 'Jasna', 'Jela', 'Jolana', 'Jozef', 'Jozefa', 'Júlia', 'Július', 'Juraj',
    'Kamil', 'Kamila', 'Karol', 'Katarína', 'Kazimír', 'Klaudia', 'Kornel', 'Kristína', 'Kvetoslava',
    'Ladislav', 'Lenka', 'Ľubica', 'Ľubomír', 'Ľuboslav', 'Ľudmila', 'Ľudovít', 'Marcel', 'Marcela', 'Marek',
    'Mária', 'Marián', 'Mariána', 'Marta', 'Martin', 'Martina', 'Matej', 'Matúš', 'Maximilián', 'Melánia',
    'Michal', 'Michaela', 'Milan', 'Milena', 'Miloslav', 'Miroslav', 'Monika', 'Nadežda', 'Natália', 'Norbert',
    'Oľga', 'Ondrej', 'Pavol', 'Pavla', 'Patrícia', 'Patrik', 'Peter', 'Petra', 'Pravoslav', 'Radomír',
    'Radoslav', 'Renáta', 'Richard', 'Róbert', 'Róberta', 'Roman', 'Romana', 'Rudolf', 'Rudolfa', 'Samuel',
    'Sebastián', 'Silvia', 'Simona', 'Slavomír', 'Stanislav', 'Štefan', 'Štefánia', 'Svetlana', 'Svetozár', 'Tadeáš',
    'Tamara', 'Tatiana', 'Teodor', 'Tereza', 'Tibor', 'Tomáš', 'Tomáša', 'Urban', 'Václav', 'Valentín',
    'Valéria', 'Vanda', 'Vavrinec', 'Vera', 'Veronika', 'Viera', 'Viktor', 'Viktória', 'Vilma', 'Vladimír',
    'Vladimíra', 'Vladislav', 'Vladislava', 'Vlastimil', 'Vlastimila', 'Vratislav', 'Vratislava', 'Zdenka', 'Zdenko', 'Zita',
    'Zoltán', 'Zora', 'Zuzana', 'Žofia', 'Žofie', 'Móric'
  ];
  
  commonSlovakNames.forEach(name => names.add(name));
  
  return Array.from(names).sort();
}

// Get detailed story for a specific name
async function getDetailedStory(name: string): Promise<NameData> {
  const normalizedName = name.toLowerCase().replace(/[^a-z]/g, '');
  
  // Try multiple search strategies
  const searchTerms = [
    name,
    name.replace(/[áä]/g, 'a').replace(/[č]/g, 'c').replace(/[ď]/g, 'd')
        .replace(/[é]/g, 'e').replace(/[í]/g, 'i').replace(/[ĺľ]/g, 'l')
        .replace(/[ň]/g, 'n').replace(/[óô]/g, 'o').replace(/[ŕ]/g, 'r')
        .replace(/[š]/g, 's').replace(/[ť]/g, 't').replace(/[ú]/g, 'u')
        .replace(/[ý]/g, 'y').replace(/[ž]/g, 'z'),
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  ];
  
  for (const searchTerm of searchTerms) {
    try {
      // Search Wikidata for this specific name
      const searchQuery = `
        SELECT DISTINCT ?name ?nameLabel ?gender ?origin ?meaning ?description ?wikipedia WHERE {
          ?name wdt:P31 wd:Q202444 .
          ?name wdt:P407 wd:Q9058 .
          ?name rdfs:label ?nameLabel .
          FILTER(LANG(?nameLabel) = "sk")
          FILTER(CONTAINS(LCASE(?nameLabel), "${searchTerm.toLowerCase()}"))
          
          OPTIONAL { ?name wdt:P21 ?gender . }
          OPTIONAL { ?name wdt:P5191 ?origin . }
          OPTIONAL { ?name wdt:P1382 ?meaning . }
          OPTIONAL { ?name schema:description ?description . FILTER(LANG(?description) = "sk") }
          OPTIONAL { ?name wdt:P373 ?wikipedia . }
        }
        LIMIT 5
      `;
      
      const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(searchQuery)}&format=json`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'meniny365.sk/1.0 (https://meniny365.sk)',
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.results.bindings.length > 0) {
          const binding = data.results.bindings[0];
          
          return {
            name: binding.nameLabel?.value || name,
            slug: binding.nameLabel?.value?.toLowerCase().replace(/[^a-z0-9]/g, '-') || name.toLowerCase(),
            gender: binding.gender?.value?.includes('Q6581097') ? 'M' : 
                    binding.gender?.value?.includes('Q6581072') ? 'F' : 'U',
            origin: binding.origin?.value || '',
            meaning: binding.meaning?.value || '',
            description: binding.description?.value || '',
            wikipediaUrl: binding.wikipedia?.value || undefined,
            variants: []
          };
        }
      }
    } catch (error) {
      console.error(`Error searching for ${searchTerm}:`, error);
    }
  }
  
  // If not found, return empty structure
  return {
    name: name,
    slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    gender: 'U',
    origin: '',
    meaning: '',
    description: '',
    variants: []
  };
}

export const GET: APIRoute = async ({ url }) => {
  const action = url.searchParams.get('action') || 'list';
  const name = url.searchParams.get('name') || '';
  
  try {
    if (action === 'single' && name) {
      // Fetch detailed story for a single name
      const story = await getDetailedStory(name);
      return new Response(JSON.stringify(story), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else if (action === 'list') {
      // Get list of all Slovak names
      const names = await getAllSlovakNames();
      return new Response(JSON.stringify({ 
        total: names.length, 
        names: names 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
