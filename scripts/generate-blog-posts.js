import fs from 'fs';
import path from 'path';

// Blog post templates with different topics
const blogTemplates = [
  {
    category: 'Trendy',
    topics: [
      'najkrajsie-mena-tyzdna',
      'trendy-mena-2025',
      'moderné-menné-trendy',
      'populárne-mena-mesiac',
      'nové-menné-trendy'
    ],
    icon: '✨',
    description: 'Najnovšie trendy v pomenovávaní detí'
  },
  {
    category: 'História',
    topics: [
      'historické-menné-tradície',
      'pôvod-slovenských-mien',
      'stredoveké-menné-tradície',
      'národné-obrodenie-menné',
      'tradičné-menné-korene'
    ],
    icon: '📚',
    description: 'Fascinujúca história slovenských mien'
  },
  {
    category: 'Rady',
    topics: [
      'ako-vybrať-meno',
      'menné-rady-rodičom',
      'pomenovávacie-tipy',
      'menné-rozhodnutia',
      'praktické-menné-rady'
    ],
    icon: '💡',
    description: 'Praktické rady na výber mena'
  },
  {
    category: 'Štatistiky',
    topics: [
      'menné-štatistiky-2025',
      'populárne-mena-slovensko',
      'menné-trendy-analýza',
      'regionálne-menné-rozdiely',
      'menné-štatistiky-mesiac'
    ],
    icon: '📊',
    description: 'Štatistiky a analýzy mien'
  },
  {
    category: 'Kalendár',
    topics: [
      'meniny-týždeň',
      'menné-sviatky',
      'kalendár-menín',
      'menné-dátumy',
      'meniny-aktualizácia'
    ],
    icon: '📅',
    description: 'Aktualizácie kalendára menín'
  }
];

// Generate a random blog post
function generateBlogPost(template, topic, weekNumber) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('sk-SK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  const title = generateTitle(topic, template.category);
  const excerpt = generateExcerpt(topic, template.category);
  const content = generateContent(topic, template.category, weekNumber);
  
  return {
    slug: topic,
    title,
    excerpt,
    date: formattedDate,
    readTime: '4 min',
    category: template.category,
    content
  };
}

function generateTitle(topic, category) {
  const titles = {
    'Trendy': [
      `Najkrajšie mená týždňa: ${getCurrentWeek()} týždeň 2025`,
      `Menné trendy ${getCurrentMonth()}: Čo je v móde`,
      `Nové menné inšpirácie pre ${getCurrentMonth()}`,
      `Trendy mená ${getCurrentYear()}: Najpopulárnejšie voľby`,
      `Menné trendy: Čo si rodičia vyberajú`
    ],
    'História': [
      `Pôvod slovenských mien: ${getRandomHistoricalPeriod()}`,
      `Historické menné tradície: ${getRandomHistoricalPeriod()}`,
      `Stredoveké mená a ich význam`,
      `Národné obrodenie a menné tradície`,
      `Tradičné slovenské menné korene`
    ],
    'Rady': [
      `Ako vybrať meno pre dieťa: ${getCurrentMonth()} rady`,
      `Menné rozhodnutia: Praktické tipy`,
      `Pomenovávacie rady pre rodičov`,
      `Výber mena: Čo zvážiť`,
      `Menné rady: Ako sa rozhodnúť`
    ],
    'Štatistiky': [
      `Menné štatistiky ${getCurrentMonth()}: Najnovšie údaje`,
      `Populárne mená na Slovensku: ${getCurrentYear()}`,
      `Menné trendy analýza: ${getCurrentMonth()}`,
      `Regionálne menné rozdiely`,
      `Štatistiky mien: ${getCurrentYear()} prehľad`
    ],
    'Kalendár': [
      `Meniny tento týždeň: ${getCurrentWeek()} týždeň`,
      `Menné sviatky: ${getCurrentMonth()} prehľad`,
      `Kalendár menín: Aktualizácie`,
      `Menné dátumy: ${getCurrentMonth()}`,
      `Meniny: Čo nás čaká tento mesiac`
    ]
  };
  
  const categoryTitles = titles[category] || titles['Trendy'];
  return categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
}

