# Domain Setup Guide for meniny365.sk

## 🌐 **Domain Configuration Steps**

### **Step 1: Add Domain to Vercel Project**

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Find your `meniny365` project
   - Click on the project

2. **Add Custom Domain**
   - Go to **Settings** → **Domains**
   - Click **Add Domain**
   - Enter: `meniny365.sk`
   - Click **Add**

3. **Configure DNS Records**
   - Vercel will show you DNS records to add
   - You'll need to add these to your domain registrar

### **Step 2: DNS Configuration**

Add these DNS records to your domain registrar (where you bought meniny365.sk):

#### **For Root Domain (meniny365.sk)**
```
Type: A
Name: @
Value: 76.76.19.61
TTL: 300
```

#### **For WWW Subdomain (www.meniny365.sk)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300
```

### **Step 3: SSL Certificate**
- Vercel automatically provides SSL certificates
- Your site will be available at `https://meniny365.sk`
- HTTP traffic will automatically redirect to HTTPS

### **Step 4: Verify Domain**
- Wait 24-48 hours for DNS propagation
- Check if `https://meniny365.sk` loads your site
- Verify SSL certificate is working

## 🔄 **Redirect Configuration**

I've already configured redirects in `vercel.json`:

### **Current Redirects:**
- `meniny365.sk/` → `meniny365.sk/sk/` (homepage)
- `meniny365.sk/anything` → `meniny365.sk/sk/anything` (all other pages)

### **What This Means:**
- Users can visit `meniny365.sk` and get the Slovak homepage
- All URLs work with or without `/sk/` prefix
- SEO-friendly redirects preserve search rankings

## 📊 **SEO Considerations**

### **Canonical URLs**
- All pages use `https://meniny365.sk` as canonical
- No duplicate content issues
- Proper redirects maintain SEO value

### **Sitemaps**
- Main sitemap: `https://meniny365.sk/sitemap.xml`
- All URLs use the custom domain
- Search engines will index the correct domain

## 🚀 **Deployment After Domain Setup**

Once you've added the domain to Vercel:

```bash
# Deploy the updated configuration
npx vercel --prod
```

## ✅ **Verification Checklist**

After domain setup, verify:

- [ ] `https://meniny365.sk` loads the homepage
- [ ] `https://meniny365.sk/sk/` loads the same page
- [ ] `https://meniny365.sk/sk/trendy-v-menach/` loads trending page
- [ ] SSL certificate is valid (green lock icon)
- [ ] All internal links work correctly
- [ ] Sitemaps are accessible at `/sitemap.xml`

## 🔧 **Troubleshooting**

### **If Domain Doesn't Work:**
1. Check DNS propagation: https://dnschecker.org
2. Wait 24-48 hours for full propagation
3. Clear browser cache
4. Check Vercel domain status in dashboard

### **If SSL Issues:**
1. Vercel handles SSL automatically
2. Wait up to 24 hours for certificate generation
3. Check Vercel dashboard for certificate status

## 📞 **Need Help?**

If you need assistance with any step:
1. Check Vercel's domain documentation
2. Contact your domain registrar for DNS help
3. I can help troubleshoot specific issues

**The site is ready to go live on meniny365.sk! 🚀**

