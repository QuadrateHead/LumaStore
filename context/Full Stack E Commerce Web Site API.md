# 🛒 Full-Stack E-Commerce Platform — Complete Blueprint

---

## Part 1: Where Does the API Come From?

This is the most important decision. You have **no real backend**, but you need to practice TanStack Query mutations, caching, optimistic updates, etc. Here's the strategy:

---

### 🏆 Recommended: Hybrid API Approach

| Data Domain               | API Source                    | Why                                                                                             |
| ------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| **Products, Categories**  | **Real free API** (DummyJSON) | Real images, realistic data, pagination, filtering already works                                |
| **Cart**                  | **MSW** (Mock Service Worker) | Free APIs have terrible cart support. MSW lets you simulate add/remove/update with full control |
| **Auth (Login/Signup)**   | **MSW**                       | You control the JWT flow, error states, session logic                                           |
| **Checkout / Orders**     | **MSW**                       | Simulate payment success/failure, order creation                                                |
| **Admin (CRUD products)** | **MSW**                       | Full create/update/delete simulation                                                            |
| **Wishlist / Reviews**    | **MSW**                       | Simulate user-specific data                                                                     |

---

### What is each tool?

#### 1. **DummyJSON** (Real Free API — for Products)

- URL: `https://dummyjson.com`
- No API key needed
- Endpoints you'll actually use:

```text
GET  /products                    → all products (paginated)
GET  /products?limit=10&skip=20   → pagination
GET  /products/search?q=phone     → search
GET  /products/category/smartphones → filter by category
GET  /products/categories         → list all categories
GET  /products/1                  → single product
```

- Returns real product images, prices, ratings, descriptions
- **Limitation**: You can't actually create/update/delete products on their server. That's why you use MSW for admin.

#### 2. **MSW — Mock Service Worker** (for everything else)

- Runs in the browser, intercepts `fetch`/`axios` calls
- You write handlers that return fake JSON
- **Feels exactly like a real backend** to your React app
- Your TanStack Query code will be **100% production-ready** — when you later connect a real backend, you just change the URL

```text
// Example: Your app calls POST /api/cart/add
// MSW intercepts it and returns a fake success response
// Your React code doesn't know the difference
```

#### 3. **Why not just use one API for everything?**

| Approach      | Problem                                                                 |
|---------------|-------------------------------------------------------------------------|
| Only DummyJSON | Can't simulate cart mutations, auth, checkout. You'd have to fake everything in React state, which defeats the purpose of practicing TanStack Query mutations |
| Only MSW      | You'd have to manually write 100+ fake products with images. Tedious    |
| Only JSON Server | Works, but you have to seed the database yourself and manage a local server process |
| **Hybrid (DummyJSON + MSW)** | ✅ Best of both worlds |

---

### Setup Commands

```bash
npm install msw
npx msw init public/
```

You'll create files like:

```text
src/mocks/
  ├── handlers/
  │   ├── cart.ts
  │   ├── auth.ts
  │   ├── checkout.ts
  │   └── admin.ts
  ├── data/
  │   ├── db.ts        ← in-memory "database"
  │   └── users.ts
  └── browser.ts
```

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
| URL sync                 | **React Router**   | Sync filters to URL: `/products?category=phones&sort=price_asc`     |
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

→ **DummyJSON** (real API)

- `GET https://dummyjson.com/products?limit=12&skip=0`
- `GET https://dummyjson.com/products/search?q=laptop`
- `GET https://dummyjson.com/products/category/smartphones`

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
| 2.8 | **Persist Cart**     | Cart survives page refresh (localStorage)                                |
| 2.9 | **Empty Cart State** | Illustration + "Your cart is empty" + "Continue Shopping" button        |
| 2.10| **Optimistic Updates** | When adding/removing, UI updates immediately before server confirms  |

#### Tech Mapping

| Concern                  | Technology         | How                                                                 |
|--------------------------|--------------------|----------------------------------------------------------------------|
| Cart state (items, quantities) | **Zustand** | Primary store. Persisted with `zustand/middleware/persist` to localStorage |
| Add/Remove/Update mutations | **TanStack Query** | `useMutation` for each action. `onMutate` for optimistic updates |
| Cart total calculation   | **Zustand**        | Derived state via `get()` or a selector                              |
| Toast notifications      | **React**          | Simple toast component or `react-hot-toast`                          |
| Validation (quantity limits) | **Zod**       | `z.number().int().min(1).max(stock)`                                 |
| Cart drawer UI           | **AI Perfect Pixel** | Convert Figma sidebar design                                        |

