# 🛒 Full-Stack E-Commerce Platform — Complete Blueprint

---

## Part 1: Backend Architecture

LumaStore uses a real local API instead of browser-side request mocking. The backend is a separate Node.js service backed by PostgreSQL and Prisma.

---

### Stack decisions

| Concern | Decision |
| --- | --- |
| API runtime | Node.js with Express and TypeScript |
| Database | PostgreSQL |
| ORM and migrations | Prisma (`schema.prisma`, generated client, Prisma Migrate) |
| Authentication | bcrypt password hashing + short-lived JWT access tokens + rotating refresh tokens |
| API client | TanStack Query calling the Express API over `/api` |
| Validation | Zod at the request boundary and shared domain schemas where practical |
| API contract | JSON REST endpoints with a consistent error envelope |
| Local development | Docker Compose PostgreSQL or a configured local PostgreSQL instance |
| Product data | PostgreSQL seed data; external product APIs are not runtime dependencies |

---

The API should be organized by feature rather than as one large router:

```text
server/
  src/
    app.ts                 # Express app and middleware
    server.ts              # process startup and graceful shutdown
    config/env.ts          # validated environment variables
    db/prisma.ts           # Prisma client lifecycle
    middleware/            # auth, roles, validation, errors, rate limits
    modules/               # auth, products, cart, checkout, orders, wishlist, reviews, coupons, admin
    lib/                   # JWT, password, pagination, logging helpers
  prisma/
    schema.prisma
    seed.ts
```

The Next.js app remains the frontend and calls the Express service through a configured API base URL. Prisma and database credentials must never be included in the browser bundle.

### Required security and operational decisions

- Hash passwords with bcrypt; never store or log plaintext passwords.
- Keep access tokens short-lived. Store refresh tokens in `HttpOnly`, `Secure`, `SameSite` cookies, persist only a hash or token identifier server-side, rotate them on refresh, and revoke them on logout or suspected reuse.
- Use HTTPS outside local development. Configure an explicit CORS allowlist, credentials policy, security headers, request-size limits, and rate limits for authentication, password reset, coupon validation, and checkout.
- If cookie authentication is used, protect state-changing requests with CSRF protection and validate the `Origin` header where appropriate.
- Authenticate protected routes and enforce roles and resource ownership in the API. Frontend guards are only a UX aid.
- Validate request bodies, params, query strings, and image URLs. Use parameterized Prisma queries and never interpolate raw SQL from user input.
- Return generic authentication errors, add progressive delays or lockout for repeated failures, and avoid account enumeration.
- Add structured request logging with request IDs, redacting authorization headers, cookies, passwords, CVV, and other sensitive data.
- Use transactions for checkout, stock decrement, order creation, coupon use, and refresh-token rotation. Enforce stock server-side and make order placement idempotent with a client-provided idempotency key.
- Use Prisma migrations and a deterministic seed script. Define backups, restore testing, and a production migration strategy before deployment.

### Setup commands

```bash
npm install express cors helmet cookie-parser express-rate-limit bcrypt jsonwebtoken zod @prisma/client
npm install -D prisma tsx @types/express @types/cookie-parser @types/bcrypt @types/jsonwebtoken
npx prisma init
npx prisma migrate dev --name init
npx prisma db seed
```

Project scripts should expose `dev`, `build`, `start`, `prisma:generate`, `prisma:migrate`, and `prisma:seed`. Keep secrets in environment variables such as `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `CLIENT_ORIGIN`, and token lifetimes; commit only `.env.example`.

### API response and error contract

Successful responses should use predictable resource shapes and pagination metadata. Errors should use one envelope:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request is invalid.",
    "fields": { "email": "Enter a valid email address." },
    "requestId": "req_123"
  }
}
```

Use `400` for validation, `401` unauthenticated, `403` forbidden, `404` missing resources, `409` conflicts, `422` business-rule failures, and `429` rate limits. Add final Express error middleware and never expose stack traces in production.

