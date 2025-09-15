import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface CardRequest {
  name: string;
  palette?: string[];
  style?: "minimal" | "ornamental";
  message?: string;
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

// Generate SVG content
function generateSVG(name: string, palette: string[], style: "minimal" | "ornamental", message?: string): string {
  const [primary, secondary, background] = palette;
  
  const svgContent = `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${background};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${secondary};stop-opacity:0.1" />
        </linearGradient>
        ${style === 'ornamental' ? `
        <pattern id="ornament" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="${primary}" opacity="0.1"/>
        </pattern>
        ` : ''}
      </defs>
      
      <!-- Background -->
      <rect width="800" height="600" fill="url(#bgGradient)"/>
      ${style === 'ornamental' ? '<rect width="800" height="600" fill="url(#ornament)"/>' : ''}
      
      <!-- Decorative elements -->
      ${style === 'ornamental' ? `
        <circle cx="100" cy="100" r="30" fill="${primary}" opacity="0.1"/>
        <circle cx="700" cy="500" r="40" fill="${secondary}" opacity="0.1"/>
        <circle cx="650" cy="100" r="25" fill="${primary}" opacity="0.15"/>
        <circle cx="150" cy="450" r="35" fill="${secondary}" opacity="0.1"/>
      ` : ''}
      
      <!-- Main content area -->
      <rect x="50" y="50" width="700" height="500" fill="none" stroke="${primary}" stroke-width="2" stroke-dasharray="5,5" opacity="0.3" rx="20"/>
      
      <!-- Title -->
      <text x="400" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="${primary}">
        ${name}
      </text>
      
      <!-- Subtitle -->
      <text x="400" y="250" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="${secondary}">
        ${message || 'Všetko najlepšie k meninám!'}
      </text>
      
      <!-- Decorative line -->
      <line x1="200" y1="300" x2="600" y2="300" stroke="${primary}" stroke-width="3" opacity="0.6"/>
      
      <!-- Date -->
      <text x="400" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="${primary}" opacity="0.8">
        ${new Date().toLocaleDateString('sk-SK', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </text>
      
      <!-- Footer -->
      <text x="400" y="550" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="${primary}" opacity="0.6">
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
    const { name, palette, style = "minimal", message } = body;
    
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
      const shareUrl = `https://meniny365.sk/sk/darceky?card=${filename}`;
      
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
    
    // Generate SVG
    const svgContent = generateSVG(name, selectedPalette, style, message);
    
    // Save file
    fs.writeFileSync(filepath, svgContent);
    
    // Generate URLs
    const imageUrl = `/ecards/${filename}`;
    const downloadUrl = `/api/ai/card/download?file=${filename}`;
    const shareUrl = `https://meniny365.sk/sk/darceky?card=${filename}`;
    
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
