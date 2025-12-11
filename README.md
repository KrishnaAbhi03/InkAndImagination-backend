# InkAndImagination.com - Backend API

Complete Node.js + Express + MongoDB backend for InkAndImagination.com art e-commerce platform.

## 🎨 About

Professional art e-commerce backend built for Neil, a USA-based sketch and painting artist. This API powers the complete online gallery and sales platform for custom artworks across multiple categories.

## 🚀 Features

- **Complete E-Commerce System**
  - Artwork catalog management
  - Shopping cart & checkout
  - Order processing & tracking
  - Inventory management

- **Admin Dashboard**
  - Artwork CRUD operations
  - Order management
  - Customer inquiries
  - Sales analytics

- **Security**
  - JWT authentication
  - Password hashing with bcrypt
  - Input validation & sanitization
  - CORS protection
  - Rate limiting

- **Email Notifications**
  - Order confirmations
  - Admin notifications
  - Contact form alerts

## 📋 Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Email:** Nodemailer
- **Validation:** Express-validator
- **Security:** Helmet, CORS
- **Image Upload:** Multer + Cloudinary (optional)

## 📁 Project Structure

```
InkAndImagination-backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── artworkController.js # Artwork operations
│   ├── orderController.js   # Order management
│   ├── contactController.js # Contact messages
│   ├── authController.js    # Authentication
│   └── adminController.js   # Admin dashboard
├── middleware/
│   ├── auth.js             # JWT verification
│   ├── errorHandler.js     # Error handling
│   └── validator.js        # Input validation
├── models/
│   ├── Artwork.js          # Artwork schema
│   ├── Order.js            # Order schema
│   ├── Contact.js          # Contact schema
│   └── Admin.js            # Admin schema
├── routes/
│   ├── artworkRoutes.js    # Artwork endpoints
│   ├── orderRoutes.js      # Order endpoints
│   ├── contactRoutes.js    # Contact endpoints
│   ├── authRoutes.js       # Auth endpoints
│   └── adminRoutes.js      # Admin endpoints
├── utils/
│   └── emailService.js     # Email utilities
├── .env.example            # Environment template
├── .gitignore
├── package.json
├── server.js               # Entry point
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email notifications

### Step 1: Clone Repository

```bash
git clone https://github.com/KrishnaAbhi03/InkAndImagination-backend.git
cd InkAndImagination-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Create `.env` file in root directory:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inkandimagination

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=7d

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=InkAndImagination <noreply@inkandimagination.com>
ADMIN_EMAIL=neil@inkandimagination.com

# Frontend
FRONTEND_URL=https://krishnaabhi03.github.io
```

### Step 4: Gmail App Password Setup

1. Go to Google Account Settings
2. Enable 2-Factor Authentication
3. Generate App Password: https://myaccount.google.com/apppasswords
4. Use generated password in `EMAIL_PASSWORD`

### Step 5: MongoDB Setup

**Option A: MongoDB Atlas (Recommended)**

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create new cluster (free tier available)
3. Create database user
4. Whitelist IP (0.0.0.0/0 for development)
5. Get connection string
6. Replace in `MONGODB_URI`

**Option B: Local MongoDB**

```env
MONGODB_URI=mongodb://localhost:27017/inkandimagination
```

### Step 6: Run Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs at: `http://localhost:5000`

## 📡 API Endpoints

### Public Endpoints

#### Artworks
```
GET    /api/artworks              # Get all artworks
GET    /api/artworks/:id          # Get single artwork
GET    /api/artworks/category/:category  # Filter by category
```

#### Orders
```
POST   /api/orders                # Create new order
```

#### Contact
```
POST   /api/contact               # Submit contact form
```

### Protected Endpoints (Require JWT Token)

#### Authentication
```
POST   /api/auth/register         # Register admin
POST   /api/auth/login            # Login admin
GET    /api/auth/me               # Get current admin
```

#### Artworks (Admin)
```
POST   /api/artworks              # Create artwork
PUT    /api/artworks/:id          # Update artwork
DELETE /api/artworks/:id          # Delete artwork
```

#### Orders (Admin)
```
GET    /api/orders                # Get all orders
GET    /api/orders/:id            # Get single order
PUT    /api/orders/:id/status     # Update order status
```

#### Contact (Admin)
```
GET    /api/contact               # Get all messages
GET    /api/contact/:id           # Get single message
PUT    /api/contact/:id/status    # Update message status
```

#### Admin Dashboard
```
GET    /api/admin/dashboard       # Get dashboard stats
GET    /api/admin/activity        # Get recent activity
```

## 🔐 Authentication

Protected routes require JWT token in Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Login Flow

1. **Register Admin:**
```bash
POST /api/auth/register
{
  "name": "Neil",
  "email": "neil@inkandimagination.com",
  "password": "SecurePassword123"
}
```

2. **Login:**
```bash
POST /api/auth/login
{
  "email": "neil@inkandimagination.com",
  "password": "SecurePassword123"
}
```