---

## Part 2: Complete Feature Breakdown

---

### Feature 1: Product Catalog

#### Functionality List

| #   | Feature              | Details                                                                 |
|-----|----------------------|-------------------------------------------------------------------------|
| 1.1 | **Product Grid**     | Display products in a responsive grid (2 cols mobile, 3 tablet, 4 desktop). Each card shows: image, title, price, rating stars, "Add to Cart" button |
| 1.2 | **Product Detail Page** | Click a card → full page with: image gallery (thumbnails), title, price, description, stock status, category, rating, reviews count, quantity selector, "Add to Cart" |
| 1.3 | **Search**           | Search bar in header. Debounced input (300ms). Searches by product title. Shows "No results" state |
| 1.4 | **Category Filter**  | Sidebar or dropdown. Fetch categories from API. Clicking a category filters the grid. "All" resets |
| 1.5 | **Price Range Filter** | Min/Max price inputs. Filters products client-side after fetching     |
| 1.6 | **Sort**             | Dropdown: Price Low→High, Price High→Low, Rating, Newest                |
| 1.7 | **Pagination**       | "Load More" button or page numbers. Uses `skip` and `limit` query params |
| 1.8 | **Loading Skeleton** | Show skeleton cards while fetching                                      |
| 1.9 | **Error State**      | If API fails, show retry button                                         |
| 1.10| **Empty State**      | If filters return 0 results, show illustration + "Clear filters"        |

#### Tech Mapping

| Concern                  | Technology         | How                                                                 |
|--------------------------|--------------------|----------------------------------------------------------------------|
| Fetching products        | **TanStack Query** | `useQuery({ queryKey: ['products', filters], queryFn: ... })`       |
| Search debouncing        | **React**          | `useEffect` + `setTimeout` or a custom `useDebounce` hook           |
| Filter/sort state        | **Zustand**        | Store: `{ category, minPrice, maxPrice, sortBy, searchQuery }`      |
| URL sync                 | **Next.js App Router** | Sync filters to URL: `/products?category=phones&sort=price_asc` |
| Form validation (price inputs) | **Zod**     | `z.object({ min: z.number().min(0), max: z.number().min(0) }).refine(d => d.min <= d.max)` |
| UI Components            | **AI Perfect Pixel** | Convert Figma product card, grid, sidebar to pixel-perfect React   |

#### TanStack Query Example

```typescript
// Query key changes when filters change → auto-refetch
const { data, isLoading, error } = useQuery({
  queryKey: ['products', category, search, sort, page],
  queryFn: () => fetchProducts({ category, search, sort, page }),
  staleTime: 5 * 60 * 1000, // products don't change often
});
```

#### Zod Schema

```typescript
const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number().positive(),
  discountPercentage: z.number().min(0).max(100),
  rating: z.number().min(0).max(5),
  stock: z.number().int().min(0),
  brand: z.string().optional(),
  category: z.string(),
  thumbnail: z.string().url(),
  images: z.array(z.string().url()),
});
```

#### API Source

→ **Express + Prisma**

- `GET /api/products?limit=12&offset=0`
- `GET /api/products?search=laptop`
- `GET /api/products?category=smartphones`
- `GET /api/products/:slug`

---

### Feature 2: Shopping Cart

#### Functionality List

