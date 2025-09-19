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
  characteristics?: string;
  personality?: string;
  behavior?: string;
  astrology?: string;
  stones?: string;
  colors?: string;
  numbers?: string;
  compatibility?: string;
  [key: string]: any;
}

// Comprehensive database of Slovak names with detailed information
const SLOVAK_NAMES_DATABASE: { [key: string]: Partial<NameData> } = {
  'Móric': {
    name: 'Móric',
    slug: 'moric',
    gender: 'M',
    origin: 'latinský',
    meaning: 'pochádzajúci z Mauretánie',
    description: 'Mužské meno Móric má latinský pôvod a jeho význam znie "pochádzajúci z Mauretánie" (v Severnej Afrike).',
    characteristics: 'Je jemným, starostlivým, bojazlivým a nepriebojným človekom. Vie sa občas zavesiť na niekoho vplyvného a potom, za jeho chrbtom sa dokáže zabezpečiť.',
    personality: 'Je nerád v centre pozornosti, snaží sa byť v ústraní a nepozorovane si "prihrievať svoju polievočku". Byť jeho spoločníkom znamená vykonávať jeho nápady a vystavovať svoje postavenie riziku za neho.',
    behavior: 'Nikdy neriskuje, nikdy sa nesnaží priveľa investovať, alebo sa presadiť do centra diania. Zodpovednosť za všetko radšej nechá na svojej partnerke. Pritom sa však rád hrá na vodcu a snaží sa aspoň pred príbuznými vystupovať autoritatívne.',
    astrology: 'Ovplyvňuje ho planéta Jupiter.',
    stones: 'Jeho ochranné kamene sú ametyst a granát.',
    colors: 'Modrá, fialová',
    numbers: '3, 12, 21',
    compatibility: 'Najlepšie sa zhoduje s menami: Mária, Anna, Zuzana, Peter, Ján, Michal'
  },
  'Ján': {
    name: 'Ján',
    slug: 'jan',
    gender: 'M',
    origin: 'hebrejský',
    meaning: 'Boh je milostivý',
    description: 'Mužské meno Ján má hebrejský pôvod a jeho význam znie "Boh je milostivý". Je to jedno z najpopulárnejších menín na Slovensku.',
    characteristics: 'Je to silná a charizmatická osobnosť s prirodzenou autoritou. Má rád zodpovednosť a rád pomáha druhým.',
    personality: 'Je prirodzený vodca, ktorý si získava rešpekt svojou poctivosťou a pracovitosťou. Má silný charakter a je veľmi lojálny.',
    behavior: 'Rád sa stara o rodinu a priateľov. Je spoľahlivý a vždy dodrží svoje sľuby. Má rád tradície a rodinné hodnoty.',
    astrology: 'Ovplyvňuje ho planéta Slnko.',
    stones: 'Jeho ochranné kamene sú diamant a zlato.',
    colors: 'Zlatá, oranžová',
    numbers: '1, 10, 19',
    compatibility: 'Najlepšie sa zhoduje s menami: Mária, Anna, Zuzana, Peter, Michal, Jozef'
  },
  'Mária': {
    name: 'Mária',
    slug: 'maria',
    gender: 'F',
    origin: 'hebrejský',
    meaning: 'milovaná Bohom',
    description: 'Ženské meno Mária má hebrejský pôvod a jeho význam znie "milovaná Bohom". Je to najpopulárnejšie ženské meno na Slovensku.',
    characteristics: 'Je to jemná a starostlivá osobnosť s veľkým srdcom. Má prirodzený talent na staranie sa o druhých.',
    personality: 'Je veľmi empatická a citlivá na potreby druhých. Má silný materinský inštinkt a je veľmi obetavá.',
    behavior: 'Rád sa stara o rodinu a deti. Je spoľahlivá a vždy pomôže, keď je potreba. Má rád tradície a rodinné hodnoty.',
    astrology: 'Ovplyvňuje ju planéta Venuša.',
    stones: 'Jej ochranné kamene sú perla a ružový kremeň.',
    colors: 'Ružová, biela',
    numbers: '2, 11, 20',
    compatibility: 'Najlepšie sa zhoduje s menami: Ján, Peter, Michal, Jozef, Pavol, Tomáš'
  },
  'Peter': {
    name: 'Peter',
    slug: 'peter',
    gender: 'M',
    origin: 'grécky',
    meaning: 'skala, kameň',
    description: 'Mužské meno Peter má grécky pôvod a jeho význam znie "skala, kameň". Je to jedno z najpopulárnejších menín na Slovensku.',
    characteristics: 'Je to silná a spoľahlivá osobnosť s pevnými zásadami. Má rád stabilitu a bezpečnosť.',
    personality: 'Je veľmi pracovitý a zodpovedný. Má silný charakter a je veľmi lojálny k svojim blízkym.',
    behavior: 'Rád sa stara o rodinu a je veľmi spoľahlivý. Má rád tradície a rodinné hodnoty. Je dobrý organizátor.',
    astrology: 'Ovplyvňuje ho planéta Saturn.',
    stones: 'Jeho ochranné kamene sú onyx a čierny kremeň.',
    colors: 'Čierna, hnedá',
    numbers: '8, 17, 26',
    compatibility: 'Najlepšie sa zhoduje s menami: Mária, Anna, Zuzana, Ján, Michal, Jozef'
  },
  'Michal': {
    name: 'Michal',
    slug: 'michal',
    gender: 'M',
    origin: 'hebrejský',
    meaning: 'kto je ako Boh',
    description: 'Mužské meno Michal má hebrejský pôvod a jeho význam znie "kto je ako Boh". Je to veľmi populárne meno na Slovensku.',
    characteristics: 'Je to charizmatická osobnosť s prirodzeným šarmom. Má rád spravodlivosť a je veľmi odvážny.',
    personality: 'Je prirodzený vodca s veľkou energiou. Má rád výzvy a je veľmi ambiciózny. Je lojálny a spoľahlivý.',
    behavior: 'Rád sa stara o rodinu a priateľov. Je veľmi aktívny a má rád šport a dobrodružstvo. Je dobrý organizátor.',
    astrology: 'Ovplyvňuje ho planéta Mars.',
    stones: 'Jeho ochranné kamene sú rubín a granát.',
    colors: 'Červená, oranžová',
    numbers: '1, 9, 18',
    compatibility: 'Najlepšie sa zhoduje s menami: Mária, Anna, Zuzana, Ján, Peter, Jozef'
  },
  'Jozef': {
    name: 'Jozef',
    slug: 'jozef',
    gender: 'M',
    origin: 'hebrejský',
    meaning: 'Boh pridá',
    description: 'Mužské meno Jozef má hebrejský pôvod a jeho význam znie "Boh pridá". Je to veľmi populárne meno na Slovensku.',
    characteristics: 'Je to jemná a starostlivá osobnosť s veľkým srdcom. Má prirodzený talent na staranie sa o druhých.',
    personality: 'Je veľmi empatický a citlivý na potreby druhých. Má silný charakter a je veľmi lojálny.',
    behavior: 'Rád sa stara o rodinu a deti. Je spoľahlivý a vždy pomôže, keď je potreba. Má rád tradície a rodinné hodnoty.',
    astrology: 'Ovplyvňuje ho planéta Venuša.',
    stones: 'Jeho ochranné kamene sú perla a ružový kremeň.',
    colors: 'Ružová, biela',
    numbers: '2, 11, 20',
    compatibility: 'Najlepšie sa zhoduje s menami: Mária, Anna, Zuzana, Ján, Peter, Michal'
  },
  'Anna': {
    name: 'Anna',
    slug: 'anna',
    gender: 'F',
    origin: 'hebrejský',
    meaning: 'milá, milovaná',
    description: 'Ženské meno Anna má hebrejský pôvod a jeho význam znie "milá, milovaná". Je to veľmi populárne meno na Slovensku.',
    characteristics: 'Je to jemná a starostlivá osobnosť s veľkým srdcom. Má prirodzený talent na staranie sa o druhých.',
    personality: 'Je veľmi empatická a citlivá na potreby druhých. Má silný materinský inštinkt a je veľmi obetavá.',
    behavior: 'Rád sa stara o rodinu a deti. Je spoľahlivá a vždy pomôže, keď je potreba. Má rád tradície a rodinné hodnoty.',
    astrology: 'Ovplyvňuje ju planéta Venuša.',
    stones: 'Jej ochranné kamene sú perla a ružový kremeň.',
    colors: 'Ružová, biela',
    numbers: '2, 11, 20',
    compatibility: 'Najlepšie sa zhoduje s menami: Ján, Peter, Michal, Jozef, Pavol, Tomáš'
  },
  'Petra': {
    name: 'Petra',
    slug: 'petra',
    gender: 'F',
    origin: 'grécky',
    meaning: 'skala, kameň',
    description: 'Ženské meno Petra má grécky pôvod a jeho význam znie "skala, kameň". Je to veľmi populárne meno na Slovensku.',
    characteristics: 'Je to silná a spoľahlivá osobnosť s pevnými zásadami. Má rád stabilitu a bezpečnosť.',
    personality: 'Je veľmi pracovitá a zodpovedná. Má silný charakter a je veľmi lojálna k svojim blízkym.',
    behavior: 'Rád sa stara o rodinu a je veľmi spoľahlivá. Má rád tradície a rodinné hodnoty. Je dobrá organizátorka.',
    astrology: 'Ovplyvňuje ju planéta Saturn.',
    stones: 'Jej ochranné kamene sú onyx a čierny kremeň.',
    colors: 'Čierna, hnedá',
    numbers: '8, 17, 26',
    compatibility: 'Najlepšie sa zhoduje s menami: Ján, Peter, Michal, Jozef, Pavol, Tomáš'
  }
};

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

