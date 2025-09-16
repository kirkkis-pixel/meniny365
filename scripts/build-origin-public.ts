import * as fs from 'fs';
import * as path from 'path';

interface OriginEntry {
  name: string;
  slug: string;
  description?: string;
  wikiSource?: {
    project: string;
    title: string;
    url: string;
  };
  originLangs?: string[];
  variants?: string[];
  gender?: "F" | "M" | "U";
}

interface OriginCache {
  [key: string]: OriginEntry;
}

const sampleOriginData: OriginCache = {
  "Adam": {
    name: "Adam",
    slug: "adam",
    description: "Adam je mužské krstné meno hebrejského pôvodu. V Biblii je Adam prvý človek, ktorého stvoril Boh.",
    wikiSource: {
      project: "sk.wikipedia.org",
      title: "Adam_(meno)",
      url: "https://sk.wikipedia.org/wiki/Adam_(meno)"
    },
    originLangs: ["hebrejské"],
    variants: ["Adám", "Adamek"],
    gender: "M"
  },
  "Emma": {
    name: "Emma",
    slug: "emma",
    description: "Emma je ženské krstné meno germánskeho pôvodu. Pochádza zo starogermánskeho slova 'ermen' znamenajúceho 'univerzálny' alebo 'celý'.",
    wikiSource: {
      project: "sk.wikipedia.org",
      title: "Emma_(meno)",
      url: "https://sk.wikipedia.org/wiki/Emma_(meno)"
    },
    originLangs: ["germánske", "starogermánske"],
    variants: ["Ema", "Emka"],
    gender: "F"
  },
  "Jakub": {
    name: "Jakub",
    slug: "jakub",
    description: "Jakub je mužské krstné meno hebrejského pôvodu. V Biblii je Jakub syn Izáka a vnuk Abraháma.",
    wikiSource: {
      project: "sk.wikipedia.org",
      title: "Jakub_(meno)",
      url: "https://sk.wikipedia.org/wiki/Jakub_(meno)"
    },
    originLangs: ["hebrejské"],
    variants: ["Jakob", "Kuba", "Kubko"],
    gender: "M"
  },
  "Sofia": {
    name: "Sofia",
    slug: "sofia",
    description: "Sofia je ženské krstné meno gréckeho pôvodu. Pochádza z gréckeho slova 'sophia' znamenajúceho 'múdrosť'.",
    wikiSource: {
      project: "sk.wikipedia.org",
      title: "Sofia_(meno)",
      url: "https://sk.wikipedia.org/wiki/Sofia_(meno)"
    },
    originLangs: ["grécke"],
    variants: ["Sofie", "Sofka", "Sofinka"],
    gender: "F"
  },
  "Oliver": {
    name: "Oliver",
    slug: "oliver",
    description: "Oliver je mužské krstné meno latinského pôvodu. Pochádza z latinského slova 'oliva' znamenajúceho 'oliva'.",
    wikiSource: {
      project: "sk.wikipedia.org",
      title: "Oliver_(meno)",
      url: "https://sk.wikipedia.org/wiki/Oliver_(meno)"
    },
    originLangs: ["latinské"],
    variants: ["Olivier", "Oli", "Ollie"],
    gender: "M"
  },
  "Nina": {
    name: "Nina",
    slug: "nina",
    description: "Nina je ženské krstné meno s rôznymi pôvodmi. Môže pochádzať z gréckeho, latinského alebo ruského pôvodu.",
    wikiSource: {
      project: "sk.wikipedia.org",
      title: "Nina_(meno)",
      url: "https://sk.wikipedia.org/wiki/Nina_(meno)"
    },
    originLangs: ["grécke", "latinské", "ruské"],
    variants: ["Ninka", "Ninča"],
    gender: "F"
  }
};

async function buildOriginData(): Promise<OriginCache> {
  return sampleOriginData;
}

async function main() {
  try {
    console.log('Building origin and meaning data...');
    
    const data = await buildOriginData();
    
    const dataDir = path.join(process.cwd(), 'src', 'data', 'public');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const filePath = path.join(dataDir, 'origin-cache.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log(`✅ Origin data written to ${filePath}`);
    console.log(`📚 Origin entries: ${Object.keys(data).length}`);
    console.log(`👨 Male names: ${Object.values(data).filter(entry => entry.gender === 'M').length}`);
    console.log(`👩 Female names: ${Object.values(data).filter(entry => entry.gender === 'F').length}`);
    
  } catch (error) {
    console.error('❌ Error building origin data:', error);
    process.exit(1);
  }
}

main();
