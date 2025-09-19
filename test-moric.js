// Test script to fetch Móric story
async function getMoricStory() {
  console.log('Fetching detailed story for Móric...');
  
  try {
    // Search Wikidata for Móric
    const searchQuery = `
      SELECT DISTINCT ?name ?nameLabel ?gender ?origin ?meaning ?description ?wikipedia WHERE {
        ?name wdt:P31 wd:Q202444 .
        ?name wdt:P407 wd:Q9058 .
        ?name rdfs:label ?nameLabel .
        FILTER(LANG(?nameLabel) = "sk")
        FILTER(CONTAINS(LCASE(?nameLabel), "móric"))
        
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
      console.log('Wikidata response:', JSON.stringify(data, null, 2));
      
      if (data.results.bindings.length > 0) {
        const binding = data.results.bindings[0];
        console.log('Found Móric in Wikidata:', binding);
        
        const moricData = {
          name: binding.nameLabel?.value || 'Móric',
          slug: 'moric',
          gender: binding.gender?.value?.includes('Q6581097') ? 'M' : 'U',
          origin: binding.origin?.value || 'latinský',
          meaning: binding.meaning?.value || 'pochádzajúci z Mauretánie',
          description: binding.description?.value || 'Mužské meno Móric má latinský pôvod a jeho význam znie "pochádzajúci z Mauretánie" (v Severnej Afrike).',
          wikipediaUrl: binding.wikipedia?.value || undefined,
          variants: ['Móric', 'Móric', 'Móric'],
          characteristics: 'Je jemným, starostlivým, bojazlivým a nepriebojným človekom. Vie sa občas zavesiť na niekoho vplyvného a potom, za jeho chrbtom sa dokáže zabezpečiť.',
          personality: 'Je nerád v centre pozornosti, snaží sa byť v ústraní a nepozorovane si "prihrievať svoju polievočku". Byť jeho spoločníkom znamená vykonávať jeho nápady a vystavovať svoje postavenie riziku za neho.',
          behavior: 'Nikdy neriskuje, nikdy sa nesnaží priveľa investovať, alebo sa presadiť do centra diania. Zodpovednosť za všetko radšej nechá na svojej partnerke. Pritom sa však rád hrá na vodcu a snaží sa aspoň pred príbuznými vystupovať autoritatívne.',
          astrology: 'Ovplyvňuje ho planéta Jupiter.',
          stones: 'Jeho ochranné kamene sú ametyst a granát.',
          colors: 'Modrá, fialová',
          numbers: '3, 12, 21',
          compatibility: 'Najlepšie sa zhoduje s menami: Mária, Anna, Zuzana, Peter, Ján, Michal'
        };
        
        console.log('Enhanced Móric data:', JSON.stringify(moricData, null, 2));
        return moricData;
      } else {
        console.log('Móric not found in Wikidata, creating enhanced entry...');
        
        const moricData = {
          name: 'Móric',
          slug: 'moric',
          gender: 'M',
          origin: 'latinský',
          meaning: 'pochádzajúci z Mauretánie',
          description: 'Mužské meno Móric má latinský pôvod a jeho význam znie "pochádzajúci z Mauretánie" (v Severnej Afrike).',
          variants: ['Móric', 'Móric', 'Móric'],
          characteristics: 'Je jemným, starostlivým, bojazlivým a nepriebojným človekom. Vie sa občas zavesiť na niekoho vplyvného a potom, za jeho chrbtom sa dokáže zabezpečiť.',
          personality: 'Je nerád v centre pozornosti, snaží sa byť v ústraní a nepozorovane si "prihrievať svoju polievočku". Byť jeho spoločníkom znamená vykonávať jeho nápady a vystavovať svoje postavenie riziku za neho.',
          behavior: 'Nikdy neriskuje, nikdy sa nesnaží priveľa investovať, alebo sa presadiť do centra diania. Zodpovednosť za všetko radšej nechá na svojej partnerke. Pritom sa však rád hrá na vodcu a snaží sa aspoň pred príbuznými vystupovať autoritatívne.',
          astrology: 'Ovplyvňuje ho planéta Jupiter.',
          stones: 'Jeho ochranné kamene sú ametyst a granát.',
          colors: 'Modrá, fialová',
          numbers: '3, 12, 21',
          compatibility: 'Najlepšie sa zhoduje s menami: Mária, Anna, Zuzana, Peter, Ján, Michal'
        };
        
        console.log('Created enhanced Móric entry:', JSON.stringify(moricData, null, 2));
        return moricData;
      }
    } else {
      console.error('Error fetching from Wikidata:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching Móric story:', error);
    return null;
  }
}

// Main function
async function main() {
  console.log('Testing Móric story fetching...');
  
  const moricStory = await getMoricStory();
  
  if (moricStory) {
    const fs = require('fs');
    const outputPath = 'moric-story.json';
    fs.writeFileSync(outputPath, JSON.stringify(moricStory, null, 2));
    console.log(`Saved Móric story to ${outputPath}`);
  }
}

// Run the script
main().catch(console.error);
