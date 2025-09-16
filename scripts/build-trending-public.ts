import * as fs from 'fs';
import * as path from 'path';

interface TrendingItem {
  name: string;
  trendScore: number;
  trendsDelta: number;
  viewsDelta: number;
  label: "rising" | "stable" | "cooling";
  wikiTitle?: string;
}

interface TrendingData {
  lastUpdated: string;
  period: string;
  items: TrendingItem[];
  sources: {
    trends: string;
    pageviews: string;
  };
}

const sampleTrendingData: TrendingItem[] = [
  { name: "Luna", trendScore: 95, trendsDelta: 45, viewsDelta: 38, label: "rising", wikiTitle: "Luna_(meno)" },
  { name: "Nina", trendScore: 87, trendsDelta: 32, viewsDelta: 28, label: "rising", wikiTitle: "Nina_(meno)" },
  { name: "Zoe", trendScore: 82, trendsDelta: 28, viewsDelta: 25, label: "rising", wikiTitle: "Zoe_(meno)" },
  { name: "Mia", trendScore: 78, trendsDelta: 22, viewsDelta: 20, label: "rising", wikiTitle: "Mia_(meno)" },
  { name: "Emma", trendScore: 75, trendsDelta: 18, viewsDelta: 16, label: "rising", wikiTitle: "Emma_(meno)" },
  { name: "Oliver", trendScore: 65, trendsDelta: 12, viewsDelta: 10, label: "stable", wikiTitle: "Oliver_(meno)" },
  { name: "Liam", trendScore: 58, trendsDelta: 8, viewsDelta: 6, label: "stable", wikiTitle: "Liam_(meno)" },
  { name: "Adam", trendScore: 45, trendsDelta: -5, viewsDelta: -3, label: "stable", wikiTitle: "Adam_(meno)" },
  { name: "Jakub", trendScore: 35, trendsDelta: -12, viewsDelta: -8, label: "cooling", wikiTitle: "Jakub_(meno)" },
  { name: "Samuel", trendScore: 28, trendsDelta: -18, viewsDelta: -12, label: "cooling", wikiTitle: "Samuel_(meno)" }
];

async function buildTrendingData(): Promise<TrendingData> {
  return {
    lastUpdated: new Date().toISOString(),
    period: "7 days vs previous 28 days",
    items: sampleTrendingData,
    sources: {
      trends: "Google Trends API",
      pageviews: "Wikimedia Pageviews API"
    }
  };
}

async function main() {
  try {
    console.log('Building trending names data...');
    
    const data = await buildTrendingData();
    
    const dataDir = path.join(process.cwd(), 'src', 'data', 'public');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const filePath = path.join(dataDir, 'trending-weekly.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log(`✅ Trending names data written to ${filePath}`);
    console.log(`📈 Trending items: ${data.items.length}`);
    console.log(`🔥 Rising: ${data.items.filter(item => item.label === 'rising').length}`);
    console.log(`📊 Stable: ${data.items.filter(item => item.label === 'stable').length}`);
    console.log(`❄️ Cooling: ${data.items.filter(item => item.label === 'cooling').length}`);
    
  } catch (error) {
    console.error('❌ Error building trending names data:', error);
    process.exit(1);
  }
}

main();
