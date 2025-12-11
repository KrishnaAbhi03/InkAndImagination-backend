# 📚 API Documentation - InkAndImagination.com

Complete API reference for the InkAndImagination e-commerce backend.

**Base URL:** `https://your-api-url.com/api`

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Artworks](#artworks)
3. [Orders](#orders)
4. [Contact](#contact)
5. [Admin](#admin)
6. [Error Handling](#error-handling)

---

## 🔐 Authentication

### Register Admin

Create a new admin account.

**Endpoint:** `POST /auth/register`

**Access:** Public (should be restricted in production)

**Request Body:**
```json
{
  "name": "Neil",
  "email": "neil@inkandimagination.com",
  "password": "SecurePassword123"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "65abc123def456...",
    "name": "Neil",
    "email": "neil@inkandimagination.com",
    "role": "admin"
  }
}
```

---

### Login

Authenticate and receive JWT token.

**Endpoint:** `POST /auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "neil@inkandimagination.com",
  "password": "SecurePassword123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "65abc123def456...",
    "name": "Neil",
    "email": "neil@inkandimagination.com",
    "role": "admin"
  }
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### Get Current Admin

Get currently logged-in admin details.

**Endpoint:** `GET /auth/me`

**Access:** Private (requires JWT token)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "65abc123def456...",
    "name": "Neil",
    "email": "neil@inkandimagination.com",
    "role": "admin",
    "active": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 🎨 Artworks

### Get All Artworks

Retrieve all artworks with optional filtering.

**Endpoint:** `GET /artworks`

**Access:** Public

**Query Parameters:**
- `category` (string): Filter by category
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `featured` (boolean): Filter featured artworks
- `sort` (string): Sort field (e.g., `price`, `-createdAt`)

**Example Request:**
```
GET /artworks?category=Portraits & People&minPrice=300&maxPrice=600&sort=-price
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "65abc123def456...",
      "title": "Elegant Lady Portrait",
      "description": "Beautiful portrait painting with intricate details",
      "category": "Portraits & People",
      "price": 450,
      "imageUrl": "https://example.com/image.jpg",
      "stock": 1,
      "dimensions": {
        "width": 24,
        "height": 36,
        "unit": "inches"
      },
      "medium": "Oil",
      "featured": true,
      "sold": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Artworks by Category

Get all artworks in a specific category.

**Endpoint:** `GET /artworks/category/:category`

**Access:** Public

**Parameters:**
- `category` (string): Category name

**Valid Categories:**
- `Portraits & People`
- `Animals & Wildlife`
- `Nature & Landscapes`
- `Floral & Botanical Art`
- `Abstract & Creative Art`

**Example Request:**
```
GET /artworks/category/Portraits & People
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 8,
  "category": "Portraits & People",
  "data": [...]
}
```

---

### Get Single Artwork

Get detailed information about a specific artwork.

**Endpoint:** `GET /artworks/:id`

**Access:** Public

**Parameters:**
- `id` (string): Artwork ID

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "65abc123def456...",
    "title": "Elegant Lady Portrait",
    "description": "Beautiful portrait painting",
    "category": "Portraits & People",
    "price": 450,
    "imageUrl": "https://example.com/image.jpg",
    "stock": 1,
    "dimensions": {
      "width": 24,
      "height": 36,
      "unit": "inches"
    },
    "medium": "Oil",
    "featured": true,
    "sold": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "error": "Artwork not found"
}
```

---

### Create Artwork

Create a new artwork (Admin only).

**Endpoint:** `POST /artworks`

**Access:** Private (Admin)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Sunset Portrait",
  "description": "Beautiful portrait with sunset background",
  "category": "Portraits & People",
  "price": 450,
  "stock": 1,
  "imageUrl": "https://example.com/image.jpg",
  "medium": "Oil",
  "dimensions": {
    "width": 24,
    "height": 36,
    "unit": "inches"
  },
  "featured": false
}
```

**Required Fields:**
- `title` (string, max 100 chars)
- `description` (string, max 1000 chars)
- `category` (string, must be valid category)
- `price` (number, >= 0)

**Optional Fields:**
- `stock` (number, default: 1)
- `imageUrl` (string)
- `medium` (string)
- `dimensions` (object)
- `featured` (boolean, default: false)

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Artwork created successfully",
  "data": {
    "_id": "65abc123def456...",
    "title": "Sunset Portrait",
    ...
  }
}
```

---

### Update Artwork

Update an existing artwork (Admin only).

**Endpoint:** `PUT /artworks/:id`

**Access:** Private (Admin)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
```

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "price": 500,
  "stock": 2,
  "featured": true
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Artwork updated successfully",
  "data": {
    "_id": "65abc123def456...",
    "title": "Updated Title",
    ...
  }
}
```

---

### Delete Artwork

Delete an artwork (Admin only).

**Endpoint:** `DELETE /artworks/:id`

**Access:** Private (Admin)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Artwork deleted successfully",
  "data": {}
}
```

---

## 🛒 Orders

### Create Order

Place a new order.

**Endpoint:** `POST /orders`

**Access:** Public

**Request Body:**
```json
{
  "items": [
    {
      "artworkId": "65abc123def456...",
      "title": "Elegant Lady Portrait",
      "quantity": 1,
      "price": 450
    }
  ],
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "address": {
    "street": "123 Main Street",
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

**Required Fields:**
- `items` (array, min 1 item)
  - `artworkId` (string)
  - `title` (string)
  - `quantity` (number, >= 1)
  - `price` (number, >= 0)
- `customerName` (string)
- `customerEmail` (string, valid email)
- `address` (object)
  - `street` (string)
  - `city` (string)
  - `state` (string)
  - `zipCode` (string)
- `phone` (string, valid phone)
- `totalAmount` (number, >= 0)

**Optional Fields:**
- `notes` (string, max 500 chars)

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "_id": "65xyz789abc012...",
    "items": [...],
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "address": {...},
    "phone": "+1 234 567 8900",
    "totalAmount": 450,
    "paymentStatus": "pending",
    "orderStatus": "processing",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Automatic Actions:**
- Reduces artwork stock
- Sends confirmation email to customer
- Sends notification email to admin

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "error": "Insufficient stock for Elegant Lady Portrait. Available: 0"
}
```

---

### Get All Orders

Retrieve all orders (Admin only).

**Endpoint:** `GET /orders`

**Access:** Private (Admin)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters:**
- `status` (string): Filter by order status
- `paymentStatus` (string): Filter by payment status
- `sort` (string): Sort field

**Example Request:**
```
GET /orders?status=processing&sort=-createdAt
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "_id": "65xyz789abc012...",
      "items": [...],
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "totalAmount": 450,
      "orderStatus": "processing",
      "paymentStatus": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Single Order

Get detailed order information (Admin only).

**Endpoint:** `GET /orders/:id`

**Access:** Private (Admin)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "65xyz789abc012...",
    "items": [
      {
        "artworkId": {...},
        "title": "Elegant Lady Portrait",
        "quantity": 1,
        "price": 450
      }
    ],
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "address": {...},
    "phone": "+1 234 567 8900",
    "totalAmount": 450,
    "paymentStatus": "pending",
    "orderStatus": "processing",
    "trackingNumber": null,
    "notes": "Please handle with care",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Order Status

Update order status and tracking (Admin only).

**Endpoint:** `PUT /orders/:id/status`

**Access:** Private (Admin)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
```

**Request Body:** (all fields optional)
```json
{
  "orderStatus": "shipped",
  "paymentStatus": "paid",
  "trackingNumber": "1Z999AA10123456784"
}
```

**Valid Order Statuses:**
- `processing`
- `confirmed`
- `shipped`
- `delivered`
- `cancelled`

**Valid Payment Statuses:**
- `pending`
- `paid`
- `failed`
- `refunded`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "_id": "65xyz789abc012...",
    "orderStatus": "shipped",
    "paymentStatus": "paid",
    "trackingNumber": "1Z999AA10123456784",
    ...
  }
}
```

---

## 📧 Contact

### Submit Contact Form

Submit a contact/inquiry message.

**Endpoint:** `POST /contact`

**Access:** Public

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "I'm interested in commissioning a custom portrait. Can you provide more details about pricing and timeline?"
}
```

