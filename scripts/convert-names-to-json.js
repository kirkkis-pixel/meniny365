import fs from 'fs';

// Complete Slovak name day data for 2025
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

March
1. Albín, Albína, Biela, Bieloš, Biela, Bieloslava
2. Anežka, Ines, Ineza, Agnesa
3. Bohumil, Bohumila, Ticián, Ticiána
4. Kazimír, Kazimíra
5. Fridrich, Frederika, Frico
6. Radoslav, Radoslava
7. Tomáš, Tomáška
8. Alan, Alana, Alena, Milena, Milota
9. Františka, Franciska
10. Branislav, Branislava
11. Angela, Angelika, Angelina
12. Gregor, Gregorius, Gregoria, Gregorína
13. Vlastimil, Vlastimila
14. Matilda
15. Svetlana, Svetla
16. Boleslav, Boleslava
17. Ľubica, Ľuboslav, Ľuboslava
18. Eduard, Eduarda
19. Jozef, Jozefa
20. Klaudius, Klaudia
21. Viktor, Viktória
22. Blahoslav, Blahoslava
23. Oto, Otília
24. Gabriel, Gabriela
25. Marián, Mária
26. Emanuel, Emanuela
27. Alžbeta, Líza, Liliana
28. Zoltán, Zlatica
29. Miroslav, Miroslava
30. Viera, Vieroslava
31. Benjamín, Benjamína

April
1. Hugo, Hugolín
2. Zita, Zitoslav
3. Richard, Richarda
4. Izidor, Izidora
5. Albert, Alberta, Albertína
6. Miloslav, Miloslava
7. Marcel, Marcela
8. Erich, Erika
9. Slavomír, Slavomíra
10. Apolónia, Apolena
11. Rudolf, Rudolfa
12. Valér, Valéria
13. Justín, Justína
14. Fedor, Fedora
15. Anastázia, Anastáz
16. Irena, Irena
17. Ferdinand, Ferdinanda
18. Valdemar, Valdemara
19. Leo, Leona, Leonarda
20. Oto, Otília
21. Želmíra, Želmír
22. Vojtech, Vojteška
23. Juraj, Jurana
24. Marek, Marka
25. Jaroslav, Jaroslava
26. Milana, Milan
27. Robert, Roberta
28. Viola, Violeta
29. Timotej, Timotea
30. Anastáz, Anastázia

May
1. Filip, Filipa
2. Hermína, Hermín
3. Ema, Emma
4. Irena, Irena
5. Žigmund, Žigmunda
6. Galina, Gali
7. Monika, Mona
8. Ingrida, Ingrid
9. Roland, Rolanda
10. Viktória, Viktor
11. Blažena, Blažej
12. Pankrác, Pankrácia
13. Servác, Servácia
14. Bonifác, Bonifácia
15. Žofia, Sofia
16. Aneta, Anetta
17. Gizela, Gizka
18. Milica, Milka
19. Jozefína, Jozef
20. Bernard, Bernarda
21. Zina, Zinaida
22. Júlia, Juliána
23. Želmíra, Želmír
24. Ela, Elena, Helena
25. Urban, Urbán
26. Dušan, Dušana
27. Iveta, Iva
28. Viliam, Vilma
29. Vilma, Viliam
30. Ferdinand, Ferdinanda
31. Petronela, Petronella

June
1. Žaneta, Žaneta
2. Xénia, Ksenia
3. Karol, Karla
4. Lenka, Lena
5. Laura, Lori
6. Norbert, Norberta
7. Róbert, Roberta
8. Medard, Medarda
9. Stanislava, Stanislav
10. Margaréta, Margita
11. Dobroslava, Dobroslav
12. Zlatko, Zlatka
13. Anton, Antónia
14. Vasil, Vasilisa
15. Vít, Víta
16. Blanka, Bianka
17. Adolf, Adolfa
18. Vratislav, Vratislava
19. Alfréd, Alfréda
20. Valéria, Valér
21. Alojz, Alojzia
22. Viola, Violeta
23. Zdenka, Zdenko
24. Ján, Jana
25. Olívia, Oliver
26. Tadeáš, Tadeáška
27. Ladislav, Ladislava
28. Beáta, Beata
29. Peter, Pavol, Petra
30. Milada, Miladín

July
1. Diana, Dajana
2. Berta, Bertína
3. Miloslav, Miloslava
4. Prokop, Prokopa
5. Cyril, Metod
6. Patrik, Patrícia
7. Oliver, Olívia
8. Ivan, Ivana
9. Lujza, Alojzia
10. Amália, Amalie
11. Milota, Milena
12. Nina, Ninoslava
13. Margaréta, Margita
14. Kamil, Kamila
15. Henrich, Henrieta
16. Drahomír, Drahomíra
17. Bohuslav, Bohuslava
18. Kamila, Kamil
19. Dušana, Dušan
20. Iľja, Eliáš
21. Daniel, Daniela
22. Magdaléna, Magda
23. Oľga, Olgica
24. Vladimír, Vladimíra
25. Jakub, Jakuba
26. Anna, Hana
27. Božena, Boženka
28. Krištof, Krištofa
29. Marta, Martuška
30. Ignác, Ignácia
31. Božidara, Božidar

