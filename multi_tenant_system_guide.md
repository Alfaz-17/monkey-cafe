# 🏪 Multi-Tenant Café/Restaurant System - Complete Guide

> A comprehensive guide for transforming the Monkey Cafe Order System into a multi-tenant platform that serves multiple cafés and restaurants.

---

## 📌 Table of Contents

1. [Overview](#overview)
2. [Current vs Target Architecture](#current-vs-target-architecture)
3. [Architecture Approaches](#architecture-approaches)
4. [Data Model Design](#data-model-design)
5. [Dynamic Elements](#dynamic-elements)
6. [Implementation Flow](#implementation-flow)
7. [URL Structure](#url-structure)
8. [Tenant Isolation Middleware](#tenant-isolation-middleware)
9. [Dynamic Theming](#dynamic-theming)
10. [Registration Flow](#registration-flow)
11. [Next Steps & Roadmap](#next-steps--roadmap)

---

## Overview

### What is Multi-Tenancy?

Multi-tenancy is a software architecture where a **single instance** of the application serves **multiple customers (tenants)**. Each tenant (café/restaurant) has their own:

- Branding (logo, name, theme colors)
- Menu items & categories
- Orders & tables
- Admin access & dashboard

### Benefits

| Benefit | Description |
|---------|-------------|
| **Cost Efficient** | One codebase, one deployment, multiple customers |
| **Easy Maintenance** | Update once, applies to all tenants |
| **Scalable** | Add new cafés without new deployments |
| **Data Isolation** | Each café sees only their data |

---

## Current vs Target Architecture

### Current Architecture (Single Tenant)

```
┌─────────────────────────────────────────┐
│           Monkey Cafe System            │
├─────────────────────────────────────────┤
│  Products │ Categories │ Orders │ Tables│
│           (All for ONE café)            │
└─────────────────────────────────────────┘
```

**Models:**
- `Product.js` - Menu items
- `Category.js` - Menu categories
- `Order.js` - Customer orders
- `Table.js` - Restaurant tables
- `User.js` - Admin users
- `Customization.js` - Product modifiers

### Target Architecture (Multi-Tenant)

```
┌─────────────────────────────────────────────────────────────┐
│                    Platform (MediaMasala)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Monkey Cafe │  │ Coffee Hub  │  │ Pizza Place │  ...    │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤         │
│  │ Products    │  │ Products    │  │ Products    │         │
│  │ Categories  │  │ Categories  │  │ Categories  │         │
│  │ Orders      │  │ Orders      │  │ Orders      │         │
│  │ Tables      │  │ Tables      │  │ Tables      │         │
│  │ Admins      │  │ Admins      │  │ Admins      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

---

## Architecture Approaches

### Option 1: Shared Database with Column-based Isolation ✅ RECOMMENDED

All tenants share one database. Each record has a `cafeId` field for isolation.

```javascript
// Every document has cafeId
{
  _id: "...",
  cafeId: "cafe_123",  // ← Tenant identifier
  name: "Cappuccino",
  price: 150
}
```

| Pros | Cons |
|------|------|
| Simple implementation | Requires careful query filtering |
| Cost-effective | Data in same DB (need good access control) |
| Easy to maintain | Potential for data leaks if not careful |
| Good for MVP/startup phase | |

### Option 2: Separate Databases per Tenant

Each café gets their own MongoDB database.

```
mongodb://host/monkey_cafe_db
mongodb://host/coffee_hub_db
mongodb://host/pizza_place_db
```

| Pros | Cons |
|------|------|
| Complete data isolation | Higher infrastructure cost |
| Easy backup/restore per tenant | Complex connection management |
| Good for enterprise clients | Harder to maintain |

### Option 3: Hybrid Approach

- Small clients → Shared database
- Enterprise clients → Dedicated database

**Recommendation for your scale:** Start with **Option 1 (Shared Database)** as it's cost-effective and simpler to implement.

---

## Data Model Design

### NEW: Café Model (Core Tenant Entity)

```javascript
// server/models/Cafe.js

const mongoose = require('mongoose');

const CafeSchema = new mongoose.Schema({
  // ============================================
  // IDENTITY
  // ============================================
  slug: { 
    type: String, 
    unique: true, 
    required: true,
    lowercase: true,
    trim: true
  },  // URL path: "monkey-cafe" → /cafe/monkey-cafe
  
  // ============================================
  // BRANDING
  // ============================================
  name: { 
    type: String, 
    required: true,
    trim: true
  },  // "Monkey Cafe"
  
  logo: { 
    type: String 
  },  // Logo image URL
  
  bannerImage: { 
    type: String 
  },  // Hero banner image
  
  tagline: { 
    type: String,
    maxlength: 150
  },  // "Best Coffee in Town"
  
  description: {
    type: String,
    maxlength: 500
  },  // About the café
  
  // ============================================
  // THEME (Dynamic Styling)
  // ============================================
  theme: {
    primaryColor: { 
      type: String, 
      default: "#FF6B35" 
    },
    secondaryColor: { 
      type: String, 
      default: "#004E64" 
    },
    accentColor: { 
      type: String, 
      default: "#F7C548" 
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    textColor: {
      type: String,
      default: "#1A1A1A"
    },
    fontFamily: { 
      type: String, 
      default: "Inter",
      enum: ["Inter", "Roboto", "Poppins", "Open Sans", "Montserrat"]
    },
    borderRadius: {
      type: String,
      default: "8px"
    },
    darkMode: { 
      type: Boolean, 
      default: false 
    }
  },
  
  // ============================================
  // CONTACT & LOCATION
  // ============================================
  address: {
    street: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String },
    country: { type: String, default: "India" },
    googleMapsUrl: { type: String }
  },
  
  phone: { 
    type: String,
    required: true
  },
  
  whatsapp: { 
    type: String 
  },
  
  email: { 
    type: String,
    lowercase: true
  },
  
  // ============================================
  // SOCIAL LINKS
  // ============================================
  social: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    website: { type: String }
  },
  
  // ============================================
  // BUSINESS DETAILS
  // ============================================
  businessType: { 
    type: String, 
    enum: [
      "cafe", 
      "restaurant", 
      "bar", 
      "bakery", 
      "food_truck", 
      "cloud_kitchen",
      "ice_cream_parlor",
      "juice_bar",
      "fine_dining",
      "fast_food",
      "other"
    ],
    default: "cafe"
  },
  
  cuisineTypes: [{
    type: String
  }],  // ["Italian", "Indian", "Continental", "Chinese"]
  
  operatingHours: [{
    day: {
      type: String,
      enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    },
    open: { type: String },   // "09:00"
    close: { type: String },  // "22:00"
    isClosed: { type: Boolean, default: false }
  }],
  
  // ============================================
  // FEATURES ENABLED
  // ============================================
  features: {
    onlineOrdering: { type: Boolean, default: true },
    tableReservation: { type: Boolean, default: false },
    delivery: { type: Boolean, default: false },
    takeaway: { type: Boolean, default: true },
    dineIn: { type: Boolean, default: true },
    whatsappReceipts: { type: Boolean, default: true },
    kitchenDisplay: { type: Boolean, default: true },
    inventoryManagement: { type: Boolean, default: false },
    customerFeedback: { type: Boolean, default: false },
    loyalty: { type: Boolean, default: false }
  },
  
  // ============================================
  // SETTINGS
  // ============================================
  settings: {
    currency: { type: String, default: "INR" },
    currencySymbol: { type: String, default: "₹" },
    taxRate: { type: Number, default: 5 },        // GST percentage
    serviceTaxRate: { type: Number, default: 0 }, // Service charge
    minOrderValue: { type: Number, default: 0 },
    avgPrepTime: { type: Number, default: 15 },   // Minutes
    autoAcceptOrders: { type: Boolean, default: false }
  },
  
  // ============================================
  // SUBSCRIPTION / PLAN
  // ============================================
  subscription: {
    plan: { 
      type: String, 
      enum: ["free", "starter", "pro", "enterprise"], 
      default: "free" 
    },
    startedAt: { type: Date },
    expiresAt: { type: Date },
    maxTables: { type: Number, default: 5 },
    maxProducts: { type: Number, default: 20 },
    maxOrders: { type: Number, default: 100 },  // Per month
    maxAdmins: { type: Number, default: 1 }
  },
  
  // ============================================
  // OWNER DETAILS
  // ============================================
  owner: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  
  // ============================================
  // META
  // ============================================
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-update timestamp
CafeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Index for fast lookups
CafeSchema.index({ slug: 1 });
CafeSchema.index({ 'owner.email': 1 });
CafeSchema.index({ isActive: 1 });

module.exports = mongoose.model('Cafe', CafeSchema);
```

---

### MODIFIED: Existing Models (Add cafeId)

#### Product Model

```javascript
// server/models/Product.js - MODIFIED

const ProductSchema = new mongoose.Schema({
  // ← ADD THIS FIELD
  cafeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cafe', 
    required: true, 
    index: true 
  },
  
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isAvailable: { type: Boolean, default: true },
  isPopular: { type: Boolean, default: false },
  // ... rest of existing fields
});

// Compound index for efficient queries
ProductSchema.index({ cafeId: 1, category: 1 });
ProductSchema.index({ cafeId: 1, isAvailable: 1 });
```

#### Category Model

```javascript
// server/models/Category.js - MODIFIED

const CategorySchema = new mongoose.Schema({
  // ← ADD THIS FIELD
  cafeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cafe', 
    required: true, 
    index: true 
  },
  
  name: { type: String, required: true },
  image: { type: String },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  // ... rest of existing fields
});

CategorySchema.index({ cafeId: 1, isActive: 1 });
```

#### Order Model

```javascript
// server/models/Order.js - MODIFIED

const OrderSchema = new mongoose.Schema({
  // ← ADD THIS FIELD
  cafeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cafe', 
    required: true, 
    index: true 
  },
  
  orderNumber: { type: String },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  items: [/* ... */],
  status: { type: String },
  total: { type: Number },
  // ... rest of existing fields
});

OrderSchema.index({ cafeId: 1, createdAt: -1 });
OrderSchema.index({ cafeId: 1, status: 1 });
```

#### Table Model

```javascript
// server/models/Table.js - MODIFIED

const TableSchema = new mongoose.Schema({
  // ← ADD THIS FIELD
  cafeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cafe', 
    required: true, 
    index: true 
  },
  
  tableNumber: { type: String, required: true },
  qrCode: { type: String },
  isOccupied: { type: Boolean, default: false },
  capacity: { type: Number, default: 4 },
  // ... rest of existing fields
});

// Unique table number per café
TableSchema.index({ cafeId: 1, tableNumber: 1 }, { unique: true });
```

#### User Model (Admin)

```javascript
// server/models/User.js - MODIFIED

const UserSchema = new mongoose.Schema({
  // ← ADD THIS FIELD
  cafeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cafe', 
    required: true 
  },
  
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  
  // ← ADD THIS FIELD
  role: { 
    type: String, 
    enum: ["owner", "manager", "staff", "kitchen"], 
    default: "owner" 
  },
  
  isActive: { type: Boolean, default: true },
  // ... rest of existing fields
});

UserSchema.index({ cafeId: 1, email: 1 }, { unique: true });
```

---

## Dynamic Elements

### What's Dynamic vs Static?

| Static (Same for All) | Dynamic (Per Café) |
|----------------------|-------------------|
| Application code/logic | Branding (logo, name, tagline) |
| UI Component structure | Theme (colors, fonts) |
| API endpoints structure | Menu items & categories |
| Database schema | Tables & QR codes |
| Admin panel layout | Business details |
| Core feature logic | Operating hours |
| Authentication flow | Social links |
| | Contact information |
| | Subscription tier & limits |
| | Feature toggles |

### How Theming Works

The café's theme settings are applied as CSS custom properties:

```css
/* Dynamic CSS Variables */
:root {
  --primary-color: #FF6B35;      /* From cafe.theme.primaryColor */
  --secondary-color: #004E64;    /* From cafe.theme.secondaryColor */
  --accent-color: #F7C548;       /* From cafe.theme.accentColor */
  --background-color: #FFFFFF;   /* From cafe.theme.backgroundColor */
  --text-color: #1A1A1A;         /* From cafe.theme.textColor */
  --font-family: 'Inter';        /* From cafe.theme.fontFamily */
  --border-radius: 8px;          /* From cafe.theme.borderRadius */
}
```

---

## Implementation Flow

### Complete System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     REGISTRATION FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Café Owner visits → yourdomain.com/register                 │
│                              ↓                                   │
│  2. Fills registration form:                                     │
│     • Business Name: "Monkey Cafe"                              │
│     • Owner Name, Email, Phone                                  │
│     • Address details                                           │
│     • Logo upload                                               │
│     • Business type                                             │
│                              ↓                                   │
│  3. System creates:                                             │
│     • Café document (slug: "monkey-cafe")                       │
│     • Admin user (owner role)                                   │
│     • Default categories (Coffee, Snacks, etc.)                 │
│     • Sample table                                              │
│                              ↓                                   │
│  4. Owner receives:                                             │
│     • Admin credentials via email                               │
│     • Public menu URL: yourdomain.com/cafe/monkey-cafe          │
│     • Admin URL: yourdomain.com/admin                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     ORDERING FLOW                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Customer scans QR code on table                             │
│                              ↓                                   │
│  2. Opens: yourdomain.com/cafe/monkey-cafe/table/5              │
│                              ↓                                   │
│  3. System:                                                     │
│     • Resolves "monkey-cafe" → cafeId                           │
│     • Loads café branding & theme                               │
│     • Fetches menu (filtered by cafeId)                         │
│                              ↓                                   │
│  4. Customer browses menu with café's branding                  │
│                              ↓                                   │
│  5. Places order → Saved with cafeId                            │
│                              ↓                                   │
│  6. Admin dashboard shows order (filtered by their cafeId)      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## URL Structure

### Customer-Facing URLs

```
📂 Public URLs:
   
   yourdomain.com/cafe/[slug]
   └── Café homepage with branding
   
   yourdomain.com/cafe/[slug]/menu
   └── Digital menu page
   
   yourdomain.com/cafe/[slug]/table/[tableNumber]
   └── Table-specific QR landing (auto-sets table context)
   
   yourdomain.com/cafe/[slug]/cart
   └── Shopping cart
   
   yourdomain.com/cafe/[slug]/orders
   └── Customer's order history (session-based)
   
   yourdomain.com/cafe/[slug]/order/[orderId]
   └── Order tracking page
```

### Admin URLs

```
📂 Admin URLs:
   
   yourdomain.com/admin/login
   └── Admin login (email/password)
   
   yourdomain.com/admin/dashboard
   └── Main dashboard (auto-filtered by logged-in user's cafeId)
   
   yourdomain.com/admin/menu
   └── Menu management
   
   yourdomain.com/admin/orders
   └── Order management
   
   yourdomain.com/admin/tables
   └── Table & QR management
   
   yourdomain.com/admin/settings
   └── Café settings & branding
   
   yourdomain.com/admin/reports
   └── Analytics & reports
```

### Super Admin URLs (Platform Owner)

```
📂 Super Admin URLs:
   
   yourdomain.com/superadmin/login
   └── Platform admin login
   
   yourdomain.com/superadmin/cafes
   └── All registered cafés
   
   yourdomain.com/superadmin/subscriptions
   └── Subscription management
```

---

## Tenant Isolation Middleware

### Resolver Middleware

```javascript
// server/middleware/tenantResolver.js

const Cafe = require('../models/Cafe');

/**
 * Resolves café from URL slug and attaches to request
 */
const resolveTenant = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    


    if (!slug) {
      return res.status(400).json({ 
        error: "Café identifier required" 
      });
    }
    


    const cafe = await Cafe.findOne({ 
      slug: slug.toLowerCase(), 
      isActive: true 
    }).lean();
    
    if (!cafe) {
      return res.status(404).json({ 
        error: "Café not found or inactive" 
      });
    }
    
    // Attach to request for use in controllers
    req.cafe = cafe;
    req.cafeId = cafe._id;
    
    next();
  } catch (error) {
    console.error('Tenant resolution error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Middleware for admin routes - gets cafeId from authenticated user
 */
const resolveAdminTenant = async (req, res, next) => {
  try {
    // Assumes auth middleware has set req.user
    if (!req.user || !req.user.cafeId) {
      return res.status(401).json({ 
        error: "Authentication required" 
      });
    }
    


    const cafe = await Cafe.findById(req.user.cafeId).lean()
    
    if (!cafe || !cafe.isActive) {
      return res.status(403).json({ 
        error: "Café not found or inactive" 
      });
    }
    
    req.cafe = cafe;
    req.cafeId = cafe._id;
    
    next();
  } catch (error) {
    console.error('Admin tenant resolution error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { resolveTenant, resolveAdminTenant };
```

### Usage in Routes

```javascript
// server/routes/menu.js

const express = require('express');
const router = express.Router();
const { resolveTenant } = require('../middleware/tenantResolver');
const menuController = require('../controllers/menuController');

// Public menu endpoint
router.get('/cafe/:slug/menu', resolveTenant, menuController.getMenu);

// All queries in controller are filtered by req.cafeId
```

### Controller Example

```javascript
// server/controllers/menuController.js

const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getMenu = async (req, res) => {
  try {
    const { cafeId } = req;  // From middleware
    
    // Automatically filtered by café
    const categories = await Category.find({ 
      cafeId, 
      isActive: true 
    }).sort('displayOrder');
    
    const products = await Product.find({ 
      cafeId, 
      isAvailable: true 
    }).populate('category');
    
    res.json({
      cafe: {
        name: req.cafe.name,
        logo: req.cafe.logo,
        theme: req.cafe.theme
      },
      categories,
      products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## Dynamic Theming

### Server: Include Theme in API Response

```javascript
// API Response structure
{
  "cafe": {
    "name": "Monkey Cafe",
    "logo": "/uploads/monkey-cafe/logo.png",
    "tagline": "Best Coffee in Town",
    "theme": {
      "primaryColor": "#FF6B35",
      "secondaryColor": "#004E64",
      "accentColor": "#F7C548",
      "backgroundColor": "#FFFFFF",
      "textColor": "#1A1A1A",
      "fontFamily": "Inter",
      "borderRadius": "8px",
      "darkMode": false
    }
  },
  "categories": [...],
  "products": [...]
}
```

### Client: Apply Theme (Next.js)

```tsx
// client/app/cafe/[slug]/layout.tsx

import { getCafeBySlug } from '@/lib/api';
import { CafeProvider } from '@/context/CafeContext';

export default async function CafeLayout({ 
  params, 
  children 
}: { 
  params: { slug: string }; 
  children: React.ReactNode 
}) {
  const cafe = await getCafeBySlug(params.slug);
  
  if (!cafe) {
    return <NotFound />;
  }
  
  // Generate CSS variables from theme
  const themeStyles = {
    '--primary-color': cafe.theme.primaryColor,
    '--secondary-color': cafe.theme.secondaryColor,
    '--accent-color': cafe.theme.accentColor,
    '--background-color': cafe.theme.backgroundColor,
    '--text-color': cafe.theme.textColor,
    '--font-family': cafe.theme.fontFamily,
    '--border-radius': cafe.theme.borderRadius,
  } as React.CSSProperties;
  
  return (
    <CafeProvider cafe={cafe}>
      <div 
        style={themeStyles}
        className={cafe.theme.darkMode ? 'dark' : ''}
      >
        <CafeHeader />
        <main>{children}</main>
        <CafeFooter />
      </div>
    </CafeProvider>
  );
}
```

### CSS Usage

```css
/* client/app/globals.css */

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  font-family: var(--font-family), sans-serif;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.card {
  background: var(--background-color);
  color: var(--text-color);
  border-radius: var(--border-radius);
}

.accent-text {
  color: var(--accent-color);
}
```

---

## Registration Flow

### Registration Form Fields

```typescript
interface CafeRegistrationForm {
  // Step 1: Business Info
  businessName: string;
  businessType: 'cafe' | 'restaurant' | 'bakery' | ...;
  tagline?: string;
  
  // Step 2: Owner Details
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  password: string;
  
  // Step 3: Location
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  
  // Step 4: Branding (Optional)
  logo?: File;
  primaryColor?: string;
  
  // Step 5: Features
  features: {
    dineIn: boolean;
    takeaway: boolean;
    delivery: boolean;
  };
}
```

### Registration API

```javascript
// server/routes/registration.js

router.post('/register', async (req, res) => {
  try {
    const { 
      businessName, 
      businessType, 
      ownerName, 
      ownerEmail, 
      ownerPhone,
      password,
      address,
      logo,
      features 
    } = req.body;
    
    // Generate unique slug
    let slug = slugify(businessName, { lower: true, strict: true });
    const existingCafe = await Cafe.findOne({ slug });
    if (existingCafe) {
      slug = `${slug}-${Date.now()}`;
    }
    
    // Create café
    const cafe = await Cafe.create({
      slug,
      name: businessName,
      businessType,
      logo,
      address,
      features,
      owner: {
        name: ownerName,
        email: ownerEmail,
        phone: ownerPhone
      },
      subscription: {
        plan: 'free',
        startedAt: new Date(),
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 day trial
      }
    });
    
    // Create admin user
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await User.create({
      cafeId: cafe._id,
      name: ownerName,
      email: ownerEmail,
      password: hashedPassword,
      role: 'owner'
    });
    
    // Create default categories
    const defaultCategories = ['Coffee', 'Tea', 'Snacks', 'Desserts'];
    await Category.insertMany(
      defaultCategories.map((name, i) => ({
        cafeId: cafe._id,
        name,
        displayOrder: i,
        isActive: true
      }))
    );
    
    // Create sample table
    await Table.create({
      cafeId: cafe._id,
      tableNumber: '1',
      capacity: 4
    });
    
    // Send welcome email (optional)
    // await sendWelcomeEmail(ownerEmail, { cafe, admin });
    
    res.status(201).json({
      success: true,
      cafe: {
        id: cafe._id,
        slug: cafe.slug,
        name: cafe.name
      },
      urls: {
        menu: `${process.env.BASE_URL}/cafe/${slug}`,
        admin: `${process.env.BASE_URL}/admin`
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## Next Steps & Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Create `Cafe` model
- [ ] Add `cafeId` to all existing models
- [ ] Create migration script for existing data
- [ ] Implement tenant resolver middleware
- [ ] Update all controllers to filter by `cafeId`

### Phase 2: Registration (Week 3)
- [ ] Build registration form UI
- [ ] Create registration API endpoint
- [ ] Email verification flow
- [ ] Welcome email with credentials

### Phase 3: Multi-Tenant Routing (Week 4)
- [ ] Update client routing to `/cafe/[slug]`
- [ ] Dynamic theme loading
- [ ] Café context provider
- [ ] Update all API calls to include slug

### Phase 4: Admin Isolation (Week 5)
- [ ] Update admin authentication
- [ ] Filter all admin views by `cafeId`
- [ ] Café settings page (branding, theme)
- [ ] QR code generation per café

### Phase 5: Polish (Week 6)
- [ ] Subscription/billing integration
- [ ] Super admin dashboard
- [ ] Analytics per café
- [ ] Documentation & testing

---

## Quick Reference

### Key Files to Create

```
server/
├── models/
│   └── Cafe.js           ← NEW
├── middleware/
│   └── tenantResolver.js ← NEW
├── routes/
│   └── registration.js   ← NEW
└── controllers/
    └── cafeController.js ← NEW

client/
├── app/
│   └── cafe/
│       └── [slug]/
│           ├── layout.tsx    ← NEW (theme provider)
│           ├── page.tsx      ← NEW (café home)
│           ├── menu/
│           │   └── page.tsx  ← MOVED from /menu
│           └── cart/
│               └── page.tsx  ← MOVED from /cart
└── context/
    └── CafeContext.tsx       ← NEW
```

### Key Files to Modify

```
server/
├── models/
│   ├── Product.js    ← Add cafeId
│   ├── Category.js   ← Add cafeId
│   ├── Order.js      ← Add cafeId
│   ├── Table.js      ← Add cafeId
│   └── User.js       ← Add cafeId + role
└── controllers/
    ├── productController.js  ← Filter by cafeId
    ├── categoryController.js ← Filter by cafeId
    ├── orderController.js    ← Filter by cafeId
    └── tableController.js    ← Filter by cafeId
```

---

## Questions to Consider

1. **Subdomains vs Paths?**
   - Path-based: `yourdomain.com/cafe/monkey-cafe` (Easier)
   - Subdomain: `monkey-cafe.yourdomain.com` (More branding)

2. **Pricing Model?**
   - Free tier: Limited tables/products
   - Paid tiers: More features, white-label, analytics

3. **Data Retention?**
   - How long to keep old orders?
   - Café deletion policy?

4. **Custom Domains?**
   - Allow cafés to use their own domain?
   - Requires DNS configuration

---

*Document created: January 19, 2026*
*Version: 1.0*
