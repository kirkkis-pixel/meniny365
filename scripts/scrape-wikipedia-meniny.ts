import fs from 'fs';
import path from 'path';

// Wikipedia data structure - manually extracted and organized
const wikipediaData = {
  "2025": {
    "01": {
      "01": ["Alexandra", "Ábel", "Makar", "Karina", "Kara", "Kasandra", "Sanda", "Sandra", "Saša", "Senda"],
      "02": ["Daniela", "Danila", "Danuta", "Genovéva", "Radmila"],
      "03": ["Drahoľub", "Drahomil", "Drahoň", "Drahoslav", "Drahoš", "Duchoslav", "León", "Títus", "Drahoľuba", "Drahomila", "Duchoslava", "Leóna", "Leónia"],
      "04": ["Artúr", "Arthur", "Andrea"],
      "05": ["Melchior", "Melichar", "Menhaden"],
      "06": ["Antónia"],
      "07": ["Atila", "Lucián", "Bohuna", "Bohuslava", "Boleslava", "Božislava", "Luciána"],
      "08": ["Čestmír", "Pravomil", "Severín", "Čestmíra", "Pravomila", "Severína"],
      "09": ["Alex", "Alexej", "Domoľub", "Julián", "Pravoľub", "Vladan", "Vladen", "Alexia", "Pravoľuba", "Vladana", "Vladena"],
      "10": ["Agatón", "Dalimil", "Dalimír", "Dalimila", "Dalimíra", "Daša"],
      "11": ["Honorát", "Tasilo", "Honoráta", "Malvína"],
      "12": ["Arkád", "Arnošt", "Ernest", "Arkádia", "Arnoštka", "Erna", "Ernestína"],
      "13": ["Čistomil", "Čistoslav", "Rastic", "Rastimír", "Rastislav", "Ratislav", "Vidor", "Čistomila", "Čistoslava", "Rastislava", "Ratislava", "Shane"],
      "14": ["Hilár", "Radovan", "Uriáš", "Uriel", "Hilária", "Radovana"],
      "15": ["Dobroslav", "Dobrotín", "Domoslav", "Loránt", "Múdroslav", "Domoslava"],
      "16": ["Kristína"],
      "17": ["Antal"],
      "18": ["Nataša"],
      "19": ["Priskus", "Bohdana", "Piroška", "Priska"],
      "20": ["Mário", "Márius", "Drahomíra", "Dúbravka", "Sára"],
      "21": ["Dalibor"],
      "22": ["Fabián", "Fábius", "Sebastián", "Šebastián", "Fábia", "Fabiána", "Fabiola", "Sebastiána"],
      "23": ["Vincent", "Vincencia"],
      "24": ["Zora", "Dorián", "Sírius", "Slavoľub", "Slavomil", "Zoran", "Auróra", "Cyntia", "Doriána", "Sinda", "Slavomila", "Zorana"],
      "25": ["Miloš", "Miloň", "Selma"],
      "26": ["Timotej", "Ctiboh", "Timotea"],
      "27": ["Gejza", "Saul", "Šavol"],
      "28": ["Tamara"],
      "29": ["Polykarp", "Slavibor", "Slavislav", "Slaviboj", "Slavoboj", "Svätoboj", "Svätobor", "Xenofón", "Žarko", "Polykarpa"],
      "30": ["Bohuš", "Pribislav", "Pribiš"],
      "31": ["Alfonz", "Manfréd", "Alfonzia"]
    },
    "02": {
      "01": ["Hynek", "Trifon", "Táňa", "Tatiana"],
      "02": ["Erik", "Aida", "Erika"],
      "03": ["Blažej", "Celerín", "Celerína"],
      "04": ["Nika", "Verena", "Verona", "Veronika"],
      "05": ["Moderát", "Modest", "Agáta", "Leda", "Moderáta", "Modesta"],
      "06": ["Dorisa", "Dorota", "Titanila"],
      "07": ["Romuald", "Vanda"],
      "08": ["Aranka", "Zoja"],
      "09": ["Rainold", "Rinaldo", "Zdenko", "Zdeno", "Apolena", "Apoliena", "Apolónia"],
      "10": ["Gabriela", "Omar", "Várun", "Scholastika", "Školastika"],
      "11": ["Dezider", "Želislav", "Dezidera", "Želislava"],
      "12": ["Ron", "Ronald", "Zoro", "Zoroslav", "Eulália", "Perla", "Slavena", "Solveiga", "Zoroslava"],
      "13": ["Arpád", "Jordán", "Jordána"],
      "14": ["Valentín", "Velimír"],
      "15": ["Faust", "Pravoslav", "Faustína", "Georgia", "Georgína", "Pravoslava"],
      "16": ["Pamfil", "Ida", "Liana", "Pamfília"],
      "17": ["Flavián", "Flávius", "Silván", "Silvín", "Flávia", "Milomíra", "Miloslava", "Miluša", "Silvána"],
      "18": ["Jaromír", "Simeon", "Jaromíra", "Konkordia"],
      "19": ["Konrád", "Kurt", "Vlasta"],
      "20": ["Aladár", "Lívio", "Lívius", "Udo", "Ulrich", "Alma", "Lívia", "Ulrika", "Ulriška"],
      "21": ["Eleonóra"],
      "22": ["Etela"],
      "23": ["Roman", "Romana", "Romina"],
      "24": ["Goran", "Matej", "Jazmína", "Mateja", "Matias"],
      "25": ["Frederik", "Taras", "Federika", "Frederika"],
      "26": ["Viktor", "Porfýr"],
      "27": ["Alexander", "Leander", "Sandro", "Skender", "Drahotína", "Dražica", "Leandra"],
      "28": ["Elemír", "Elo", "Lumír", "Zlata", "Zlatica"]
    },
    "03": {
      "01": ["Albín"],
      "02": ["Anežka"],
      "03": ["Bohumil", "Bohumila", "Ticián", "Ginda", "Kunigunda", "Ticiána"],
      "04": ["Gerazim", "Kazimír", "Romeo", "Jadrana", "Kazimíra"],
      "05": ["Fridrich", "Lucius", "Teofil", "Friderika", "Teofila"],
      "06": ["Fridolín", "Koriolán", "Radislav", "Radoslav", "Radovan", "Felícia", "Fridolína", "Radislava", "Radoslava"],
      "07": ["Tomáš", "Tomislav", "Tomáška", "Tomislava"],
      "08": ["Alan", "Alana", "Erhard"],
      "09": ["Františka"],
      "10": ["Branislav", "Bratislav", "Bruno", "Branislava", "Bratislava", "Brunhilda"],
      "11": ["Angela", "Angelika", "Angelina"],
      "12": ["Gregor", "Gregorius", "Gregoria", "Gregorína"],
      "13": ["Vlastimil", "Vlastimila"],
      "14": ["Matilda"],
      "15": ["Svetlana", "Svetla"],
      "16": ["Boleslav", "Boleslava"],
      "17": ["Ľubica"],
      "18": ["Eduard", "Eduarda"],
      "19": ["Jozef", "Jozefa"],
      "20": ["Víťazoslav", "Víťazoslava"],
      "21": ["Blahoslav", "Blahoslava"],
      "22": ["Beňadik", "Benedikt", "Benjamín", "Benjamína"],
      "23": ["Adrián", "Adriána"],
      "24": ["Gabriel", "Gabriela"],
      "25": ["Marián", "Mariána", "Marieta", "Marietta"],
      "26": ["Emanuel", "Emanuela"],
      "27": ["Alena"],
      "28": ["Soňa"],
      "29": ["Miroslav", "Miroslava"],
      "30": ["Vieroslava", "Viera"],
      "31": ["Benjamín", "Benjamína"]
    }
  }
};

// Convert to our format
function convertToOurFormat() {
  const result: any = {};
  
  for (const year in wikipediaData) {
    result[year] = {};
    const yearData = wikipediaData[year as keyof typeof wikipediaData];
    
    for (const month in yearData) {
      result[year][month] = {};
      const monthData = yearData[month as keyof typeof yearData];
      
      for (const day in monthData) {
        const names = monthData[day as keyof typeof monthData];
        result[year][month][day] = names;
      }
    }
  }
  
  return result;
}

// Save the data
const convertedData = convertToOurFormat();
const outputPath = path.join(process.cwd(), 'src', 'data', 'meniny-sk', 'meniny-2025.json');

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(convertedData, null, 2));
console.log('✅ Wikipedia data converted and saved to:', outputPath);
