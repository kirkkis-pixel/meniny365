# 🤖 Blog Automation System

This system automatically generates and publishes 5 new blog articles every week about Slovak names.

## 🚀 How It Works

### **Automated Schedule**
- **Runs every Monday at 9 AM UTC** (adjustable in `.github/workflows/weekly-blog-posts.yml`)
- **Generates 5 unique articles** with different categories
- **Auto-commits and deploys** to Vercel

### **Article Categories**
1. **✨ Trendy** - Latest naming trends and popular names
2. **📚 História** - Historical aspects and origins of Slovak names
3. **💡 Rady** - Practical advice for parents choosing names
4. **📊 Štatistiky** - Statistics and data analysis
5. **📅 Kalendár** - Name day calendar updates and information

## 🛠️ Manual Usage

### **Generate Articles Now**
```bash
npm run generate-blog
```

### **Test the Script**
```bash
node scripts/generate-blog-posts.js
```

## 📁 File Structure

```
scripts/
├── generate-blog-posts.js    # Main generation script
.github/
└── workflows/
    └── weekly-blog-posts.yml # GitHub Actions workflow
```

## ⚙️ Configuration

### **Schedule Adjustment**
Edit `.github/workflows/weekly-blog-posts.yml`:
```yaml
schedule:
  - cron: '0 9 * * 1'  # Monday 9 AM UTC
```

### **Article Templates**
Modify `scripts/generate-blog-posts.js` to:
- Add new topics
- Change article structure
- Update content templates
- Modify categories

## 🎯 Generated Content

Each article includes:
- **SEO-optimized titles** with keywords
- **Meta descriptions** for search engines
- **Structured content** with headings and sections
- **Interactive elements** (cards, CTAs, buttons)
- **Internal links** to main site features
- **Responsive design** for all devices

## 📊 Content Quality

### **SEO Features**
- Target keywords in titles and content
- Proper heading structure (H1, H2, H3)
- Meta descriptions and Open Graph tags
- Internal linking to site features
- Mobile-optimized content

### **User Experience**
- 3-5 minute read time
- Visual elements and icons
- Clear call-to-action buttons
- Related articles sections
- Category filtering support

## 🔧 Customization

### **Add New Categories**
1. Add to `blogTemplates` array in `generate-blog-posts.js`
2. Include icon, description, and topic list
3. Update the blog index page categories

### **Modify Content Templates**
1. Edit `generateTitle()`, `generateExcerpt()`, `generateContent()` functions
2. Add new content variations
3. Update SEO keywords and phrases

### **Change Schedule**
1. Edit cron expression in `.github/workflows/weekly-blog-posts.yml`
2. Test with `workflow_dispatch` trigger
3. Monitor GitHub Actions logs

## 📈 Monitoring

### **GitHub Actions**
- View runs in repository Actions tab
- Check logs for any errors
- Monitor deployment status

### **Vercel Deployment**
- Automatic deployment after each commit
- Check build logs in Vercel dashboard
- Monitor site performance

## 🚨 Troubleshooting

### **Common Issues**
1. **Script fails**: Check Node.js version and dependencies
2. **Articles not generated**: Verify file permissions and paths
3. **Deployment fails**: Check Vercel build logs
4. **Content issues**: Review template functions

### **Manual Override**
- Use `workflow_dispatch` to trigger manually
- Run `npm run generate-blog` locally
- Check generated files in `src/pages/sk/blog/`

## 🎉 Benefits

- **Consistent content** every week
- **SEO optimization** with fresh keywords
- **User engagement** with regular updates
- **Time savings** with automation
- **Scalable system** for future growth

---

**Note**: This system generates content based on templates and patterns. For best results, periodically review and update the templates to ensure content quality and relevance.

