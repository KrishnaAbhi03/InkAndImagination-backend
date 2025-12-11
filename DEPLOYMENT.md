# 🚀 Deployment Guide - InkAndImagination Backend

Complete step-by-step deployment instructions for multiple platforms.

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas database created
- [ ] Gmail App Password generated
- [ ] All environment variables documented
- [ ] Code tested locally
- [ ] `.env` file NOT committed to Git
- [ ] Dependencies up to date

---

## 🎯 Render.com Deployment (Recommended - Free Tier)

### Why Render?
- ✅ Free tier available
- ✅ Auto-deploy from GitHub
- ✅ Easy environment variable management
- ✅ Built-in SSL certificates
- ✅ Good performance

### Step-by-Step Instructions

#### 1. Create Render Account
- Go to https://render.com
- Sign up with GitHub account

#### 2. Create New Web Service
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Select `InkAndImagination-backend`

#### 3. Configure Service

**Basic Settings:**
- **Name:** `inkandimagination-api`
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** Leave empty
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Plan:**
- Select **Free** tier

#### 4. Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add each variable:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inkandimagination
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=InkAndImagination <noreply@inkandimagination.com>
ADMIN_EMAIL=neil@inkandimagination.com
FRONTEND_URL=https://krishnaabhi03.github.io
```

#### 5. Deploy
- Click "Create Web Service"
- Wait for deployment (3-5 minutes)
- Your API will be live at: `https://inkandimagination-api.onrender.com`

#### 6. Test Deployment

```bash
curl https://inkandimagination-api.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "InkAndImagination API is running",
  "timestamp": "2024-..."
}
```

#### 7. Update Frontend

Update your frontend to use the new API URL:
```javascript
const API_URL = 'https://inkandimagination-api.onrender.com/api';
```

### Render.com Tips

**Auto-Deploy:**
- Render automatically deploys on every push to `main` branch

**View Logs:**
- Dashboard → Your Service → Logs

**Custom Domain:**
- Dashboard → Settings → Custom Domain
- Add your domain (e.g., `api.inkandimagination.com`)

**Free Tier Limitations:**
- Spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- Upgrade to paid tier ($7/month) for always-on

---

## 🚂 Railway.app Deployment

### Why Railway?
- ✅ $5 free credit monthly
- ✅ Simple deployment
- ✅ Good developer experience
- ✅ Fast builds

### Step-by-Step Instructions

#### 1. Create Railway Account
- Go to https://railway.app
- Sign up with GitHub

#### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose `InkAndImagination-backend`

#### 3. Add Environment Variables
- Click on your service
- Go to "Variables" tab
- Click "Raw Editor"
- Paste all variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=...
EMAIL_PASSWORD=...
EMAIL_FROM=...
ADMIN_EMAIL=...
FRONTEND_URL=https://krishnaabhi03.github.io
```

#### 4. Deploy
- Railway automatically deploys
- Get your URL from "Settings" → "Domains"
- Generate domain: `your-app.up.railway.app`

#### 5. Test
```bash
curl https://your-app.up.railway.app/api/health
```

---

## 🌊 DigitalOcean App Platform

### Why DigitalOcean?
- ✅ Reliable infrastructure
- ✅ $200 free credit for new users
- ✅ Scalable
- ✅ Good documentation

### Step-by-Step Instructions

#### 1. Create DigitalOcean Account
- Go to https://www.digitalocean.com
- Sign up (get $200 credit)

#### 2. Create App
- Click "Apps" → "Create App"
- Choose "GitHub" as source
- Authorize DigitalOcean
- Select repository

#### 3. Configure App

**Resources:**
- Type: Web Service
- Name: `inkandimagination-api`
- Branch: `main`
- Source Directory: `/`
- Build Command: `npm install`
- Run Command: `npm start`

**Environment Variables:**
- Add all variables from `.env`

**Plan:**
- Select Basic ($5/month) or Pro ($12/month)

#### 4. Deploy
- Click "Create Resources"
- Wait for deployment
- Get URL: `https://inkandimagination-api-xxxxx.ondigitalocean.app`

---

## ▲ Vercel Deployment (Serverless)

### Why Vercel?
- ✅ Free tier generous
- ✅ Excellent for serverless
- ✅ Fast global CDN
- ✅ Easy CLI deployment

### Step-by-Step Instructions

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Create `vercel.json`

Create file in project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### 3. Login to Vercel
```bash
vercel login
```

#### 4. Deploy
```bash
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? `inkandimagination-backend`
- Directory? `./`
- Override settings? **N**

#### 5. Add Environment Variables

```bash
vercel env add MONGODB_URI
# Paste your MongoDB URI

vercel env add JWT_SECRET
# Paste your JWT secret