| #   | Feature              | Details                                                                 |
|-----|----------------------|-------------------------------------------------------------------------|
| 2.1 | **Add to Cart**      | Click "Add to Cart" on product card or detail page. If already in cart, increment quantity. Show toast notification |
| 2.2 | **Cart Drawer/Sidebar** | Slide-in panel from right. Shows all cart items. Can be opened from header icon |
| 2.3 | **Cart Item Display** | Each item: thumbnail, title, price, quantity controls (+/−), remove button, line total |
| 2.4 | **Quantity Update**  | +/− buttons. Cannot go below 1. Cannot exceed stock. Updates line total and cart total instantly |
| 2.5 | **Remove Item**      | Trash/delete button. Removes item. Shows confirmation or just removes with undo toast |
| 2.6 | **Cart Summary**     | Subtotal, shipping estimate, discount (if coupon), total. Updates in real-time |
| 2.7 | **Cart Badge**       | Header cart icon shows item count badge (e.g., "3")                     |
| 2.8 | **Persist Cart**     | Authenticated cart survives page refresh through the API; guest cart may use localStorage until sign-in |
| 2.9 | **Empty Cart State** | Illustration + "Your cart is empty" + "Continue Shopping" button        |
| 2.10| **Optimistic Updates** | When adding/removing, UI updates immediately before server confirms  |

#### Tech Mapping

| Concern                  | Technology         | How                                                                 |
|--------------------------|--------------------|----------------------------------------------------------------------|
| Cart state (items, quantities) | **Zustand + TanStack Query** | Zustand handles immediate UI state; the Express API persists authenticated carts |
| Add/Remove/Update mutations | **TanStack Query** | `useMutation` for each action. `onMutate` for optimistic updates |
| Cart total calculation   | **Zustand**        | Derived state via `get()` or a selector                              |
| Toast notifications      | **React**          | Simple toast component or `react-hot-toast`                          |
| Validation (quantity limits) | **Zod**       | `z.number().int().min(1).max(stock)`                                 |
| Cart drawer UI           | **AI Perfect Pixel** | Convert Figma sidebar design                                        |

#### Zustand Store Structure

```typescript
interface CartItem {
  variantId: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  maxStock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}
```

#### TanStack Query Mutation (Optimistic)

```typescript
const addToCartMutation = useMutation({
  mutationFn: (item: CartItem) =>
    api.cart.add({ variantId: item.variantId, quantity: item.quantity }),
  onMutate: async (item) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['cart'] });
    // Snapshot previous value
    const previousCart = queryClient.getQueryData(['cart']);
    // Optimistically update
    queryClient.setQueryData(['cart'], (old: Cart) => ({
      ...old,
      items: [...old.items, item],
    }));
    return { previousCart };
  },
  onError: (_err, _item, context) => {
    // Rollback on error
    queryClient.setQueryData(['cart'], context?.previousCart);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  },
});
```

#### API Source

→ **Express + Prisma**, authenticated for customer carts

```text
GET    /api/cart
POST   /api/cart/items              body: { variantId, quantity }
PATCH  /api/cart/items/:variantId   body: { quantity }
DELETE /api/cart/items/:variantId
```

The service derives prices and totals from current server data, validates stock, and scopes every cart query to the authenticated user. The client may update optimistically, but the server response is authoritative.

---

### Feature 3: Checkout Flow

#### Functionality List

| #   | Feature              | Details                                                                 |
|-----|----------------------|-------------------------------------------------------------------------|
| 3.1 | **Multi-Step Form**  | 3 steps: ① Shipping Info → ② Payment → ③ Review & Confirm. Progress indicator at top |
| 3.2 | **Step Navigation**  | "Next" / "Back" buttons. Cannot skip steps. Can go back to edit         |
| 3.3 | **Shipping Form**    | Fields: Full Name, Email, Phone, Address, City, State, Zip Code, Country |
| 3.4 | **Payment Form**     | Card Number, Expiry (MM/YY), CVV, Cardholder Name. Visual card preview that updates as you type |
| 3.5 | **Order Review**     | Summary of all items, shipping address, payment method (masked card), totals |
| 3.6 | **Form Validation**  | Real-time validation on blur. Show inline errors. Disable "Next" until step is valid |
| 3.7 | **Coupon Code**      | Input field + "Apply" button. Validates code. Shows discount or error message |
| 3.8 | **Place Order**      | "Place Order" button. Shows loading spinner. On success → Order Confirmation page |
| 3.9 | **Order Confirmation** | Order number, estimated delivery, items summary. "Continue Shopping" button |
| 3.10| **Error Handling**   | Payment declined → show error, stay on payment step. Network error → retry |

