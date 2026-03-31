# Vercel Deployment Guide

## Step 1: Connect to Vercel

### Method A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project directory
cd "c:\Users\deepi\OneDrive\Desktop\clg work\projectTT\smart-inventory-frontend"
vercel

# Follow the prompts to connect your GitHub account
```

### Method B: Using Vercel Dashboard (Web)
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Import Project"
4. Select repository: `Deepika-bethi/smart-inventory-frontend`
5. Click "Import"

---

## Step 2: Configure Environment Variables

After connecting to Vercel:

1. Go to **Settings → Environment Variables**
2. Add this environment variable:
   - **Name:** `VITE_API_URL`
   - **Value:** Your backend URL (see options below)
   - **Environments:** Select all (Production, Preview, Development)

### Backend URL Options:

**Option A: Local Spring Boot (Development)**
```
VITE_API_URL=http://localhost:8080
```

**Option B: Deployed Backend (Production)**
Replace with your actual backend URL:
- Heroku: `https://your-app.herokuapp.com`
- Railway: `https://your-app.up.railway.app`
- Azure: `https://your-app.azurewebsites.net`
- Custom domain: `https://api.yourdomain.com`

---

## Step 3: Deploy

### Using Vercel CLI:
```bash
vercel --prod
```

### Automatic Deployment:
- Vercel automatically deploys when you push to `main` branch
- Every commit triggers a new deployment

### Manual Deployment via Dashboard:
1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click "Redeploy" on any previous deployment

---

## Step 4: Test the Deployment

After deployment completes:

1. Open your Vercel project URL (e.g., `https://smart-inventory-frontend.vercel.app`)
2. Try the following:
   - Navigate to Shopkeeper Dashboard → Add an item
   - Check if it saves to backend
   - Navigate to Customer Shop → Products should load
   - Go back to Shopkeeper → Items should still be there

---

## Troubleshooting

### Error: API connection refused
**Solution:** Make sure `VITE_API_URL` environment variable is set correctly in Vercel Dashboard

### Error: CORS issues
**Solution:** Your backend Spring Boot app must allow CORS for the Vercel domain. Add to backend:
```java
@CrossOrigin(origins = "https://your-vercel-app.vercel.app")
```

### Build failing
**Solution:** 
1. Check build logs in Vercel Dashboard
2. Run locally: `npm run build`
3. Fix any build errors
4. Push to GitHub again

---

## Production Checklist

- [ ] Backend API is deployed and running
- [ ] `VITE_API_URL` environment variable is set in Vercel
- [ ] CORS is enabled on backend for Vercel domain
- [ ] All features tested in production
- [ ] Error handling is working

---

## Quick Commands

```bash
# Build locally to test
npm run build

# Preview build locally
npm run preview

# Deploy updates
git push origin main  # Automatic deployment

# Deploy manually via CLI
vercel --prod
```

---

## Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Repository:** https://github.com/Deepika-bethi/smart-inventory-frontend
- **Documentation:** https://vercel.com/docs
