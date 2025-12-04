# LLM Architecture Explorer - Deployment Guide

## 🚀 Deploy to Netlify

### Option 1: Drag & Drop (Easiest)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Drag the `dist` folder** to Netlify: https://app.netlify.com/drop

3. **Done!** Get your live URL

---

### Option 2: Git Integration (Recommended)

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Choose your repository
   - Build settings are auto-detected from `netlify.toml`

3. **Deploy!**

---

## 📊 Setup Analytics

### Replace Placeholder GA ID

In `index.html`, replace `G-XXXXXXXXXX` with your actual Google Analytics 4 tracking ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ACTUAL_ID"></script>
```

**Get GA4 ID:**
1. Go to https://analytics.google.com
2. Create property → Get tracking ID
3. Copy `G-XXXXXXXXXX` format ID

---

## 🔧 Post-Deployment Checklist

### Update URLs

After deploying, update these files with your actual Netlify URL:

**1. `index.html` (meta tags):**
```html
<meta property="og:url" content="https://YOUR-SITE.netlify.app/" />
```

**2. `src/components/ShareButtons.tsx` (default URL):**
```typescript
url = 'https://YOUR-SITE.netlify.app/'
```

### Test Social Previews

- LinkedIn: https://www.linkedin.com/post-inspector/
- Twitter: https://cards-dev.twitter.com/validator
- Facebook: https://developers.facebook.com/tools/debug/

---

## 📈 Monitor Analytics

Events being tracked:
- Layer toggles
- Custom prompts
- Code/data views
- Exports & shares
- Article clicks
- Time spent

Check Google Analytics dashboard after 24 hours.

---

## ⚡ Performance Tips

- Build size is optimized with code splitting
- Heavy components (CodeViewer, DataViewer) lazy load
- Assets cached for 1 year (see `netlify.toml`)
- All scripts deferred for faster initial load

---

## 🐛 Troubleshooting

**Build fails?**
- Check Node version (need 18+)
- Run `npm install --legacy-peer-deps` first

**Analytics not working?**
- Replace placeholder GA ID
- Check browser console for errors
- May take 24h for data to appear

**Social previews broken?**
- Need actual deployed URL (not localhost)
- Redeploy after updating meta tags
- Use preview tools above to test

---

## 🎉 You're Live!

Share your deployed URL:
- On LinkedIn with article
- On Twitter
- In relevant communities
