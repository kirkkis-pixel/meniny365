# Deployment Guide for meniny365.sk

This guide will help you deploy the meniny365.sk website to production.

## 🚀 Quick Start

### 1. GitHub Setup
```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/meniny365.git
git branch -M main
git push -u origin main
```

### 2. Vercel Deployment
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import `meniny365` repository
5. Click "Deploy" (auto-detects Astro)

### 3. Custom Domain
1. Vercel Dashboard → Settings → Domains
2. Add `meniny365.sk`
3. Configure DNS as instructed

## 📊 Build Statistics
- **Total Pages**: 385
- **Build Time**: ~13 seconds
- **Bundle Size**: Optimized for performance
- **SEO**: Full sitemap and structured data

## 🔧 Environment Variables

Add these in Vercel dashboard → Settings → Environment Variables:

```env
# Analytics (optional)
PUBLIC_GA_ID=your-google-analytics-id

# AdSense (optional)  
PUBLIC_ADSENSE_CLIENT=your-adsense-client-id

# Site Configuration
PUBLIC_SITE_URL=https://meniny365.sk
```

## 📱 Features Ready
- ✅ Today's name days
- ✅ Calendar view
- ✅ Name pages
- ✅ Popular names
- ✅ Name suggestions
- ✅ Blog system
- ✅ iCal API
- ✅ Widget API
- ✅ SEO optimized
- ✅ Mobile responsive

## 🎯 Post-Deployment
1. Test all pages work correctly
2. Set up Google Analytics
3. Configure AdSense (if desired)
4. Import real Slovak name days data
5. Monitor performance

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Verify all dependencies installed
- Check for TypeScript errors

### Pages Not Loading
- Verify Vercel configuration
- Check environment variables
- Review build logs

### Domain Issues
- Verify DNS configuration
- Check SSL certificate
- Wait for propagation (up to 24h)

## 📞 Support
- GitHub Issues: [meniny365/issues](https://github.com/YOUR_USERNAME/meniny365/issues)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Astro Docs: [docs.astro.build](https://docs.astro.build)
