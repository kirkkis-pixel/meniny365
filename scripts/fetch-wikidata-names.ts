import fs from 'fs';
import path from 'path';

interface WikidataResult {
  name: string;
  labels: {
    sk?: string;
    en?: string;
  };
  description: {
    sk?: string;
    en?: string;
  };
  relatedNames: string[];
  gender: string;
  languageOfOrigin: string;
  sourceUrl?: string;
}

interface WikidataResponse {
  [name: string]: WikidataResult;
}

// Sample data for Slovak names (in production, this would query Wikidata SPARQL)
const SAMPLE_WIKIDATA: WikidataResponse = {
  'Ján': {
    name: 'Ján',
    labels: {
      sk: 'Ján',
      en: 'John'
    },
    description: {
      sk: 'Mužské krstné meno hebrejského pôvodu',
      en: 'Male given name of Hebrew origin'
    },
    relatedNames: ['Johan', 'Johannes', 'Jean', 'Giovanni', 'Ivan'],
    gender: 'male',
    languageOfOrigin: 'Hebrew',
    sourceUrl: 'https://sk.wikipedia.org/wiki/Ján'
  },
  'Jana': {
    name: 'Jana',
    labels: {
      sk: 'Jana',
      en: 'Jane'
    },
    description: {
      sk: 'Ženské krstné meno hebrejského pôvodu',
      en: 'Female given name of Hebrew origin'
    },
    relatedNames: ['Jane', 'Joanna', 'Johanna', 'Giovanna', 'Ivana'],
    gender: 'female',
    languageOfOrigin: 'Hebrew',
    sourceUrl: 'https://sk.wikipedia.org/wiki/Jana'
  },
  'Peter': {
    name: 'Peter',
    labels: {
      sk: 'Peter',
      en: 'Peter'
    },
    description: {
      sk: 'Mužské krstné meno gréckeho pôvodu',
      en: 'Male given name of Greek origin'
    },
    relatedNames: ['Petr', 'Pierre', 'Pietro', 'Pedro', 'Péter'],
    gender: 'male',
    languageOfOrigin: 'Greek',
    sourceUrl: 'https://sk.wikipedia.org/wiki/Peter'
  },
  'Mária': {
    name: 'Mária',
    labels: {
      sk: 'Mária',
      en: 'Mary'
    },
    description: {
      sk: 'Ženské krstné meno hebrejského pôvodu',
      en: 'Female given name of Hebrew origin'
    },
    relatedNames: ['Mary', 'Marie', 'Maria', 'Marija', 'María'],
    gender: 'female',
    languageOfOrigin: 'Hebrew',
    sourceUrl: 'https://sk.wikipedia.org/wiki/Mária'
  },
  'Michal': {
    name: 'Michal',
    labels: {
      sk: 'Michal',
      en: 'Michael'
    },
    description: {
      sk: 'Mužské krstné meno hebrejského pôvodu',
      en: 'Male given name of Hebrew origin'
    },
    relatedNames: ['Michael', 'Michel', 'Michele', 'Miguel', 'Mihail'],
    gender: 'male',
    languageOfOrigin: 'Hebrew',
    sourceUrl: 'https://sk.wikipedia.org/wiki/Michal'
  },
  'Anna': {
    name: 'Anna',
    labels: {
      sk: 'Anna',
      en: 'Anna'
    },
    description: {
      sk: 'Ženské krstné meno hebrejského pôvodu',
      en: 'Female given name of Hebrew origin'
    },
    relatedNames: ['Anne', 'Ana', 'Anita', 'Annette', 'Hannah'],
    gender: 'female',
    languageOfOrigin: 'Hebrew',
    sourceUrl: 'https://sk.wikipedia.org/wiki/Anna'
  },
  'Jozef': {
    name: 'Jozef',
    labels: {
      sk: 'Jozef',
      en: 'Joseph'
    },
    description: {
      sk: 'Mužské krstné meno hebrejského pôvodu',
      en: 'Male given name of Hebrew origin'
    },
    relatedNames: ['Joseph', 'Josef', 'Giuseppe', 'José', 'Józef'],
    gender: 'male',
    languageOfOrigin: 'Hebrew',
    sourceUrl: 'https://sk.wikipedia.org/wiki/Jozef'
  },
  'Alžbeta': {
    name: 'Alžbeta',
    labels: {
      sk: 'Alžbeta',
      en: 'Elizabeth'
    },
    description: {
      sk: 'Ženské krstné meno hebrejského pôvodu',
      en: 'Female given name of Hebrew origin'
    },
    relatedNames: ['Elizabeth', 'Elisabeth', 'Elisabetta', 'Isabel', 'Elisabeta'],
    gender: 'female',
    languageOfOrigin: 'Hebrew',
    sourceUrl: 'https://sk.wikipedia.org/wiki/Alžbeta'
  },
  'Pavol': {
    name: 'Pavol',
    labels: {
      sk: 'Pavol',
      en: 'Paul'
    },
    description: {
      sk: 'Mužské krstné meno latinského pôvodu',
      en: 'Male given name of Latin origin'
    },
    relatedNames: ['Paul', 'Paolo', 'Pablo', 'Pavel', 'Pál'],
    gender: 'male',
    languageOfOrigin: 'Latin',
    sourceUrl: 'https://sk.wikipedia.org/wiki/Pavol'
  },
  'Katarína': {
    name: 'Katarína',
    labels: {
      sk: 'Katarína',
      en: 'Catherine'
    },
    description: {
      sk: 'Ženské krstné meno gréckeho pôvodu',
      en: 'Female given name of Greek origin'
    },
    relatedNames: ['Catherine', 'Katarina', 'Caterina', 'Catalina', 'Katalin'],
    gender: 'female',
    languageOfOrigin: 'Greek',
    sourceUrl: 'https://sk.wikipedia.org/wiki/Katarína'
  }
};