Response includes JWT token:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "...",
    "name": "Neil",
    "email": "neil@inkandimagination.com",
    "role": "admin"
  }
}
```

3. **Use Token:**
```bash
GET /api/admin/dashboard
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 📦 Sample API Requests

### Create Artwork

```bash
POST /api/artworks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Sunset Portrait",
  "description": "Beautiful portrait painting with sunset background",
  "category": "Portraits & People",
  "price": 450,
  "stock": 1,
  "imageUrl": "https://example.com/image.jpg",
  "medium": "Oil",
  "dimensions": {
    "width": 24,
    "height": 36,
    "unit": "inches"
  }
}
```

### Create Order

```bash
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "artworkId": "65abc123...",
      "title": "Sunset Portrait",
      "quantity": 1,
      "price": 450
    }
  ],
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "phone": "+1 234 567 8900",
  "totalAmount": 450,
  "notes": "Please handle with care"
}
```

## 🚀 Deployment

### Option 1: Render.com (Recommended - Free Tier)

1. **Create Account:** https://render.com
2. **New Web Service**
3. **Connect GitHub Repository**
4. **Configure:**
   - **Name:** inkandimagination-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

5. **Environment Variables:**
   Add all variables from `.env` in Render dashboard

6. **Deploy:** Click "Create Web Service"

Your API will be live at: `https://inkandimagination-api.onrender.com`

### Option 2: Railway.app

1. **Create Account:** https://railway.app
2. **New Project → Deploy from GitHub**
3. **Select Repository**
4. **Add Environment Variables**
5. **Deploy**

### Option 3: DigitalOcean App Platform

1. **Create Account:** https://www.digitalocean.com
2. **Apps → Create App**
3. **Connect GitHub**
4. **Configure:**
   - **Type:** Web Service
   - **Run Command:** `npm start`
5. **Add Environment Variables**
6. **Launch**

### Option 4: Vercel (Serverless)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Create `vercel.json`:**
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
  ]
}
```

3. **Deploy:**
```bash
vercel
```

4. **Add Environment Variables:**
```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
# ... add all variables
```

## 🔧 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `production` |
| `MONGODB_URI` | MongoDB connection | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing key | `min_32_char_secret` |
| `JWT_EXPIRE` | Token expiry | `7d` |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_USER` | Email username | `your@gmail.com` |
| `EMAIL_PASSWORD` | App password | `xxxx xxxx xxxx xxxx` |
| `EMAIL_FROM` | From address | `InkAndImagination <no-reply@...>` |
| `ADMIN_EMAIL` | Admin email | `neil@inkandimagination.com` |
| `FRONTEND_URL` | Frontend URL | `https://krishnaabhi03.github.io` |

## 🧪 Testing

### Health Check
```bash
curl https://your-api-url.com/api/health
```

### Test Endpoints with Postman

1. Import collection from `postman_collection.json` (if provided)
2. Set environment variables
3. Test all endpoints

### Test with cURL

```bash
# Get all artworks
curl https://your-api-url.com/api/artworks

# Create order
curl -X POST https://your-api-url.com/api/orders \
  -H "Content-Type: application/json" \
  -d '{"items":[...],"customerName":"Test",...}'
```

## 📊 Database Models

### Artwork
- title, description, category
- price, stock, imageUrl
- dimensions, medium
- featured, sold
- timestamps

### Order
- items (array of artworks)
- customer info (name, email, phone)
- address (street, city, state, zip)
- totalAmount
- paymentStatus, orderStatus
- trackingNumber
- timestamps

### Contact
- name, email, message
- status (new/read/replied/archived)
- timestamps

### Admin
- name, email, password (hashed)
- role (admin/super_admin)
- active status
- timestamps

## 🛡️ Security Best Practices

1. **Never commit `.env` file**
2. **Use strong JWT_SECRET** (min 32 characters)
3. **Enable MongoDB IP whitelist** in production
4. **Use HTTPS** in production
5. **Implement rate limiting** for public endpoints
6. **Validate all inputs**
7. **Sanitize user data**
8. **Keep dependencies updated**

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check `MONGODB_URI` format
- Verify database user credentials
- Whitelist IP address in MongoDB Atlas

### Email Not Sending
- Verify Gmail App Password
- Check 2FA is enabled
- Confirm `EMAIL_USER` and `EMAIL_PASSWORD`

### JWT Token Invalid
- Check `JWT_SECRET` is set
- Verify token format: `Bearer <token>`
- Token may be expired (check `JWT_EXPIRE`)

### CORS Errors
- Update `FRONTEND_URL` in `.env`
- Check CORS configuration in `server.js`

## 📝 License

MIT License - Created for InkAndImagination.com

## 👨‍🎨 Author

**Neil** - Professional Sketch & Painting Artist
- Location: New York, USA
- Email: neil@inkandimagination.com
- Phone: +1 890 765 6423

## 🤝 Support

For technical support or custom development:
- Create an issue on GitHub
- Email: neil@inkandimagination.com

---

**Built with ❤️ for InkAndImagination.com**