August
1. Božidara, Božidar
2. Gustáv, Gustáva
3. Jerguš, Jerguša
4. Dominik, Dominika
5. Hortenzia, Hortenz
6. Jozefína, Jozef
7. Štefánia, Štefan
8. Oskar, Oskár
9. Ľubomír, Ľubomíra
10. Vavrinec, Vavrínec
11. Zuzana, Suzana
12. Darina, Dária
13. Ľubomír, Ľubomíra
14. Mojmír, Mojmíra
15. Marcela, Marcel
16. Leonard, Leonarda
17. Milica, Milka
18. Elena, Helena
19. Lýdia, Lídia
20. Anabela, Anabella
21. Jana, Ján
22. Tichomír, Tichomíra
23. Filip, Filipa
24. Bartolomej, Bartolomea
25. Ľudovít, Ľudovíta
26. Samuel, Samuela
27. Silvia, Silvester
28. Augustín, Augustína
29. Nikola, Nikolaj
30. Ružena, Ružica
31. Nora, Norberta

September
1. Drahoslava, Drahoslav
2. Linda, Lívia
3. Belo, Bela
4. Rozália, Ružena
5. Regína, Regína
6. Alica, Alisa
7. Marianna, Mariana
8. Miriama, Miriam
9. Martina, Martin
10. Oleg, Oľga
11. Bystrík, Bystríka
12. Mária, Marián
13. Ctibor, Ctibora
14. Ľudomil, Ľudomila
15. Jolana, Melisa, Melita
16. Ľudmila, Ľudomil
17. Olympia, Olymp
18. Eugénia, Eugen
19. Konštantín, Konštantína
20. Ľuboslav, Ľuboslava
21. Matúš, Matej
22. Móric, Maurícius
23. Zdenka, Zdenko
24. Ľuboš, Ľubomír
25. Vladislav, Vladislava
26. Edita, Edit
27. Cyprián, Cypriána
28. Václav, Václava
29. Michal, Michaela
30. Jarolím, Jarolíma

October
1. Arnold, Arnolda
2. Leona, Leontína
3. Stela, Stella
4. František, Františka
5. Viera, Vieroslava
6. Natália, Natália
7. Sergej, Sergína
8. Brigita, Brigitta
9. Dionýz, Dionýza
10. Slavomíra, Slavomír
11. Valentína, Valentín
12. Maximilián, Maximiliána
13. Koloman, Kolomana
14. Boris, Borislav
15. Terézia, Tereza
16. Vladimíra, Vladimír
17. Hedviga, Hedviga
18. Lukáš, Lukáška
19. Kristián, Kristiána
20. Vendelín, Vendelína
21. Uršuľa, Uršula
22. Sergej, Sergína
23. Alojz, Alojzia
24. Kvetoslava, Kvetoslav
25. Aurel, Aurélia
26. Demeter, Demetra
27. Sabína, Sabína
28. Dobromila, Dobromil
29. Šimon, Šimona
30. Vendelín, Vendelína
31. Aurélia, Aurel

November
1. Denis, Denisa
2. Hubert, Huberta
3. Karol, Karla
4. Imrich, Imricha
5. Filoména, Filomén
6. Leonard, Leonarda
7. René, Renáta
8. Bohumír, Bohumíra
9. Teodor, Teodora
10. Tibor, Tibora
11. Martin, Martina
12. Svätopluk, Svätopluka
13. Stanislav, Stanislava
14. Eugen, Eugénia
15. Albert, Alberta
16. Leopold, Leopolda
17. Klaudia, Klaudius
18. Eugen, Eugénia
19. Alžbeta, Líza
20. Félix, Felícia
21. Cecília, Cecilián
22. Klement, Klementína
23. Emília, Emil
24. Katarína, Katarína
25. Kornel, Kornélia
26. Milan, Milana
27. Henrieta, Henrich
28. Štefan, Štefánia
29. Vratislav, Vratislava
30. Ondrej, Ondreja

December
1. Eduard, Eduarda
2. Milica, Milka
3. Oldrich, Oldricha
4. Barbora, Barbara
5. Oto, Otília
6. Mikuláš, Nikola
7. Ambróz, Ambrózia
8. Marína, Marina
9. Izabela, Izabel
10. Judita, Judit
11. Dagmar, Dagmara
12. Lýdia, Lídia
13. Lucia, Luciana
14. Branislava, Branislav
15. Ivica, Ivona
16. Albína, Albín
17. Kornélia, Kornel
18. Sláva, Slávka
19. Judita, Judit
20. Dagmara, Dagmar
21. Bohdan, Bohdana
22. Štefan, Štefánia
23. Vlasta, Vlastimil
24. Adam, Eva
25. Prvé sviatky vianočné
26. Štefan, Štefánia
27. Jonáš, Jonáška
28. Dávid, Dávida
29. Milada, Miladín
30. Dávid, Dávida
31. Silvester, Silvestra
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
