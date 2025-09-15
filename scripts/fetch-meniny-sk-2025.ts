/**
 * Script to fetch Slovak name days data for 2025
 * This is a demo script - in production, you would fetch from real sources
 */

import fs from 'fs';
import path from 'path';

// Demo data for 2025 - in production, this would be fetched from real sources
const meninyData2025 = {
  "2025-01-01": ["Gašpar", "Melchior", "Baltazar"],
  "2025-01-02": ["Alexandra", "Karina", "Sandra"],
  "2025-01-03": ["Daniel", "Danuša"],
  "2025-01-04": ["Drahoslav", "Drahoš"],
  "2025-01-05": ["Andrea", "Ondrej"],
  "2025-01-06": ["Antónia", "Anton"],
  "2025-01-07": ["Bohuslava", "Bohuslav"],
  "2025-01-08": ["Severín", "Severián"],
  "2025-01-09": ["Alexej", "Alexandra"],
  "2025-01-10": ["Dáša", "Dáška"],
  "2025-01-11": ["Malvína", "Malva"],
  "2025-01-12": ["Ernest", "Ernesta"],
  "2025-01-13": ["Rastislav", "Rastislava"],
  "2025-01-14": ["Radovan", "Radovana"],
  "2025-01-15": ["Dobroslav", "Dobroslava"],
  "2025-01-16": ["Kristína", "Kristián"],
  "2025-01-17": ["Nataša", "Nataľa"],
  "2025-01-18": ["Bohdana", "Bohdan"],
  "2025-01-19": ["Sára", "Sára"],
  "2025-01-20": ["Dalibor", "Dalibora"],
  "2025-01-21": ["Vincent", "Vincenta"],
  "2025-01-22": ["Zora", "Zorana"],
  "2025-01-23": ["Miloš", "Miloša"],
  "2025-01-24": ["Timotej", "Timotea"],
  "2025-01-25": ["Gejza", "Gejza"],
  "2025-01-26": ["Tamara", "Tamara"],
  "2025-01-27": ["Bohuš", "Bohuša"],
  "2025-01-28": ["Alfonz", "Alfonza"],
  "2025-01-29": ["Gašpar", "Gašpara"],
  "2025-01-30": ["Emil", "Emília"],
  "2025-01-31": ["Emil", "Emília"],
  // Add more months as needed...
};

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'src', 'data', 'meniny-sk');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Split data by months and save
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

months.forEach(month => {
  const monthData: Record<string, string[]> = {};
  
  // Filter data for this month
  Object.entries(meninyData2025).forEach(([date, names]) => {
    if (date.startsWith(`2025-${month}`)) {
      monthData[date] = names;
    }
  });
  
  // Save month file
  const filename = `2025-${month}.json`;
  const filepath = path.join(dataDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(monthData, null, 2));
  console.log(`✅ Created ${filename} with ${Object.keys(monthData).length} days`);
});

console.log('🎉 Successfully created monthly data files for 2025');
