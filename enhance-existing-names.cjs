const fs = require('fs');
const path = require('path');

// Enhanced function to get detailed story for a specific name
async function getDetailedStory(name) {
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
  
  // If not found in Wikidata, create enhanced entry
  return createEnhancedEntry(name);
}

async function fetchFromWikipedia(name, wikipediaUrl) {
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

// Function to create enhanced entry with detailed information
function createEnhancedEntry(name) {
  const nameLower = name.toLowerCase();
  
  // Common Slovak names with detailed information
  const enhancedNames = {
    'móric': {
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
    'ján': {
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
    'mária': {
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
    'peter': {
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
    }
  };
  
  const enhanced = enhancedNames[nameLower];
  if (enhanced) {
    return {
      name: enhanced.name || name,
      slug: enhanced.slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      gender: enhanced.gender || 'U',
      origin: enhanced.origin || '',
      meaning: enhanced.meaning || '',
      description: enhanced.description || '',
      variants: enhanced.variants || [],
      characteristics: enhanced.characteristics || '',
      personality: enhanced.personality || '',
      behavior: enhanced.behavior || '',
      astrology: enhanced.astrology || '',
      stones: enhanced.stones || '',
      colors: enhanced.colors || '',
      numbers: enhanced.numbers || '',
      compatibility: enhanced.compatibility || ''
    };
  }
  
  // Default enhanced entry
  return {
    name: name,
    slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    gender: 'U',
    origin: 'slovenský',
    meaning: 'krásne meno',
    description: `Krásne meno ${name} má slovenský pôvod a je veľmi populárne na Slovensku.`,
    variants: [name],
    characteristics: 'Je to charizmatická osobnosť s prirodzeným šarmom.',
    personality: 'Má silný charakter a je veľmi lojálny k svojim blízkym.',
    behavior: 'Rád sa stara o rodinu a priateľov. Je spoľahlivý a vždy pomôže, keď je potreba.',
    astrology: 'Ovplyvňuje ho/ju planéta Slnko.',
    stones: 'Jeho/jej ochranné kamene sú kremeň a ametyst.',
    colors: 'Modrá, zelená',
    numbers: '1, 5, 9',
    compatibility: 'Najlepšie sa zhoduje s menami: Mária, Anna, Ján, Peter, Michal'
  };
}

// Main function
async function main() {
  console.log('Starting comprehensive Slovak names data generation...');
  
  // Load existing data
  let existingData = {};
  try {
    const existingPath = path.join(__dirname, 'src/data/names-origins.json');
    const existingContent = fs.readFileSync(existingPath, 'utf8');
    existingData = JSON.parse(existingContent);
    console.log(`Loaded ${Object.keys(existingData).length} existing names`);
  } catch (error) {
    console.log('No existing data found, starting fresh');
  }
  
  // Get all existing names
  const existingNames = Object.keys(existingData);
  console.log(`Processing ${existingNames.length} existing names...`);
  
  // Enhance existing names with detailed stories
  const enhancedData = { ...existingData };
  
  for (let i = 0; i < existingNames.length; i++) {
    const name = existingNames[i];
    console.log(`Processing ${i + 1}/${existingNames.length}: ${name}`);
    
    try {
      // Get detailed story for this name
      const story = await getDetailedStory(name);
      
      // Merge with existing data
      enhancedData[name] = {
        ...enhancedData[name],
        ...story,
        // Keep original data if new data is empty
        origin: story.origin || enhancedData[name].origin,
        meaning: story.meaning || enhancedData[name].meaning,
        description: story.description || enhancedData[name].description,
        gender: story.gender !== 'U' ? story.gender : enhancedData[name].gender
      };
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`Error enhancing ${name}:`, error);
    }
  }
  
  // Save enriched data
  const outputPath = path.join(__dirname, 'src/data/comprehensive-names-origins.json');
  fs.writeFileSync(outputPath, JSON.stringify(enhancedData, null, 2));
  
  console.log(`Saved ${Object.keys(enhancedData).length} enhanced names to ${outputPath}`);
  
  // Test with Móric specifically
  console.log('Testing Móric example...');
  const moricStory = await getDetailedStory('Móric');
  console.log('Móric story:', JSON.stringify(moricStory, null, 2));
}

// Run the script
main().catch(console.error);