**Required Fields:**
- `name` (string, max 100 chars)
- `email` (string, valid email)
- `message` (string, max 2000 chars)

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "data": {
    "_id": "65def456ghi789...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "I'm interested in...",
    "status": "new",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Automatic Actions:**
- Sends notification email to admin

---

### Get All Messages

Retrieve all contact messages (Admin only).

**Endpoint:** `GET /contact`

**Access:** Private (Admin)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters:**
- `status` (string): Filter by status (new/read/replied/archived)
- `sort` (string): Sort field

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "_id": "65def456ghi789...",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "message": "I'm interested in...",
      "status": "new",
      "replied": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Single Message

Get detailed message information (Admin only).

**Endpoint:** `GET /contact/:id`

**Access:** Private (Admin)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "65def456ghi789...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "I'm interested in commissioning...",
    "status": "read",
    "replied": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Automatic Actions:**
- Marks message as "read" if status was "new"

---

### Update Message Status

Update message status (Admin only).

**Endpoint:** `PUT /contact/:id/status`

**Access:** Private (Admin)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "replied",
  "replied": true
}
```

**Valid Statuses:**
- `new`
- `read`
- `replied`
- `archived`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Message status updated successfully",
  "data": {
    "_id": "65def456ghi789...",
    "status": "replied",
    "replied": true,
    ...
  }
}
```