#### Tech Mapping

| Concern                  | Technology                | How                                                                 |
|--------------------------|---------------------------|----------------------------------------------------------------------|
| Form state               | **React Hook Form**       | Manages all form fields, dirty state, touched state                 |
| Validation schemas       | **Zod**                   | One schema per step, composed into a full checkout schema           |
| Form ↔ Zod integration   | **@hookform/resolvers/zod** | Connects Zod schemas to React Hook Form                            |
| Current step state       | **Zustand**               | `checkoutStep: 1 | 2 | 3`                                           |
| Order submission         | **TanStack Query**        | `useMutation` for `POST /api/checkout`                              |
| Coupon validation        | **TanStack Query**        | `useMutation` for `POST /api/coupon/validate`                       |
| UI (stepper, forms, card preview) | **AI Perfect Pixel** | Convert Figma checkout flow                                        |

#### Zod Schemas

```typescript
const shippingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[\d\s-]{7,15}$/, "Invalid phone number"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  country: z.string().min(2),
});

const paymentSchema = z.object({
  cardNumber: z.string()
    .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Must be 16 digits")
    .transform(v => v.replace(/\s/g, '')),
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Must be MM/YY"),
  cvv: z.string().regex(/^\d{3,4}$/, "Must be 3 or 4 digits"),
  cardholderName: z.string().min(2),
});

const checkoutSchema = z.object({
  shipping: shippingSchema,
  payment: paymentSchema,
});
```

#### API Source

→ **Express + Prisma**

```text
POST /api/coupons/validate  body: { code, cartItems }
POST /api/orders            header: Idempotency-Key: <unique-key>
GET  /api/orders/:id
```

The order endpoint recalculates prices, discounts, shipping, tax, and stock on the server. It creates the order and decrements inventory in one Prisma transaction. Card data must be handled by a payment provider later; the API accepts only a provider token or test payment method, never raw card number, expiry, or CVV.

---

### Feature 4: User Authentication

#### Functionality List

| #   | Feature              | Details                                                                 |
|-----|----------------------|-------------------------------------------------------------------------|
| 4.1 | **Login Page**       | Email + Password fields. "Forgot password?" link. "Sign up" link       |
| 4.2 | **Signup Page**      | Full Name, Email, Password, Confirm Password. Password strength indicator |
| 4.3 | **Form Validation**  | Email format, password min 8 chars, passwords match. Real-time inline errors |
| 4.4 | **Auth State**       | Track: is user logged in? User profile data (name, email, avatar, role) |
| 4.5 | **Protected Routes** | Checkout, Admin, Profile pages redirect to login if not authenticated  |
| 4.6 | **Session Persistence** | Stay logged in after page refresh through a rotating HttpOnly refresh cookie |
| 4.7 | **Logout**           | Clears auth state, redirects to home                                    |
| 4.8 | **Error States**     | Wrong password → "Invalid credentials". Email exists → "Email already registered" |
| 4.9 | **Loading States**   | Disable submit button + show spinner during API call                   |
| 4.10| **Role-Based Access**| Regular user vs. Admin. Admin sees dashboard link in nav               |

#### Tech Mapping

| Concern                  | Technology                | How                                                                 |
|--------------------------|---------------------------|----------------------------------------------------------------------|
| Auth state (user, token, role) | **Zustand** | Global user/session UI state; refresh is handled by the API cookie |
| Login/Signup mutations   | **TanStack Query**        | `useMutation` for POST /api/auth/login                                |
| Form validation          | **Zod** + **React Hook Form** | Login and signup schemas                                     |
| Protected routes         | **Next.js App Router**    | Server/API authorization plus client navigation guards for UX          |
| Token storage            | **HttpOnly refresh cookie** | Keep access token in memory where possible; never persist tokens in localStorage |
| UI                       | **AI Perfect Pixel**      | Login/signup page designs                                             |