function generateExcerpt(topic, category) {
  const excerpts = {
    'Trendy': [
      'Objavte najnovšie trendy v pomenovávaní detí na Slovensku. Ktoré mená sú momentálne najpopulárnejšie?',
      'Pozrite si najkrajšie mená, ktoré si rodičia vyberajú pre svoje deti v tomto období.',
      'Moderné menné trendy, ktoré kombinujú tradíciu s novými vplyvmi.',
      'Najnovšie inšpirácie pre rodičov, ktorí hľadajú perfektné meno pre svoje dieťa.',
      'Trendy mená, ktoré budú v móde v nasledujúcich mesiacoch.'
    ],
    'História': [
      'Pozrite sa do fascinujúcej histórie slovenských mien a ich pôvodu.',
      'Objavte tradície a zvyky, ktoré formovali menné zvyklosti na Slovensku.',
      'Historické menné tradície, ktoré sa zachovali dodnes.',
      'Pôvod a význam slovenských mien v rôznych historických obdobiach.',
      'Tradičné menné korene a ich vplyv na súčasné pomenovávanie.'
    ],
    'Rady': [
      'Praktické rady a tipy na výber perfektného mena pre vaše dieťa.',
      'Ako sa rozhodnúť medzi rôznymi možnosťami mien?',
      'Pomenovávacie rady, ktoré vám pomôžu s rozhodovaním.',
      'Čo zvážiť pri výbere mena pre dieťa?',
      'Praktické tipy pre rodičov, ktorí si vyberajú meno.'
    ],
    'Štatistiky': [
      'Najnovšie štatistiky a analýzy mien na Slovensku.',
      'Ktoré mená sú najpopulárnejšie v tomto období?',
      'Menné trendy a ich analýza na základe údajov.',
      'Regionálne rozdiely v pomenovávaní detí.',
      'Štatistické prehľady menných trendov.'
    ],
    'Kalendár': [
      'Aktualizácie kalendára menín a najnovšie zmeny.',
      'Prehľad menín na tento týždeň a mesiac.',
      'Menné sviatky a dátumy, ktoré by ste nemali zmeškať.',
      'Kalendár menín: Najnovšie informácie a aktualizácie.',
      'Menné dátumy a sviatky v aktuálnom období.'
    ]
  };
  
  const categoryExcerpts = excerpts[category] || excerpts['Trendy'];
  return categoryExcerpts[Math.floor(Math.random() * categoryExcerpts.length)];
}