# Repeat for all variables
```

Or add via dashboard:
- Go to https://vercel.com/dashboard
- Select project
- Settings → Environment Variables

#### 6. Deploy to Production
```bash
vercel --prod
```

Your API: `https://inkandimagination-backend.vercel.app`

---

## 🔧 Post-Deployment Steps

### 1. Test All Endpoints

```bash
# Health check
curl https://your-api-url.com/api/health

# Get artworks
curl https://your-api-url.com/api/artworks

# Create admin (first time only)
curl -X POST https://your-api-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Neil",
    "email": "neil@inkandimagination.com",
    "password": "YourSecurePassword123"
  }'
```

### 2. Update Frontend

Update API URL in your frontend code:

```javascript
// Before
const API_URL = 'http://localhost:5000/api';

// After
const API_URL = 'https://your-api-url.com/api';
```

### 3. Configure CORS

Ensure `FRONTEND_URL` in environment variables matches your frontend URL:

```
FRONTEND_URL=https://krishnaabhi03.github.io
```

### 4. Set Up Monitoring

**Render.com:**
- Enable email alerts in dashboard

**Railway:**
- Set up health checks

**DigitalOcean:**
- Configure alerts in App Platform

### 5. Create First Admin Account

```bash
curl -X POST https://your-api-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Neil",
    "email": "neil@inkandimagination.com",
    "password": "SecurePassword123!"
  }'
```

Save the returned JWT token!

### 6. Add Sample Artworks

```bash
# Login first
curl -X POST https://your-api-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "neil@inkandimagination.com",
    "password": "SecurePassword123!"
  }'

# Use returned token to create artwork
curl -X POST https://your-api-url.com/api/artworks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Sunset Portrait",
    "description": "Beautiful portrait with sunset background",
    "category": "Portraits & People",
    "price": 450,
    "stock": 1
  }'
```

---

## 🔒 Security Checklist

- [ ] Strong JWT_SECRET (min 32 characters)
- [ ] MongoDB IP whitelist configured
- [ ] Environment variables secured
- [ ] HTTPS enabled (automatic on all platforms)
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Admin registration restricted (consider disabling after first admin)

---

## 📊 Monitoring & Maintenance

### Check Logs

**Render:**
```
Dashboard → Service → Logs
```

**Railway:**
```
Project → Deployments → View Logs
```

**Vercel:**
```bash
vercel logs
```

### Database Monitoring

**MongoDB Atlas:**
- Go to Atlas dashboard
- Metrics → View performance
- Set up alerts for high usage

### Uptime Monitoring

Use free services:
- **UptimeRobot:** https://uptimerobot.com
- **Pingdom:** https://www.pingdom.com
- **StatusCake:** https://www.statuscake.com

Add your API health endpoint:
```
https://your-api-url.com/api/health
```

---

## 🆘 Troubleshooting

### Deployment Fails

**Check build logs:**
- Look for missing dependencies
- Verify Node.js version
- Check for syntax errors

**Common fixes:**
```bash
# Update dependencies
npm update

# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Returns 500 Error

**Check:**
1. MongoDB connection string
2. Environment variables set correctly
3. Database user has correct permissions

**View logs:**
```bash
# Render
Dashboard → Logs

# Railway
Project → Logs

# Vercel
vercel logs
```

### CORS Errors

**Fix:**
1. Verify `FRONTEND_URL` in environment variables
2. Check CORS configuration in `server.js`
3. Ensure frontend uses correct API URL

### Email Not Sending

**Check:**
1. Gmail App Password is correct
2. 2FA enabled on Gmail
3. `EMAIL_USER` and `EMAIL_PASSWORD` set
4. Check spam folder

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid Tier | Best For |
|----------|-----------|-----------|----------|
| **Render** | ✅ Yes (spins down) | $7/month | Production apps |
| **Railway** | $5 credit/month | $5-20/month | Quick deploys |
| **Vercel** | ✅ Generous | $20/month | Serverless |
| **DigitalOcean** | $200 credit | $5-12/month | Scalability |

---

## 🎓 Next Steps

1. **Custom Domain:**
   - Purchase domain (Namecheap, GoDaddy)
   - Configure DNS
   - Add to deployment platform

2. **SSL Certificate:**
   - Automatic on all platforms
   - Or use Cloudflare for additional security

3. **CDN:**
   - Consider Cloudflare for global distribution
   - Improves performance worldwide

4. **Backup Strategy:**
   - MongoDB Atlas automatic backups
   - Export data regularly
   - Version control for code

5. **Scaling:**
   - Monitor usage
   - Upgrade plan as needed
   - Consider load balancing for high traffic

---

**Need Help?** Create an issue on GitHub or contact neil@inkandimagination.com

**Happy Deploying! 🚀**