#### Zustand Auth Store

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}
```

#### Zod Schemas

```typescript
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  password: z.string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
```

#### API Source

→ **Express + Prisma + bcrypt + JWT**

```text
POST /api/auth/register
POST /api/auth/login       → access token response + HttpOnly refresh cookie
POST /api/auth/refresh     → rotate refresh token and issue new access token
POST /api/auth/logout      → revoke refresh token and clear cookie
GET  /api/auth/me
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

The server normalizes the email, compares the password with `bcrypt.compare`, signs JWTs with separate secrets and claims (`sub`, `role`, `jti`, `iat`, `exp`), and never returns the password hash. Refresh-token records must be revocable and tied to a user/session/device. Password reset tokens must be single-use, short-lived, hashed at rest, and delivered through an email provider when that feature becomes real.

---

### Feature 5: Admin Dashboard

#### Functionality List

| #   | Feature              | Details                                                                 |
|-----|----------------------|-------------------------------------------------------------------------|
| 5.1 | **Dashboard Overview** | Stats cards: Total Products, Total Orders, Revenue, Low Stock Items. Simple bar chart for recent orders |
| 5.2 | **Product List Table** | Table with columns: Image, Name, Category, Price, Stock, Status, Actions (Edit/Delete). Sortable columns |
| 5.3 | **Add Product**      | Modal or separate page. Form: Title, Description, Price, Discount, Category, Stock, Brand, Images (URL inputs) |
| 5.4 | **Edit Product**     | Pre-filled form with existing data. Same validation as Add              |
| 5.5 | **Delete Product**   | Confirmation dialog. "Are you sure?" → Delete → Remove from table       |
| 5.6 | **Order List**       | Table: Order ID, Customer, Date, Total, Status (Pending/Shipped/Delivered). Filter by status |
| 5.7 | **Order Status Update** | Dropdown to change status. Updates immediately (optimistic)          |
| 5.8 | **Search Products**  | Search bar above the table. Filters table rows                          |
| 5.9 | **Pagination**       | Table pagination (10/25/50 rows per page)                               |
| 5.10| **Access Control**   | Only visible to users with `role: 'admin'`. Regular users get 403 page  |

#### Tech Mapping

| Concern                  | Technology                | How                                                                 |
|--------------------------|---------------------------|----------------------------------------------------------------------|
| Dashboard stats          | **TanStack Query**        | Fetch aggregated data                                                 |
| Product CRUD             | **TanStack Query**        | `useMutation` for create/update/delete                                |
| Product table state (sort, page, search) | **Zustand** | Table filter state                                      |
| Form validation (Add/Edit) | **Zod** + **React Hook Form** | Product schema                                           |
| Complex server state (products, orders) | **TanStack Query** | Cache and invalidate server resources; do not duplicate database state in Redux |
| Confirmation dialogs     | **React**                 | Custom modal component                                                |
| UI                       | **AI Perfect Pixel**      | Dashboard layout, tables, modals                                      |

#### Zod Schema (Admin Product Form)

```typescript
const adminProductSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(2000),
  price: z.number().positive("Price must be greater than 0"),
  discountPercentage: z.number().min(0).max(100).optional().default(0),
  category: z.string().min(1, "Category is required"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  brand: z.string().optional(),
  images: z.array(z.string().url("Must be a valid URL")).min(1, "At least one image"),
});
```

#### API Source

→ **Express + Prisma**, protected by JWT authentication and an admin role middleware

```text
GET    /api/admin/dashboard
POST   /api/admin/products
PATCH  /api/admin/products/:id
DELETE /api/admin/products/:id
PATCH  /api/admin/orders/:id/status
GET    /api/admin/customers
PATCH  /api/admin/reviews/:id/moderation
```

Admin mutations must validate input, record `createdBy`/audit information where relevant, use soft deletion for products referenced by historical orders, and return the updated resource. Destructive actions require confirmation in the UI and authorization in the API.