function generateContent(topic, category, weekNumber) {
  return `---
import Layout from '../../../layouts/Layout.astro';
import Card from '../../../components/Card.astro';

const sampleData = [
  { name: 'Emma', meaning: 'Univerzálna', trend: 'Stúpa' },
  { name: 'Lukáš', meaning: 'Svetlo', trend: 'Stabilný' },
  { name: 'Sofia', meaning: 'Múdrosť', trend: 'Stúpa' }
];
---

<Layout 
  title="${generateTitle(topic, category)} | Meniny365.sk" 
  description="${generateExcerpt(topic, category)}"
>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
    <!-- Article Header -->
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-4 py-12">
        <div class="text-center">
          <div class="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full mb-4">
            <span class="mr-2">${getCategoryIcon(category)}</span>
            ${category}
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            ${generateTitle(topic, category)}
          </h1>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            ${generateExcerpt(topic, category)}
          </p>
          <div class="flex items-center justify-center gap-4 text-sm text-slate-500">
            <span>${new Date().toLocaleDateString('sk-SK')}</span>
            <span>•</span>
            <span>4 min čítania</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-12">
      <article class="prose prose-lg max-w-none">
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">Týždeň ${weekNumber} - ${getCurrentMonth()}</h2>
          <p class="text-slate-700 leading-relaxed">
            Tento týždeň sa zameriavame na ${category.toLowerCase()} aspekty slovenských mien. 
            Objavte najnovšie trendy, štatistiky a rady, ktoré vám pomôžu lepšie pochopiť 
            svet slovenských mien a ich pôvod.
          </p>
        </div>

        <h2 class="text-3xl font-bold text-slate-900 mb-6">Kľúčové pozorovania</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {sampleData.map((item, index) => (
            <Card class="p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-xl font-bold text-slate-900">{item.name}</h3>
                <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {item.trend}
                </span>
              </div>
              <p class="text-slate-600 text-sm">{item.meaning}</p>
            </Card>
          ))}
        </div>

        <h2 class="text-3xl font-bold text-slate-900 mb-6">Praktické rady</h2>
        
        <div class="space-y-6 mb-8">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
              1
            </div>
            <div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Zvážte význam mena</h3>
              <p class="text-slate-600">
                Každé meno má svoj jedinečný význam a históriu. Vyberte meno, ktorého význam 
                rezonuje s vašimi hodnotami a očakávaniami.
              </p>
            </div>
          </div>
          
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
              2
            </div>
            <div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Testujte výslovnosť</h3>
              <p class="text-slate-600">
                Meno by malo byť ľahko vysloviteľné v slovenčine aj v iných jazykoch. 
                Vyhnite sa menám, ktoré môžu spôsobiť problémy.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white mb-8">
          <h2 class="text-2xl font-bold mb-4">Potrebujete viac inšpirácie?</h2>
          <p class="text-indigo-100 leading-relaxed mb-6">
            Objavte naše rozsiahle databázy slovenských mien s informáciami o ich pôvode, 
            význame a histórii. Vyhľadávajte podľa kategórií, trendov alebo významu.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a 
              href="/sk/povod-a-vyznam-mien"
              class="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Vyhľadať mená
            </a>
            <a 
              href="/sk/trendy-v-menach"
              class="inline-flex items-center px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-400 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              Trendy mená
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</Layout>`;
}

// Helper functions
function getCurrentWeek() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}

function getCurrentMonth() {
  return new Date().toLocaleDateString('sk-SK', { month: 'long' });
}

function getCurrentYear() {
  return new Date().getFullYear();
}

function getRandomHistoricalPeriod() {
  const periods = ['Stredovek', 'Renesancia', 'Barok', 'Klasicizmus', 'Romantizmus'];
  return periods[Math.floor(Math.random() * periods.length)];
}

function getCategoryIcon(category) {
  const icons = {
    'Trendy': '✨',
    'História': '📚',
    'Rady': '💡',
    'Štatistiky': '📊',
    'Kalendár': '📅',
    'Kultúra': '🏛️'
  };
  return icons[category] || '✨';
}

// Main execution
function main() {
  const currentWeek = getCurrentWeek();
  const blogDir = 'src/pages/sk/blog';
  
  // Ensure blog directory exists
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  
  // Generate 5 blog posts
  for (let i = 0; i < 5; i++) {
    const template = blogTemplates[i % blogTemplates.length];
    const topic = template.topics[Math.floor(Math.random() * template.topics.length)];
    
    // Add timestamp to make slug unique
    const timestamp = Date.now();
    const uniqueSlug = `${topic}-${timestamp}`;
    
    const blogPost = generateBlogPost(template, uniqueSlug, currentWeek);
    
    // Write the blog post file
    const filePath = path.join(blogDir, `${uniqueSlug}.astro`);
    fs.writeFileSync(filePath, blogPost.content);
    
    console.log(`✅ Generated blog post: ${blogPost.title}`);
  }
  
  console.log(`🎉 Successfully generated 5 blog posts for week ${currentWeek}!`);
}

// Run the script
main();

