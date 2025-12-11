# ⚡ Quick Start Guide - InkAndImagination Backend

Get your backend up and running in 5 minutes!

## 🎯 Prerequisites

- Node.js v18+ installed
- MongoDB Atlas account (free tier)
- Gmail account

---

## 🚀 5-Minute Setup

### Step 1: Clone & Install (1 min)

```bash
git clone https://github.com/KrishnaAbhi03/InkAndImagination-backend.git
cd InkAndImagination-backend
npm install
```

### Step 2: MongoDB Setup (2 min)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (free tier)
4. Create database user
5. Whitelist IP: `0.0.0.0/0`
6. Get connection string

### Step 3: Gmail App Password (1 min)

1. Enable 2FA: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Copy the 16-character password

### Step 4: Environment Variables (30 sec)

```bash
cp .env.example .env
```

Edit `.env`:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/inkandimagination
JWT_SECRET=your_super_secret_key_min_32_characters_long
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=neil@inkandimagination.com
```

### Step 5: Run Server (30 sec)

```bash
npm run dev
```

✅ Server running at `http://localhost:5000`

---

## 🧪 Test Your API

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

Expected:
```json
{
  "success": true,
  "message": "InkAndImagination API is running"
}
```

### 2. Create Admin Account

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Neil",
    "email": "neil@inkandimagination.com",
    "password": "SecurePassword123"
  }'
```

**Save the token from response!**

### 3. Create First Artwork

```bash
curl -X POST http://localhost:5000/api/artworks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Sunset Portrait",
    "description": "Beautiful portrait with sunset background",
    "category": "Portraits & People",
    "price": 450,
    "stock": 1
  }'
```

### 4. Get All Artworks

```bash
curl http://localhost:5000/api/artworks
```

---

## 🌐 Deploy to Production

### Option 1: Render.com (Easiest - Free)

1. Go to https://render.com
2. New Web Service → Connect GitHub
3. Select repository
4. Add environment variables
5. Deploy!

**Done in 3 minutes!**

### Option 2: Railway.app

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Option 3: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 📱 Connect Frontend

Update your frontend API URL:

```javascript
// In your frontend code
const API_URL = 'http://localhost:5000/api'; // Development
// const API_URL = 'https://your-api.onrender.com/api'; // Production
```

---

## 🎨 Sample Data

### Create Sample Artworks

```bash
# Login first and get token
TOKEN="your_jwt_token_here"

# Create multiple artworks
curl -X POST http://localhost:5000/api/artworks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Majestic Lion",
    "description": "Powerful lion portrait in charcoal",
    "category": "Animals & Wildlife",
    "price": 600,
    "stock": 1,
    "medium": "Charcoal"
  }'

curl -X POST http://localhost:5000/api/artworks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Mountain Sunrise",
    "description": "Breathtaking mountain landscape at dawn",
    "category": "Nature & Landscapes",
    "price": 700,
    "stock": 1,
    "medium": "Oil"
  }'

curl -X POST http://localhost:5000/api/artworks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Rose Garden",
    "description": "Delicate rose garden in watercolor",
    "category": "Floral & Botanical Art",
    "price": 380,
    "stock": 2,
    "medium": "Watercolor"
  }'
```

---

## 🔧 Common Issues

### MongoDB Connection Error

**Problem:** `MongoServerError: bad auth`

**Solution:**
1. Check username/password in connection string
2. Verify database user exists
3. Check IP whitelist (use `0.0.0.0/0` for testing)

### Email Not Sending

**Problem:** Emails not being sent

**Solution:**
1. Verify 2FA enabled on Gmail
2. Use App Password, not regular password
3. Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`

### JWT Token Invalid

**Problem:** `401 Unauthorized`

**Solution:**
1. Check `JWT_SECRET` is set in `.env`
2. Verify token format: `Bearer <token>`
3. Token may be expired (login again)

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Kill process on port 5000
# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port
PORT=3000 npm run dev
```

---

## 📚 Next Steps

1. **Read Full Documentation:**
   - [README.md](README.md) - Complete setup guide
   - [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guides

2. **Customize:**
   - Add more artwork categories
   - Implement payment gateway (Stripe/PayPal)
   - Add image upload (Cloudinary)
   - Create admin dashboard frontend

3. **Secure:**
   - Change default admin password
   - Restrict admin registration
   - Enable rate limiting
   - Add HTTPS in production

4. **Monitor:**
   - Set up error logging
   - Monitor database performance
   - Track API usage
   - Set up uptime monitoring

---

## 🆘 Need Help?

- **Documentation:** Check README.md and API_DOCUMENTATION.md
- **Issues:** Create issue on GitHub
- **Email:** neil@inkandimagination.com

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB Atlas account created
- [ ] Gmail App Password generated
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] `.env` file configured
- [ ] Server running locally
- [ ] Admin account created
- [ ] First artwork created
- [ ] API tested successfully
- [ ] Ready to deploy!

---

**Happy Coding! 🎨**

Your InkAndImagination backend is ready to power your art e-commerce platform!
