import fs from 'fs';

// Sample data from your images - you can paste the full data here
const nameData = `
January
1. [3]
2. Alexandra, Ábel, Makar, Karina, Kara, Kasandra, Sanda, Sandra, Saša, Senda
3. Daniela, Danila, Danuta, Genovéva, Radmila
4. Drahoľub, Drahomil, Drahoň, Drahoslav, Drahoš, Duchoslav, León, Títus, Drahoľuba, Drahomila, Duchoslava, Leóna, Leónia
5. Artúr, Arthur, Andrea
6. Melchior, Melichar, Menhaden, Antónia
7. Atila, Lucián, Bohuna, Bohuslava, Boleslava, Božislava, Luciána
8. Čestmír, Pravomil, Severín, Čestmíra, Pravomila, Severína
9. Alex, Alexej, Domoľub, Julián, Pravoľub, Vladan, Vladen, Alexia, Pravoľuba, Vladana, Vladena
10. Agatón, Dalimil, Dalimír, Dalimila, Dalimíra, Daša
11. Honorát, Tasilo, Honoráta, Malvína
12. Arkád, Arnošt, Ernest, Arkádia, Arnoštka, Erna, Ernestína
13. Čistomil, Čistoslav, Rastic, Rastimír, Rastislav, Ratislav, Vidor, Čistomila, Čistoslava, Rastislava, Ratislava, Shane
14. Hilár, Radovan, Uriáš, Uriel, Hilária, Radovana
15. Dobroslav, Dobrotín, Domoslav, Loránt, Múdroslav, Domoslava
16. Kristína
17. Antal, Nataša
18. Priskus, Bohdana, Piroška, Priska
19. Mário, Márius, Drahomíra, Dúbravka, Sára
20. Dalibor, Fabián, Fábius, Sebastián, Šebastián, Fábia, Fabiána, Fabiola, Sebastiána
21. Vincent, Vincencia
22. Zora, Dorián, Sírius, Slavol'ub, Slavomil, Zoran, Auróra, Cyntia, Doriána, Sinda, Slavomila, Zorana
23. Miloš, Miloň, Selma
24. Timotej, Ctiboh, Timotea
25. Gejza, Saul, Šavol
26. Tamara, Polykarp, Slavibor, Slavislav, Slaviboj, Slavoboj, Svätoboj, Svätobor, Xenofón, Žarko, Polykarpa
27. Bohuš, Pribislav, Pribiš
28. Alfonz, Manfréd, Alfonzia
29. Gašpar, Pribina
30. Ema, Jasna
31. Emil, Emilián, Emiliána

February
1. Hynek, Trifon, Táňa, Tatiana
2. Erik, Aida, Erika
3. Blažej, Celerín, Celerína
4. Nika, Verena, Verona, Veronika
5. Moderát, Modest, Agáta, Leda, Moderáta, Modesta
6. Dorisa, Dorota, Titanila
7. Romuald, Vanda
8. Aranka, Zoja
9. Rainold, Rinaldo, Zdenko, Zdeno, Apolena, Apoliena, Apolónia
10. Gabriela, Omar, Várun, Scholastika, Školastika
11. Dezider, Želislav, Dezidera, Želislava
12. Ron, Ronald, Zoro, Zoroslav, Eulália, Perla, Slavena, Solveiga, Zoroslava
13. Arpád, Jordán, Jordána
14. Valentín, Velimír
15. Faust, Pravoslav, Faustína, Georgia, Georgína, Pravoslava
16. Pamfil, Ida, Liana, Pamfília
17. Flavián, Flávius, Silván, Silvín, Flávia, Milomíra, Miloslava, Miluša, Silvána
18. Jaromír, Simeon, Jaromíra, Konkordia
19. Konrád, Kurt, Vlasta
20. Aladár, Lívio, Lívius, Udo, Ulrich, Alma, Lívia, Ulrika, Ulriška
21. Eleonóra
22. Etela
23. Roman, Romana, Romina
24. Goran, Matej, Jazmína, Mateja, Matias
25. Frederik, Taras, Federika, Frederika
26. Viktor, Porfýr
27. Alexander, Leander, Sandro, Skender, Drahotína, Dražica, Leandra
28. Elemír, Elo, Lumír, Zlata, Zlatica
29. Radomír, Radomíra
`;

// Convert the text format to JSON
function convertToJSON(text) {
  const lines = text.trim().split('\n');
  const result = {};
  let currentMonth = '';
  let monthNumber = 0;
  
  const monthNames = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check if it's a month header
    if (monthNames[trimmedLine]) {
      currentMonth = monthNames[trimmedLine];
      continue;
    }
    
    // Check if it's a day entry (starts with number)
    const dayMatch = trimmedLine.match(/^(\d+)\.\s*(.*)$/);
    if (dayMatch && currentMonth) {
      const day = dayMatch[1].padStart(2, '0');
      const namesString = dayMatch[2];
      
      // Skip entries with just [number] or empty
      if (namesString === '[3]' || !namesString.trim()) {
        continue;
      }
      
      // Parse names (remove bold markers and split by comma)
      const names = namesString
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
        .split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0);
      
      if (names.length > 0) {
        const dateKey = `2025-${currentMonth}-${day}`;
        result[dateKey] = names;
      }
    }
  }
  
  return result;
}

// Convert the data
const jsonData = convertToJSON(nameData);

// Write to file
fs.writeFileSync('/Users/kaikirkkopelto/new_project/src/data/meniny-sk/meniny-2025-simple.json', JSON.stringify(jsonData, null, 2));

console.log('Converted data saved to meniny-2025-simple.json');
console.log('Sample entries:');
console.log(JSON.stringify(Object.entries(jsonData).slice(0, 5), null, 2));