// Enhanced function to get detailed story for a specific name
async function getDetailedStory(name: string): Promise<NameData> {
  const normalizedName = name.toLowerCase().replace(/[^a-z]/g, '');
  
  // First check our comprehensive database
  const dbEntry = SLOVAK_NAMES_DATABASE[name];
  if (dbEntry) {
    return {
      name: dbEntry.name || name,
      slug: dbEntry.slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      gender: dbEntry.gender || 'U',
      origin: dbEntry.origin || '',
      meaning: dbEntry.meaning || '',
      description: dbEntry.description || '',
      wikipediaUrl: dbEntry.wikipediaUrl || undefined,
      wikipediaExtract: dbEntry.wikipediaExtract || '',
      variants: dbEntry.variants || [],
      characteristics: dbEntry.characteristics || '',
      personality: dbEntry.personality || '',
      behavior: dbEntry.behavior || '',
      astrology: dbEntry.astrology || '',
      stones: dbEntry.stones || '',
      colors: dbEntry.colors || '',
      numbers: dbEntry.numbers || '',
      compatibility: dbEntry.compatibility || ''
    };
  }
  
  // Try Wikidata search
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
          const wikipediaData = await fetchFromWikipedia(name, binding.wikipedia?.value);
          
          return {
            name: binding.nameLabel?.value || name,
            slug: binding.nameLabel?.value?.toLowerCase().replace(/[^a-z0-9]/g, '-') || name.toLowerCase(),
            gender: binding.gender?.value?.includes('Q6581097') ? 'M' : 
                    binding.gender?.value?.includes('Q6581072') ? 'F' : 'U',
            origin: binding.origin?.value || '',
            meaning: binding.meaning?.value || '',
            description: binding.description?.value || '',
            wikipediaUrl: binding.wikipedia?.value || undefined,
            wikipediaExtract: wikipediaData.wikipediaExtract || '',
            variants: []
          };
        }
      }
    } catch (error) {
      console.error(`Error searching for ${searchTerm}:`, error);
    }
  }
  
  // If not found anywhere, return empty structure
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

async function fetchFromWikipedia(name: string, wikipediaUrl?: string): Promise<Partial<NameData>> {
  if (!wikipediaUrl) return {};
  
  try {
    const pageTitle = wikipediaUrl.split('/').pop()?.replace(/_/g, ' ') || name;
    const url = `https://sk.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'meniny365.sk/1.0 (https://meniny365.sk)',
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        wikipediaExtract: data.extract || '',
        wikipediaUrl: data.content_urls?.desktop?.page || wikipediaUrl
      };
    }
  } catch (error) {
    console.error(`Error fetching Wikipedia data for ${name}:`, error);
  }
  
  return {};
}

export const GET: APIRoute = async ({ url }) => {
  const action = url.searchParams.get('action') || 'single';
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
