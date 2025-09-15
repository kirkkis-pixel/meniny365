/**
 * Script to merge monthly data files into a single 2025 file
 */

import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src', 'data', 'meniny-sk');
const outputFile = path.join(dataDir, 'meniny-2025.json');

// Read all monthly files
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const mergedData: Record<string, string[]> = {};

months.forEach(month => {
  const filename = `2025-${month}.json`;
  const filepath = path.join(dataDir, filename);
  
  if (fs.existsSync(filepath)) {
    const monthData = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    Object.assign(mergedData, monthData);
    console.log(`✅ Merged ${filename} (${Object.keys(monthData).length} days)`);
  } else {
    console.log(`⚠️  File ${filename} not found, skipping...`);
  }
});

// Save merged data
fs.writeFileSync(outputFile, JSON.stringify(mergedData, null, 2));
console.log(`🎉 Successfully created meniny-2025.json with ${Object.keys(mergedData).length} days`);
