# meniny365.sk

A modern, SEO-optimized website for Slovak name days (meniny) built with Astro, TypeScript, and Tailwind CSS.

## Features

- 📅 **Today's name days** - See who has name day today
- 📆 **Calendar view** - Browse name days by month
- 👤 **Name pages** - Detailed information about each name
- 🔥 **Popular names** - Statistics and trends
- 💡 **Name suggestions** - Find perfect names with filters
- 📝 **Blog** - Articles about name days and traditions
- 📱 **Mobile-first** - Responsive design
- ⚡ **Fast performance** - Optimized for speed
- 🔍 **SEO optimized** - Structured data and meta tags
- 📊 **Analytics ready** - Google Analytics integration

## Tech Stack

- **Framework**: Astro 5.x
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Icons**: SVG icons
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel/Cloudflare ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meniny365
```

2. Install dependencies:
```bash
npm install
```

3. Import name days data:
```bash
npm run import:sk2025
```

4. Start development server:
```bash
npm run dev
```

5. Open [http://localhost:4321](http://localhost:4321) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── pages/                 # Astro pages
│   ├── sk/               # Slovak pages
│   │   ├── index.astro   # Today's name days
│   │   ├── den/          # Day pages
│   │   ├── kalendár/     # Month calendar
│   │   ├── meno/         # Name pages
│   │   ├── populárne-mená/ # Popular names
│   │   ├── návrhy-mena.astro # Name suggestions
│   │   └── blog/         # Blog posts
│   └── api/              # API endpoints
├── components/           # Reusable components
├── layouts/             # Page layouts
├── lib/                 # Utility functions
├── styles/              # CSS and design tokens
├── content/             # Content collections
└── data/                # Static data files
```

## Data Sources

The name days data is imported from publicly available Slovak sources:

- kalendar.aktuality.sk
- calendar.zoznam.sk
- namedaycalendar.com

Data is refreshed annually by running the import script.

## SEO Features

- **Structured Data**: JSON-LD markup for better search visibility
- **Meta Tags**: Optimized titles, descriptions, and Open Graph
- **Sitemaps**: Automatic sitemap generation
- **Robots.txt**: Search engine directives
- **Canonical URLs**: Prevent duplicate content
- **Internal Linking**: Dense internal link structure

## Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, CLS, and INP
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Efficient bundle splitting
- **Caching**: Optimized caching strategies

## Deployment

### Vercel

1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Cloudflare Pages

1. Connect your repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Deploy

## Environment Variables

Create a `.env` file in the root directory:

```env
# Analytics (optional)
PUBLIC_GA_ID=your-google-analytics-id

# AdSense (optional)
PUBLIC_ADSENSE_CLIENT=your-adsense-client-id
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact us at [meniny365.sk](https://meniny365.sk).

---

Built with ❤️ for the Slovak community