/**
 * Fetch Wikidata information for Slovak names
 * In production, this would query the Wikidata SPARQL endpoint
 */
async function fetchWikidataNames(names: string[]): Promise<WikidataResponse> {
  console.log(`Fetching Wikidata information for ${names.length} names...`);
  
  // In production, you would make SPARQL queries to Wikidata here
  // For now, we'll use the sample data and filter for requested names
  
  const result: WikidataResponse = {};
  
  for (const name of names) {
    if (SAMPLE_WIKIDATA[name]) {
      result[name] = SAMPLE_WIKIDATA[name];
    } else {
      // Generate basic data for names not in sample
      result[name] = {
        name,
        labels: {
          sk: name,
          en: name
        },
        description: {
          sk: `Krstné meno ${name}`,
          en: `Given name ${name}`
        },
        relatedNames: [],
        gender: 'unknown',
        languageOfOrigin: 'unknown'
      };
    }
  }
  
  return result;
}

/**
 * Main function to fetch and save Wikidata information
 */
async function main() {
  try {
    // Load all names from the meniny data
    const meninyData = JSON.parse(
      fs.readFileSync('./src/data/meniny-sk/meniny-2025-simple.json', 'utf8')
    );
    
    // Extract unique names
    const allNames = new Set<string>();
    Object.values(meninyData).forEach((names: string[]) => {
      names.forEach(name => allNames.add(name));
    });
    
    const uniqueNames = Array.from(allNames);
    console.log(`Found ${uniqueNames.length} unique names`);
    
    // Fetch Wikidata information
    const wikidataInfo = await fetchWikidataNames(uniqueNames);
    
    // Ensure insights directory exists
    const insightsDir = './src/data/insights';
    if (!fs.existsSync(insightsDir)) {
      fs.mkdirSync(insightsDir, { recursive: true });
    }
    
    // Save to file
    const outputPath = path.join(insightsDir, 'wikidata.json');
    fs.writeFileSync(outputPath, JSON.stringify(wikidataInfo, null, 2), 'utf8');
    
    console.log(`Saved Wikidata information for ${Object.keys(wikidataInfo).length} names to ${outputPath}`);
    
  } catch (error) {
    console.error('Error fetching Wikidata information:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { fetchWikidataNames, type WikidataResult, type WikidataResponse };