---

## 📊 Admin

### Get Dashboard Statistics

Get comprehensive dashboard statistics (Admin only).

**Endpoint:** `GET /admin/dashboard`

**Access:** Private (Admin)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalArtworks": 45,
      "totalOrders": 128,
      "pendingOrders": 12,
      "totalMessages": 34,
      "unreadMessages": 5,
      "totalRevenue": 45600
    },
    "recentOrders": [
      {
        "_id": "...",
        "customerName": "John Doe",
        "totalAmount": 450,
        "orderStatus": "processing",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "lowStockArtworks": [
      {
        "_id": "...",
        "title": "Sunset Portrait",
        "stock": 1,
        "price": 450
      }
    ],
    "categoryStats": [
      {
        "_id": "Portraits & People",
        "count": 15
      },
      {
        "_id": "Animals & Wildlife",
        "count": 12
      }
    ]
  }
}
```

---

### Get Recent Activity

Get recent activity feed (Admin only).

**Endpoint:** `GET /admin/activity`

**Access:** Private (Admin)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters:**
- `limit` (number): Number of activities (default: 10)

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "type": "order",
      "data": {
        "_id": "...",
        "customerName": "John Doe",
        "totalAmount": 450,
        "orderStatus": "processing"
      },
      "timestamp": "2024-01-01T12:00:00.000Z"
    },
    {
      "type": "message",
      "data": {
        "_id": "...",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "status": "new"
      },
      "timestamp": "2024-01-01T11:30:00.000Z"
    }
  ]
}
```

---

## ⚠️ Error Handling

### Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| `200` | OK | Request successful |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Invalid request data |
| `401` | Unauthorized | Authentication required or failed |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Resource not found |
| `500` | Server Error | Internal server error |

### Common Errors

**Validation Error:**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    },
    {
      "field": "price",
      "message": "Price must be a positive number"
    }
  ]
}
```

**Authentication Error:**
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

**Not Found Error:**
```json
{
  "success": false,
  "error": "Artwork not found"
}
```

---

## 🔧 Rate Limiting

API implements rate limiting to prevent abuse:

- **Public endpoints:** 100 requests per 15 minutes per IP
- **Authenticated endpoints:** 1000 requests per 15 minutes per user

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## 📝 Notes

1. **Timestamps:** All timestamps are in ISO 8601 format (UTC)
2. **IDs:** MongoDB ObjectIDs (24 hex characters)
3. **Pagination:** Not implemented yet (future enhancement)
4. **File Uploads:** Image URLs only (Cloudinary integration optional)
5. **Webhooks:** Not implemented (future enhancement)

---

**API Version:** 1.0.0  
**Last Updated:** December 2024  
**Contact:** neil@inkandimagination.com
