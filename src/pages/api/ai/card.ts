import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface CardRequest {
  name: string;
  palette?: string[];
  style?: "minimal" | "ornamental";
  message?: string;
  typography?: string;
  background?: string;
  pattern?: string;
  orientation?: "landscape" | "portrait";
}

interface CardResponse {
  imageUrl: string;
  downloadUrl: string;
  shareUrl: string;
  generatedAt: string;
}

// Ensure public/ecards directory exists
const ECARDS_DIR = path.join(process.cwd(), 'public', 'ecards');
if (!fs.existsSync(ECARDS_DIR)) {
  fs.mkdirSync(ECARDS_DIR, { recursive: true });
}

// Default color palettes
const PALETTES = {
  classic: ['#1e293b', '#3b82f6', '#ffffff'],
  romantic: ['#be185d', '#f472b6', '#fef3c7'],
  elegant: ['#374151', '#8b5cf6', '#f3f4f6'],
  festive: ['#dc2626', '#f59e0b', '#fef3c7'],
  modern: ['#0f172a', '#06b6d4', '#f1f5f9']
};

// Generate SVG content with enhanced styling
function generateSVG(name: string, palette: string[], style: "minimal" | "ornamental", message?: string, typography?: string, background?: string, pattern?: string, orientation?: string): string {
  const [primary, secondary, backgroundColor] = palette;
  
  // Get font family based on typography
  const fontFamily = getFontFamily(typography);
  
  // Generate background pattern
  const backgroundPattern = generateBackgroundPattern(pattern, primary, secondary);
  
  // Set dimensions based on orientation
  const isPortrait = orientation === 'portrait';
  const width = isPortrait ? 600 : 800;
  const height = isPortrait ? 800 : 600;
  
  const svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${background || backgroundColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${secondary};stop-opacity:0.1" />
        </linearGradient>
        ${backgroundPattern}
        ${style === 'ornamental' ? `
        <pattern id="ornament" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="${primary}" opacity="0.1"/>
        </pattern>
        ` : ''}
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
      ${style === 'ornamental' ? `<rect width="${width}" height="${height}" fill="url(#ornament)"/>` : ''}
      
      <!-- Decorative elements -->
      ${style === 'ornamental' ? `
        <circle cx="${isPortrait ? 80 : 100}" cy="${isPortrait ? 120 : 100}" r="${isPortrait ? 25 : 30}" fill="${primary}" opacity="0.1"/>
        <circle cx="${isPortrait ? 520 : 700}" cy="${isPortrait ? 680 : 500}" r="${isPortrait ? 35 : 40}" fill="${secondary}" opacity="0.1"/>
        <circle cx="${isPortrait ? 480 : 650}" cy="${isPortrait ? 120 : 100}" r="${isPortrait ? 20 : 25}" fill="${primary}" opacity="0.15"/>
        <circle cx="${isPortrait ? 120 : 150}" cy="${isPortrait ? 680 : 450}" r="${isPortrait ? 30 : 35}" fill="${secondary}" opacity="0.1"/>
      ` : ''}
      
      <!-- Main content area with enhanced styling -->
      <rect x="${isPortrait ? 40 : 50}" y="${isPortrait ? 60 : 50}" width="${isPortrait ? 520 : 700}" height="${isPortrait ? 680 : 500}" fill="none" stroke="${primary}" stroke-width="2" stroke-dasharray="5,5" opacity="0.3" rx="20"/>
      
      <!-- Enhanced decorative elements for poster look -->
      ${style === 'ornamental' ? `
        <!-- Corner flourishes -->
        <path d="M ${isPortrait ? 40 : 50} ${isPortrait ? 60 : 50} L ${isPortrait ? 80 : 100} ${isPortrait ? 60 : 50} L ${isPortrait ? 40 : 50} ${isPortrait ? 100 : 80} Z" fill="${primary}" opacity="0.2"/>
        <path d="M ${isPortrait ? 560 : 750} ${isPortrait ? 60 : 50} L ${isPortrait ? 520 : 720} ${isPortrait ? 60 : 50} L ${isPortrait ? 560 : 750} ${isPortrait ? 100 : 80} Z" fill="${primary}" opacity="0.2"/>
        <path d="M ${isPortrait ? 40 : 50} ${isPortrait ? 740 : 550} L ${isPortrait ? 80 : 100} ${isPortrait ? 740 : 580} L ${isPortrait ? 40 : 50} ${isPortrait ? 740 : 580} Z" fill="${primary}" opacity="0.2"/>
        <path d="M ${isPortrait ? 560 : 750} ${isPortrait ? 740 : 550} L ${isPortrait ? 520 : 720} ${isPortrait ? 740 : 580} L ${isPortrait ? 560 : 750} ${isPortrait ? 740 : 580} Z" fill="${primary}" opacity="0.2"/>
      ` : ''}
      
      <!-- Title with enhanced artistic styling -->
      <text x="${width/2}" y="${isPortrait ? 280 : 200}" text-anchor="middle" font-family="${fontFamily}" font-size="${isPortrait ? 64 : 56}" font-weight="bold" fill="${primary}" stroke="${backgroundColor}" stroke-width="2" opacity="0.95">
        ${name}
      </text>
      
      <!-- Decorative elements around title -->
      ${style === 'ornamental' ? `
        <circle cx="${width/2 - 60}" cy="${isPortrait ? 280 : 200}" r="3" fill="${secondary}" opacity="0.4"/>
        <circle cx="${width/2 + 60}" cy="${isPortrait ? 280 : 200}" r="3" fill="${secondary}" opacity="0.4"/>
        <path d="M ${width/2 - 40} ${isPortrait ? 280 : 200} Q ${width/2} ${isPortrait ? 270 : 190} ${width/2 + 40} ${isPortrait ? 280 : 200}" stroke="${secondary}" stroke-width="1" fill="none" opacity="0.3"/>
      ` : ''}
      
      <!-- Subtitle with enhanced styling -->
      <text x="${width/2}" y="${isPortrait ? 350 : 260}" text-anchor="middle" font-family="${fontFamily}" font-size="${isPortrait ? 32 : 28}" fill="${secondary}" stroke="${backgroundColor}" stroke-width="1" opacity="0.9">
        ${message || 'Všetko najlepšie k meninám!'}
      </text>
      
      <!-- Enhanced decorative line -->
      <line x1="${isPortrait ? 120 : 200}" y1="${isPortrait ? 380 : 300}" x2="${isPortrait ? 480 : 600}" y2="${isPortrait ? 380 : 300}" stroke="${primary}" stroke-width="3" opacity="0.6"/>
      
      <!-- Date with enhanced styling -->
      <text x="${width/2}" y="${isPortrait ? 420 : 350}" text-anchor="middle" font-family="${fontFamily}" font-size="${isPortrait ? 20 : 18}" fill="${primary}" opacity="0.8">
        ${new Date().toLocaleDateString('sk-SK', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </text>
      
      <!-- Enhanced artistic elements -->
      ${style === 'ornamental' ? `
        <!-- Floral elements -->
        <path d="M ${width/2 - 30} ${isPortrait ? 450 : 400} C ${width/2 - 25} ${isPortrait ? 445 : 395} ${width/2 - 20} ${isPortrait ? 445 : 395} ${width/2 - 15} ${isPortrait ? 450 : 400} C ${width/2 - 10} ${isPortrait ? 455 : 405} ${width/2 - 5} ${isPortrait ? 455 : 405} ${width/2} ${isPortrait ? 450 : 400}" stroke="${primary}" stroke-width="2" fill="none" opacity="0.4"/>
        <path d="M ${width/2 + 30} ${isPortrait ? 450 : 400} C ${width/2 + 25} ${isPortrait ? 445 : 395} ${width/2 + 20} ${isPortrait ? 445 : 395} ${width/2 + 15} ${isPortrait ? 450 : 400} C ${width/2 + 10} ${isPortrait ? 455 : 405} ${width/2 + 5} ${isPortrait ? 455 : 405} ${width/2} ${isPortrait ? 450 : 400}" stroke="${secondary}" stroke-width="2" fill="none" opacity="0.4"/>
        
        <!-- Sparkles and stars -->
        <path d="M ${width/2 - 50} ${isPortrait ? 420 : 370} L ${width/2 - 45} ${isPortrait ? 425 : 375} L ${width/2 - 40} ${isPortrait ? 420 : 370} L ${width/2 - 45} ${isPortrait ? 415 : 365} Z" fill="${secondary}" opacity="0.5"/>
        <path d="M ${width/2 + 50} ${isPortrait ? 420 : 370} L ${width/2 + 45} ${isPortrait ? 425 : 375} L ${width/2 + 40} ${isPortrait ? 420 : 370} L ${width/2 + 45} ${isPortrait ? 415 : 365} Z" fill="${primary}" opacity="0.5"/>
        
        <!-- Butterfly or decorative element -->
        <path d="M ${width/2} ${isPortrait ? 480 : 430} C ${width/2 - 10} ${isPortrait ? 475 : 425} ${width/2 - 15} ${isPortrait ? 480 : 430} ${width/2 - 10} ${isPortrait ? 485 : 435} C ${width/2 - 5} ${isPortrait ? 490 : 440} ${width/2} ${isPortrait ? 485 : 435} ${width/2 + 5} ${isPortrait ? 490 : 440} C ${width/2 + 10} ${isPortrait ? 485 : 435} ${width/2 + 15} ${isPortrait ? 480 : 430} ${width/2 + 10} ${isPortrait ? 475 : 425} C ${width/2} ${isPortrait ? 480 : 430} ${width/2} ${isPortrait ? 480 : 430} ${width/2} ${isPortrait ? 480 : 430}" fill="${primary}" opacity="0.3"/>
      ` : ''}
      
      <!-- Watercolor splashes for artistic style -->
      ${pattern === 'watercolor' ? `
        <circle cx="${isPortrait ? 100 : 150}" cy="${isPortrait ? 150 : 100}" r="${isPortrait ? 40 : 50}" fill="${primary}" opacity="0.1"/>
        <circle cx="${isPortrait ? 500 : 650}" cy="${isPortrait ? 200 : 150}" r="${isPortrait ? 30 : 40}" fill="${secondary}" opacity="0.08"/>
        <circle cx="${isPortrait ? 80 : 100}" cy="${isPortrait ? 600 : 450}" r="${isPortrait ? 35 : 45}" fill="${primary}" opacity="0.06"/>
        <circle cx="${isPortrait ? 520 : 700}" cy="${isPortrait ? 650 : 500}" r="${isPortrait ? 25 : 35}" fill="${secondary}" opacity="0.07"/>
      ` : ''}
      
      <!-- Footer with enhanced styling -->
      <text x="${width/2}" y="${isPortrait ? 720 : 550}" text-anchor="middle" font-family="${fontFamily}" font-size="14" fill="${primary}" opacity="0.6">
        Vytvorené na meniny365.sk
      </text>
      
      ${style === 'ornamental' ? `
        <!-- Corner decorations -->
        <path d="M 50 50 L 80 50 L 50 80 Z" fill="${primary}" opacity="0.2"/>
        <path d="M 750 50 L 720 50 L 750 80 Z" fill="${primary}" opacity="0.2"/>
        <path d="M 50 550 L 80 580 L 50 580 Z" fill="${primary}" opacity="0.2"/>
        <path d="M 750 550 L 720 580 L 750 580 Z" fill="${primary}" opacity="0.2"/>
      ` : ''}
    </svg>
  `;
  
  return svgContent;
}

// Get font family based on typography option
function getFontFamily(typography?: string): string {
  switch(typography) {
    case 'elegant': return 'Playfair Display, serif';
    case 'friendly': return 'Poppins, sans-serif';
    case 'bold': return 'Montserrat, sans-serif';
    default: return 'Inter, sans-serif';
  }
}

// Generate enhanced background patterns
function generateBackgroundPattern(pattern?: string, primary?: string, secondary?: string): string {
  if (!pattern || pattern === 'none') return '';
  
  switch(pattern) {
    case 'watercolor':
      return `
        <pattern id="watercolor" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="15" fill="${primary}" opacity="0.08"/>
          <circle cx="80" cy="30" r="20" fill="${secondary}" opacity="0.06"/>
          <circle cx="60" cy="70" r="12" fill="${primary}" opacity="0.05"/>
          <circle cx="30" cy="80" r="18" fill="${secondary}" opacity="0.07"/>
          <circle cx="70" cy="60" r="10" fill="${primary}" opacity="0.04"/>
        </pattern>
      `;
    case 'golden':
      return `
        <pattern id="golden" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="2" fill="${secondary}" opacity="0.3"/>
          <circle cx="10" cy="10" r="1" fill="${secondary}" opacity="0.2"/>
          <circle cx="50" cy="50" r="1.5" fill="${secondary}" opacity="0.25"/>
          <circle cx="20" cy="40" r="1" fill="${secondary}" opacity="0.15"/>
          <circle cx="40" cy="20" r="1" fill="${secondary}" opacity="0.2"/>
        </pattern>
      `;
    case 'floral':
      return `
        <pattern id="floral" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40,10 C45,15 50,20 45,25 C40,30 35,25 30,20 C35,15 40,10 Z" fill="${primary}" opacity="0.1"/>
          <path d="M60,40 C65,45 70,50 65,55 C60,60 55,55 50,50 C55,45 60,40 Z" fill="${secondary}" opacity="0.08"/>
          <path d="M20,60 C25,65 30,70 25,75 C20,80 15,75 10,70 C15,65 20,60 Z" fill="${primary}" opacity="0.06"/>
          <path d="M70,20 C72,22 74,24 72,26 C70,28 68,26 66,24 C68,22 70,20 Z" fill="${secondary}" opacity="0.05"/>
        </pattern>
      `;
    case 'stars':
      return `
        <pattern id="stars" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40,5 L42,15 L52,15 L44,22 L47,32 L40,27 L33,32 L36,22 L28,15 L38,15 Z" fill="${secondary}" opacity="0.4"/>
          <path d="M10,20 L11,25 L16,25 L12,28 L13,33 L10,30 L7,33 L8,28 L4,25 L9,25 Z" fill="${primary}" opacity="0.3"/>
          <path d="M70,40 L71,45 L76,45 L72,48 L73,53 L70,50 L67,53 L68,48 L64,45 L69,45 Z" fill="${secondary}" opacity="0.25"/>
          <path d="M20,60 L21,65 L26,65 L22,68 L23,73 L20,70 L17,73 L18,68 L14,65 L19,65 Z" fill="${primary}" opacity="0.2"/>
          <circle cx="60" cy="20" r="1" fill="${secondary}" opacity="0.6"/>
          <circle cx="15" cy="45" r="1" fill="${primary}" opacity="0.5"/>
          <circle cx="75" cy="70" r="1" fill="${secondary}" opacity="0.4"/>
        </pattern>
      `;
    case 'waves':
      return `
        <pattern id="waves" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
          <path d="M0,20 Q25,10 50,20 T100,20" stroke="${primary}" stroke-width="2" fill="none" opacity="0.1"/>
          <path d="M0,30 Q25,20 50,30 T100,30" stroke="${secondary}" stroke-width="1.5" fill="none" opacity="0.08"/>
          <path d="M0,10 Q25,0 50,10 T100,10" stroke="${primary}" stroke-width="1" fill="none" opacity="0.06"/>
          <path d="M0,35 Q25,25 50,35 T100,35" stroke="${secondary}" stroke-width="1" fill="none" opacity="0.04"/>
        </pattern>
      `;
    case 'pastel':
      return `
        <pattern id="pastel" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="8" fill="${primary}" opacity="0.05"/>
          <circle cx="10" cy="10" r="4" fill="${secondary}" opacity="0.04"/>
          <circle cx="40" cy="40" r="6" fill="${primary}" opacity="0.03"/>
          <circle cx="15" cy="35" r="3" fill="${secondary}" opacity="0.02"/>
          <circle cx="35" cy="15" r="2" fill="${primary}" opacity="0.03"/>
        </pattern>
      `;
    case 'sunshine':
      return `
        <pattern id="sunshine" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="3" fill="${secondary}" opacity="0.2"/>
          <path d="M30,10 L30,15 M30,45 L30,50 M10,30 L15,30 M45,30 L50,30 M18,18 L21,21 M39,39 L42,42 M18,42 L21,39 M39,18 L42,21" stroke="${secondary}" stroke-width="1" opacity="0.15"/>
          <path d="M20,20 L22,22 M38,38 L40,40 M20,40 L22,38 M38,20 L40,22" stroke="${primary}" stroke-width="0.5" opacity="0.1"/>
        </pattern>
      `;
    case 'forest':
      return `
        <pattern id="forest" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30,5 L32,15 L42,15 L34,22 L37,32 L30,27 L23,32 L26,22 L18,15 L28,15 Z" fill="${primary}" opacity="0.15"/>
          <path d="M10,25 L12,30 L17,30 L13,33 L15,38 L10,35 L5,38 L7,33 L3,30 L8,30 Z" fill="${secondary}" opacity="0.12"/>
          <path d="M50,35 L52,40 L57,40 L53,43 L55,48 L50,45 L45,48 L47,43 L43,40 L48,40 Z" fill="${primary}" opacity="0.1"/>
          <circle cx="15" cy="45" r="2" fill="${secondary}" opacity="0.08"/>
          <circle cx="45" cy="20" r="1.5" fill="${primary}" opacity="0.06"/>
          <circle cx="25" cy="50" r="1" fill="${secondary}" opacity="0.05"/>
        </pattern>
      `;
    default:
      return '';
  }
}

// Convert SVG to PNG using a simple approach (in production, use resvg-js or sharp)
function svgToPng(svgContent: string): Buffer {
  // For MVP, we'll save the SVG and return it as "PNG"
  // In production, you would use resvg-js or sharp to convert SVG to PNG
  return Buffer.from(svgContent, 'utf8');
}

// Generate unique filename
function generateFilename(name: string, palette: string[], style: string, message?: string): string {
  const hash = crypto.createHash('md5')
    .update(`${name}-${palette.join(',')}-${style}-${message || ''}`)
    .digest('hex')
    .substring(0, 8);
  
  const slug = name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();
  
  return `${slug}-${hash}.svg`; // Using SVG for MVP, change to .png in production
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: CardRequest = await request.json();
    const { name, palette, style = "minimal", message, typography, background, pattern, orientation = "landscape" } = body;
    
    // Validate required fields
    if (!name || name.trim().length === 0) {
      return new Response(JSON.stringify({ 
        error: 'Name is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Use provided palette or default
    const selectedPalette = palette && palette.length >= 3 
      ? palette.slice(0, 3)
      : PALETTES.classic;
    
    // Generate filename
    const filename = generateFilename(name, selectedPalette, style, message);
    const filepath = path.join(ECARDS_DIR, filename);
    
    // Check if file already exists
    if (fs.existsSync(filepath)) {
      const imageUrl = `/ecards/${filename}`;
      const downloadUrl = `/api/ai/card/download?file=${filename}`;
      const shareUrl = `https://meniny365.sk/sk/pohladnice?card=${filename}`;
      
      return new Response(JSON.stringify({
        imageUrl,
        downloadUrl,
        shareUrl,
        generatedAt: fs.statSync(filepath).mtime.toISOString()
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate SVG with enhanced styling
    const svgContent = generateSVG(name, selectedPalette, style, message, typography, background, pattern, orientation);
    
    // Save file
    fs.writeFileSync(filepath, svgContent);
    
    // Generate URLs
    const imageUrl = `/ecards/${filename}`;
    const downloadUrl = `/api/ai/card/download?file=${filename}`;
    const shareUrl = `https://meniny365.sk/sk/pohladnice?card=${filename}`;
    
    const response: CardResponse = {
      imageUrl,
      downloadUrl,
      shareUrl,
      generatedAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error generating e-card:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Download endpoint
export const GET: APIRoute = async ({ url }) => {
  const file = url.searchParams.get('file');
  
  if (!file) {
    return new Response('File parameter required', { status: 400 });
  }
  
  const filepath = path.join(ECARDS_DIR, file);
  
  if (!fs.existsSync(filepath)) {
    return new Response('File not found', { status: 404 });
  }
  
  const content = fs.readFileSync(filepath);
  
  return new Response(content, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Content-Disposition': `attachment; filename="${file}"`
    }
  });
};

// Handle preflight requests
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
};
