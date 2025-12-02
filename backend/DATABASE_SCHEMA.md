# Database Schema Documentation

## Overview
This database schema implements a comprehensive Role-Based Access Control (RBAC) system for the Inlegal Store platform - a community-driven website where users share legal activities that surprisingly feel illegal.

## Schema Architecture

### 🔐 RBAC Implementation

The schema implements a four-tier role hierarchy:

1. **USER** - Regular users who can create posts, comment, and vote
2. **MODERATOR** - Can approve/reject posts and moderate content
3. **ADMIN** - Full moderation capabilities plus user management
4. **SUPER_ADMIN** - Complete system access and admin management

---

## Models

### 1. User Model
**Primary user table with RBAC support**

```prisma
model User {
  id            Int           @id @default(autoincrement())
  name          String
  email         String        @unique
  password      String?
  role          Role          @default(USER)
  
  // Profile info
  bio           String?       @db.Text
  profileImage  String?
  reputation    Int           @default(0)
  
  // Status flags
  isActive      Boolean       @default(true)
  isBanned      Boolean       @default(false)
  bannedReason  String?       @db.Text
  bannedAt      DateTime?
  bannedBy      Int?
  
  // Timestamps
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  lastLoginAt   DateTime?
}
```

**Key Features:**
- ✅ Unique email constraint for authentication
- ✅ Role-based access control
- ✅ User banning system with reason tracking
- ✅ Reputation system for gamification
- ✅ Profile customization (image, bio)
- ✅ Activity tracking (last login)

**Relationships:**
- One-to-Many: Posts, Comments, Votes, Orders
- One-to-One: Admin Profile (optional)
- One-to-Many: Audit Logs (for admin actions)
- Self-referential: Banned users tracking

---

### 2. Admin Model
**Extended profile for administrative users**

```prisma
model Admin {
  id              Int       @id @default(autoincrement())
  userId          Int       @unique
  department      String?
  permissions     String    @db.Text // JSON string
  canBanUsers     Boolean   @default(false)
  canDeletePosts  Boolean   @default(false)
  canApprovePosts Boolean   @default(true)
  canManageUsers  Boolean   @default(false)
}
```

**Key Features:**
- ✅ Granular permission system
- ✅ Department organization
- ✅ Custom permissions via JSON
- ✅ Specific action flags

---

### 3. Post Model
**Core content model for "inlegal" submissions**

```prisma
model Post {
  id              Int         @id @default(autoincrement())
  title           String
  description     String      @db.Text
  category        String?
  status          PostStatus  @default(PENDING)
  isLegal         Boolean     @default(true)
  upvotes         Int         @default(0)
  downvotes       Int         @default(0)
  viewCount       Int         @default(0)
  isFeatured      Boolean     @default(false)
  featuredAt      DateTime?
  approvedAt      DateTime?
  approvedBy      Int?
  rejectedAt      DateTime?
  rejectedBy      Int?
  rejectionReason String?     @db.Text
}
```

**Post Statuses:**
- `PENDING` - Awaiting moderation
- `APPROVED` - Published and visible
- `REJECTED` - Not approved for publication
- `FLAGGED` - Reported by users, needs review

---

### 4. Comment Model
**User discussions on posts**

```prisma
model Comment {
  id          Int       @id @default(autoincrement())
  content     String    @db.Text
  isDeleted   Boolean   @default(false)
  deletedAt   DateTime?
  deletedBy   Int?
  postId      Int
  userId      Int
}
```

**Key Features:**
- ✅ Soft delete functionality
- ✅ Deletion tracking (who deleted, when)
- ✅ Linked to posts and users

---

### 5. Vote Model
**Upvote/Downvote system**

```prisma
model Vote {
  id          Int       @id @default(autoincrement())
  isUpvote    Boolean   // true = upvote, false = downvote
  postId      Int
  userId      Int
  
  @@unique([postId, userId]) // One vote per user per post
}
```

---

### 6. Product Model
**E-commerce functionality**

```prisma
model Product {
  id          Int       @id @default(autoincrement())
  name        String
  description String?   @db.Text
  price       Int       // Stored in cents
  stock       Int       @default(0)
  isActive    Boolean   @default(true)
  imageUrl    String?
  category    String?
}
```

**Key Features:**
- ✅ Price in cents (avoid floating point issues)
- ✅ Stock management
- ✅ Active/inactive toggle
- ✅ Category organization

---

### 7. Order & OrderItem Models
**Order management system**

```prisma
model Order {
  id          Int         @id @default(autoincrement())
  status      OrderStatus @default(PENDING)
  total       Int         // Total in cents
  userId      Int
  items       OrderItem[]
}

model OrderItem {
  id          Int     @id @default(autoincrement())
  quantity    Int
  price       Int     // Snapshot price in cents
  orderId     Int
  productId   Int
}
```

**Order Statuses:**
- `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`, `REFUNDED`

---

### 8. AuditLog Model
**Track all admin actions for accountability**

```prisma
model AuditLog {
  id            Int         @id @default(autoincrement())
  action        ActionType
  targetType    String      // e.g., "Post", "User", "Comment"
  targetId      Int
  details       String?     @db.Text // JSON string
  ipAddress     String?
  userAgent     String?     @db.Text
  adminId       Int
}
```

**Action Types:**
- `CREATE`, `UPDATE`, `DELETE`
- `APPROVE`, `REJECT`, `FLAG`
- `BAN`, `UNBAN`

---

## Enums

### Role
```prisma
enum Role {
  USER
  MODERATOR
  ADMIN
  SUPER_ADMIN
}
```

### PostStatus
```prisma
enum PostStatus {
  PENDING
  APPROVED
  REJECTED
  FLAGGED
}
```

### OrderStatus
```prisma
enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}
```

### ActionType
```prisma
enum ActionType {
  CREATE
  UPDATE
  DELETE
  APPROVE
  REJECT
  FLAG
  BAN
  UNBAN
}
```

---

## Migration Commands

### Generate Migration
```bash
npx prisma migrate dev --name init_rbac_schema
```

### Apply Migration
```bash
npx prisma migrate deploy
```

### Generate Prisma Client
```bash
npx prisma generate
```

### Reset Database (Development Only)
```bash
npx prisma migrate reset
```
