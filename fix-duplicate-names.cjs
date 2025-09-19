const fs = require('fs');
const path = require('path');

const COMPREHENSIVE_NAMES_PATH = path.join(__dirname, 'src', 'data', 'comprehensive-names-origins.json');

// Read the comprehensive names file
let names = {};
try {
  names = JSON.parse(fs.readFileSync(COMPREHENSIVE_NAMES_PATH, 'utf8'));
} catch (error) {
  console.error("Error reading comprehensive-names-origins.json:", error);
  process.exit(1);
}

console.log('Original names count:', Object.keys(names).length);

// Function to normalize names for comparison
function normalizeName(name) {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z]/g, ''); // Remove non-letters
}

// Find and remove duplicates
const seen = new Map();
const duplicates = [];
const uniqueNames = {};

for (const [key, value] of Object.entries(names)) {
  const normalized = normalizeName(key);
  
  if (seen.has(normalized)) {
    const existingKey = seen.get(normalized);
    duplicates.push({ original: existingKey, duplicate: key, normalized });
    
    // Keep the version with diacritics (usually the longer key)
    if (key.length >= existingKey.length) {
      uniqueNames[key] = value;
      delete uniqueNames[existingKey];
    }
  } else {
    seen.set(normalized, key);
    uniqueNames[key] = value;
  }
}

console.log('Duplicates found:', duplicates.length);
duplicates.forEach(dup => {
  console.log(`- "${dup.duplicate}" duplicates "${dup.original}" (normalized: "${dup.normalized}")`);
});

console.log('Unique names count:', Object.keys(uniqueNames).length);

// Write the cleaned data back
fs.writeFileSync(COMPREHENSIVE_NAMES_PATH, JSON.stringify(uniqueNames, null, 2), 'utf8');
console.log("Fixed duplicate names in comprehensive-names-origins.json");