#### Zustand Store Structure

```typescript
interface CartItem {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  maxStock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}
```

#### TanStack Query Mutation (Optimistic)

```typescript
const addToCartMutation = useMutation({
  mutationFn: (product: Product) => api.cart.add(product),
  onMutate: async (product) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['cart'] });
    // Snapshot previous value
    const previousCart = queryClient.getQueryData(['cart']);
    // Optimistically update
    queryClient.setQueryData(['cart'], (old: Cart) => ({
      ...old,
      items: [...old.items, { ...product, quantity: 1 }],
    }));
    return { previousCart };
  },
  onError: (_err, _product, context) => {
    // Rollback on error
    queryClient.setQueryData(['cart'], context?.previousCart);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  },
});
```

#### API Source

→ **MSW** (mocked)

```typescript
// src/mocks/handlers/cart.ts
import { http, HttpResponse } from 'msw';

let cart: CartItem[] = [];

export const cartHandlers = [
  http.get('/api/cart', () => {
    return HttpResponse.json({ items: cart, total: calculateTotal(cart) });
  }),

  http.post('/api/cart/add', async ({ request }) => {
    const body = await request.json();
    // add logic...
    return HttpResponse.json({ success: true, cart });
  }),

  http.delete('/api/cart/:productId', ({ params }) => {
    // remove logic...
    return HttpResponse.json({ success: true, cart });
  }),

  http.patch('/api/cart/:productId', async ({ params, request }) => {
    // update quantity logic...
    return HttpResponse.json({ success: true, cart });
  }),
];
```

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

→ **MSW** (mocked)

```typescript
// Checkout handler
http.post('/api/checkout', async ({ request }) => {
  const body = await request.json();

  // Simulate payment failure 10% of the time
  if (Math.random() < 0.1) {
    return HttpResponse.json(
      { error: 'Payment declined. Please try another card.' },
      { status: 402 }
    );
  }

  const orderId = `ORD-${Date.now()}`;
  return HttpResponse.json({
    success: true,
    orderId,
    estimatedDelivery: '2025-02-15',
  });
});

// Coupon handler
http.post('/api/coupon/validate', async ({ request }) => {
  const { code } = await request.json();
  if (code === 'SAVE10') {
    return HttpResponse.json({ valid: true, discount: 10, type: 'percent' });
  }
  return HttpResponse.json({ valid: false, error: 'Invalid coupon' }, { status: 400 });
});
```

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
| 4.6 | **Session Persistence** | Stay logged in after page refresh (localStorage token)              |
| 4.7 | **Logout**           | Clears auth state, redirects to home                                    |
| 4.8 | **Error States**     | Wrong password → "Invalid credentials". Email exists → "Email already registered" |
| 4.9 | **Loading States**   | Disable submit button + show spinner during API call                   |
| 4.10| **Role-Based Access**| Regular user vs. Admin. Admin sees dashboard link in nav               |

#### Tech Mapping

| Concern                  | Technology                | How                                                                 |
|--------------------------|---------------------------|----------------------------------------------------------------------|
| Auth state (user, token, role) | **Zustand** or **Redux Toolkit** | Global auth store                                      |
| Login/Signup mutations   | **TanStack Query**        | `useMutation` for POST /api/auth/login                                |
| Form validation          | **Zod** + **React Hook Form** | Login and signup schemas                                     |
| Protected routes         | **React Router**          | Custom `<ProtectedRoute>` wrapper component                          |
| Token storage            | **Zustand persist**       | Store JWT in localStorage                                             |
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

→ **MSW** (mocked)

```typescript
const users = [
  { id: 1, email: 'user@test.com', password: 'Password1', name: 'John', role: 'user' },
  { id: 2, email: 'admin@test.com', password: 'Admin123', name: 'Admin', role: 'admin' },
];

http.post('/api/auth/login', async ({ request }) => {
  const { email, password } = await request.json();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return HttpResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }

  return HttpResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token: 'fake-jwt-token-' + Date.now(),
  });
});
```

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
| Complex state (normalized products, orders) | **Redux Toolkit** | `createSlice` + `createEntityAdapter` (good place to practice) |
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

→ **MSW** (mocked)

```typescript
http.post('/api/admin/products', async ({ request }) => {
  const body = await request.json();
  const newProduct = { id: Date.now(), ...body };
  products.push(newProduct); // add to in-memory array
  return HttpResponse.json(newProduct, { status: 201 });
});

http.put('/api/admin/products/:id', async ({ params, request }) => {
  const body = await request.json();
  // update in-memory array...