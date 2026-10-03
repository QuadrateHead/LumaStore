# Architecture Context

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | React 18 + TypeScript | UI rendering and interaction logic |
| Build Tool | Vite | Local dev server, bundling, and production builds |
| Routing | React Router DOM | Client-side navigation across storefront and admin pages |
| State | Zustand | Cart, wishlist, UI state, checkout step tracking |
| Data Fetching | TanStack Query | Product, category, order, and admin data retrieval |
| Forms & Validation | React Hook Form + Zod | Checkout, login, register, review, and product forms |
| Styling | Tailwind CSS | Layout, spacing, components, responsive behavior |
| Icons | Lucide React | Buttons, status indicators, and utility icons |
| Data Layer | Mock API / MSW | Initial product, customer, and order data without a live backend |
| Deployment | Vite static build target | Frontend build for local and hosted environments |

## Architectural Goals

- Separate the shopping experience from the admin workflow.
- Keep customer-facing and admin-facing pages modular and easy to navigate.
- Use Zustand for client-side state that is shared globally across the app.
- Use TanStack Query for all server-like data access and async flows.
- Treat the API as a mock or future backend integration, not a hard-coded UI-only implementation.

## Invariants

- No real payment gateway or live checkout integration is allowed unless this file and `project-overview.md` are updated to explicitly include it.
- Product and order data should be modeled consistently and validated before UI rendering.
- Storefront pages should remain distinct from admin pages so access control and user roles stay clear.
- Shopping cart and wishlist state should remain globally accessible and persistent through browser storage if needed.

## Page Map

### Public Storefront

- `/` — Home page with hero, categories, new arrivals, and best sellers
- `/products` — Product catalog with filters and sorting
- `/products/:slug` — Product detail page
- `/categories/:slug` — Category-specific product listing
- `/search?q=...` — Dynamic search result page
- `/cart` — Full cart review page
- `/checkout` — Multi-step checkout flow
- `/checkout/success` — Order confirmation page
- `/login` — Customer sign-in
- `/register` — New account registration
- `/account` — Customer dashboard overview
- `/account/orders` — Order history
- `/account/orders/:id` — Order detail view
- `/wishlist` — Saved products list
- `/about` — Store story
- `/contact` — Contact page with form
- `/shipping-and-returns` — Shipping and return information

### Admin Dashboard

- `/admin` — Dashboard overview with KPIs and charts
- `/admin/products` — Product management list
- `/admin/products/new` — Create product
- `/admin/products/:id/edit` — Edit product
- `/admin/categories` — Category management
- `/admin/orders` — Order overview
- `/admin/orders/:id` — Single order management
- `/admin/customers` — Customer directory
- `/admin/reviews` — Review moderation
- `/admin/coupons` — Discount management
- `/admin/settings` — Store configuration

## Data Model Direction

The project should model key domain entities clearly:

- Product
- Category
- Variant
- User
- Address
- Cart item
- Order
- Coupon
- Review
- Admin setting

This helps keep form validation, query keys, and UI state consistent while the app grows.

## State Responsibilities

### Zustand

Use Zustand for:

- cart contents
- wishlist membership
- cart drawer visibility
- mobile nav state
- checkout progression state
- optional auth session persistence

### TanStack Query

Use TanStack Query for:

- featured and new arrivals products
- product catalog and category listings
- individual product details
- order history and account pages
- admin dashboards and management lists
- coupon validation and order submission

## Design and UX Principles

- The app should feel premium, minimal, and credible.
- The storefront needs clear conversion paths from categories to product detail to checkout.
- Admin workflows should be practical and data-dense, with strong visual hierarchy.
- All major flows should support visible loading, empty, error, and success states.

## Invariant Checklist

- Storefront and admin flows remain separate and clearly scoped.
- No real payment or backend secrets are introduced without explicit specification updates.
- All forms follow Zod validation rules.
- Product and order data is consistently shaped across list and detail views.
- UI states are implemented deliberately rather than as afterthoughts.
