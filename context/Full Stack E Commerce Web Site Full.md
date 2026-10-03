# Full Website Explanation: **LumaStore — Premium Tech & Lifestyle E-Commerce Platform**

---
## 1. Main Project Idea

**LumaStore** is a modern full-stack e-commerce website for selling premium tech products and lifestyle accessories.

The store sells products such as:

- Wireless headphones
- Keyboards and mice
- Smart watches
- Desk lamps
- Backpacks
- Phone accessories
- Monitors
- Smart home devices
- Office setup products

The main goal of the project is to build a realistic online store where users can browse products, filter/search items, add products to cart, complete checkout, manage their account, and where admins can manage products, orders, users, coupons, and store content.

This project is perfect for practicing:

- **React + TypeScript** for building scalable UI
- **TanStack Query** for API data fetching and mutations
- **Zustand or Redux Toolkit** for client-side state
- **Zod** for form and API validation
- **AI Perfect Pixel / Figma-to-code** for translating designs into accurate UI
- Admin dashboard design and complex data management

---

## 2. Main User Roles

### 1. Guest User

A guest user can:

- Visit the homepage
- Browse products
- Search and filter products
- View product details
- Add products to cart
- Add products to wishlist locally
- Start checkout
- Register or log in

Guest users should be able to explore the store without being forced to create an account immediately.

---

### 2. Registered Customer

A registered customer can:

- Log in and log out
- Save personal details
- Save addresses
- Place orders
- View order history
- Track order status
- Save wishlist items
- Write product reviews
- Reorder previous purchases

---

### 3. Admin User

An admin can:

- Access the admin dashboard
- Create, edit, and delete products
- Manage categories
- Manage orders
- Change order statuses
- Manage users
- Moderate reviews
- Create discounts and coupons
- View sales analytics
- Manage store settings

---

## 3. Website Structure

The website should have two main parts:

### Public Storefront

This is what normal users see.

Example routes:

```text
/
/products
/products/:slug
/categories/:slug
/cart
/checkout
/checkout/success
/login
/register
/account
/account/orders
/account/orders/:id
/wishlist
/about
/contact
/shipping-and-returns
```

---

### Admin Dashboard

This is only available for admin users.

Example routes:

```text
/admin
/admin/products
/admin/products/new
/admin/products/:id/edit
/admin/categories
/admin/orders
/admin/orders/:id
/admin/customers
/admin/reviews
/admin/coupons
/admin/settings
```

---

## 4. Public Website Pages

---

### 4.1 Homepage

#### Purpose

The homepage should introduce the store, promote featured products, and guide users toward shopping.

#### Main Content

##### 1. Header

The header should appear on most pages.

It contains:

- Logo
- Navigation links
- Search bar
- Categories dropdown
- Wishlist icon
- Cart icon with quantity badge
- Login/Profile button
- Mobile menu button

Example navigation:

```text
Home | New Arrivals | Best Sellers | Categories | Deals
```

---

##### 2. Hero Section

Large attractive section at the top.

Example content:

```text
Upgrade Your Everyday Tech
Premium gadgets, accessories, and workspace essentials for modern life.

[Shop New Arrivals] [Explore Deals]
```

Hero design ideas:

- Large product image
- Gradient background
- CTA buttons
- Featured product card
- Discount badge like “Up to 30% off”

---

##### 3. Featured Categories

Show several category cards.

Example categories:

- Audio
- Keyboards
- Smart Watches
- Desk Setup
- Bags
- Phone Accessories

Each category card should include:

- Category image
- Category name
- Number of products
- Link to category page

---

##### 4. New Arrivals

A horizontal or grid product section.

Each product card contains:

- Product image
- Product name
- Brand
- Price
- Rating
- Wishlist button
- Add to cart button

---

##### 5. Best Sellers

Products with high sales or high ratings.

This section helps users quickly find popular products.

---

##### 6. Promotional Banner

Example:

```text
Summer Desk Setup Sale
Save up to 25% on monitors, lamps, keyboards and more.

[Shop the Sale]
```

---

##### 7. Store Benefits Section

Show trust-building features:

- Free shipping over $100
- 30-day returns
- Secure checkout
- 24/7 customer support

---

##### 8. Customer Reviews Preview

Show a few short testimonials.

Example:

```text
“Fast delivery and amazing quality. My desk setup looks completely different now.”
```

---

##### 9. Newsletter Section

Allow users to enter email for updates.

Use Zod validation for the email field.

---

#### Functionality

The homepage should fetch:

- Featured products
- New arrivals
- Best sellers
- Categories
- Promotional banners

Using TanStack Query:

```text
GET /products/featured
GET /products/new
GET /products/best-sellers
GET /categories
```

---

### 4.2 Product Catalog Page

Route:

```text
/products
```

#### Purpose

This is the main shopping page where users browse all products.

#### Main Content

##### 1. Breadcrumbs

Example:

```text
Home / Products
```

---

##### 2. Page Title

Example:

```text
All Products
```

Also show the number of products:

```text
128 products found
```

---

##### 3. Filters Sidebar

Filters can include:

###### Category Filter

Example:

- Audio
- Keyboards
- Monitors
- Smart Watches
- Bags
- Accessories

###### Price Filter

Example:

```text
$0 — $50
$50 — $100
$100 — $250
$250+
```

Or use a price range slider.

###### Brand Filter

Example:

- Apple
- Logitech
- Sony
- Samsung
- Keychron
- Anker

###### Rating Filter

Example:

- 4 stars and up
- 3 stars and up

###### Availability Filter

- In stock
- Out of stock

###### Color Filter

Example:

- Black
- White
- Silver
- Blue
- Green

---

##### 4. Sorting Dropdown

Sorting options:

- Newest
- Price: Low to High
- Price: High to Low
- Best Rated
- Best Sellers
- Biggest Discount

---

##### 5. Product Grid

Display products as cards.

Product card content:

- Product image
- Sale badge if discounted
- Product title
- Brand
- Short description
- Price
- Old price if discounted
- Rating
- Number of reviews
- Wishlist button
- Add to cart button

---

##### 6. Pagination or Infinite Scroll

You can choose either:

###### Pagination

```text
Page 1, 2, 3, 4...
```

or

###### Load More Button

```text
[Load More Products]
```

or

###### Infinite Scroll

Automatically load more products when the user scrolls.

---

#### Functionality

The page should support:

- Search
- Filtering
- Sorting
- Pagination
- Add to cart
- Add to wishlist
- URL query params

Example URL:

```text
/products?category=audio&brand=sony&minPrice=50&maxPrice=300&sort=price-asc&page=2
```

This is good practice because users can refresh the page and keep the same filters.

---

### 4.3 Category Page

Route:

```text
/categories/:slug
```

Example:

```text
/categories/audio
/categories/keyboards
/categories/desk-setup
```

#### Purpose

Show products from one specific category.

#### Main Content

- Category title
- Category description
- Category banner image
- Product filters
- Product sorting
- Product grid

Example category page title:

```text
Audio Products
Wireless headphones, speakers, microphones, and sound accessories.
```

#### Functionality

Very similar to the product catalog page, but the category is already preselected.

---

### 4.4 Search Results Page

Route:

```text
/search?q=headphones
```

#### Purpose

Show products that match the user’s search query.

#### Main Content

Example:

```text
Search results for “headphones”
24 products found
```

The page should contain:

- Search input
- Product results
- Filters
- Sorting
- Empty state if nothing found

#### Empty State Example

```text
No products found for “gaming chair”.

Try searching for:
- chair
- desk
- ergonomic
```

#### Functionality

Useful details:

- Debounced search
- Recent searches
- Popular searches
- Search suggestions
- Highlight matching text if you want an advanced feature

---

### 4.5 Product Detail Page

Route:

```text
/products/:slug
```

Example:

```text
/products/sony-wh1000xm5-headphones
```

#### Purpose

This page gives complete information about one product and encourages the user to buy.

---

#### Main Content

##### 1. Breadcrumbs

Example:

```text
Home / Audio / Sony WH-1000XM5
```

---

##### 2. Product Image Gallery

Include:

- Main product image
- Thumbnail images
- Hover zoom
- Optional full-screen preview

---

##### 3. Product Information

Show:

- Product name
- Brand
- Rating
- Number of reviews
- Price
- Old price if discounted
- Discount badge
- Short description
- Stock status

Example:

```text
Sony WH-1000XM5 Wireless Headphones

$349.00
$399.00

In stock — 14 available
```

---

##### 4. Product Variants

Depending on product type, variants may include:

- Color
- Size
- Storage
- Connectivity type
- Bundle options

Example:

```text
Color: Black / Silver / Blue
```

The user must select a valid variant before adding the product to cart.

---

##### 5. Quantity Selector

Allow the user to choose quantity.

Rules:

- Minimum: 1
- Maximum: available stock
- Disable plus button if max stock reached

---

##### 6. Main Actions

Buttons:

```text
[Add to Cart]
[Buy Now]
[Add to Wishlist]
```

---

##### 7. Delivery Information

Example:

```text
Free shipping available
Estimated delivery: 2–4 business days
30-day return policy
```

You can add a postal code checker as an advanced feature.

---

##### 8. Product Tabs

Tabs can include:

###### Description

Full product description.

###### Specifications

Example:

```text
Battery life: 30 hours
Weight: 250g
Bluetooth: 5.2
Noise cancellation: Yes
Warranty: 2 years
```

###### Reviews

Show user reviews.

Each review contains:

- User name
- Rating
- Review text
- Date
- Verified purchase badge

###### FAQ

Example:

```text
Does this product support fast charging?
Is it compatible with iPhone?
What is included in the box?
```

---

##### 9. Related Products

Example section:

```text
You may also like
```

Show products from the same category or same brand.

---

#### Functionality

The product detail page should support:

- Fetch product by slug
- Select variants
- Validate quantity
- Add to cart
- Add to wishlist
- Submit review
- Fetch related products
- Show loading skeleton
- Show 404 if product does not exist

---

### 4.6 Cart Drawer

The cart drawer is a small side panel that opens when the user clicks the cart icon.

#### Purpose

Allow users to quickly check their cart without leaving the current page.

#### Main Content

The cart drawer contains:

- Product image
- Product title
- Selected variant
- Price
- Quantity controls
- Remove button
- Subtotal
- View Cart button
- Checkout button

#### Empty Cart State

Example:

```text
Your cart is empty.
Start adding products you love.

[Continue Shopping]
```

#### Functionality

Users can:

- Increase quantity
- Decrease quantity
- Remove item
- Go to cart page
- Go to checkout

This state should be managed with **Zustand** because the cart is client-side UI state that needs to be available globally.

---

### 4.7 Cart Page

Route:

```text
/cart
```

#### Purpose

The full cart page allows users to review everything before checkout.

---

#### Main Content

##### 1. Cart Items List

Each cart item includes:

- Product image
- Product name
- Variant
- Unit price
- Quantity selector
- Total item price
- Remove button

---

##### 2. Coupon Code Box

Input:

```text
Enter coupon code
```

Button:

```text
Apply
```

Example valid coupons:

```text
WELCOME10
SUMMER20
FREESHIP
```

Use TanStack Query mutation to validate coupons.

---

##### 3. Order Summary

Show:

```text
Subtotal: $349.00
Discount: -$34.90
Shipping: $0.00
Tax: $27.92
Total: $342.02
```

---

##### 4. Recommended Add-ons

Example:

```text
Complete your setup
```

Show related smaller products like cables, cases, chargers.

---

#### Functionality

Users can:

- Update quantities
- Remove products
- Apply coupon
- See recalculated total
- Go to checkout
- Continue shopping

---

### 4.8 Checkout Page

Route:

```text
/checkout
```

#### Purpose

Collect shipping, delivery, payment, and order confirmation details.

The checkout should be a multi-step process.

---

#### Checkout Steps

```text
1. Shipping Information
2. Delivery Method
3. Payment
4. Review Order
5. Confirmation
```

---

#### Step 1: Shipping Information

Fields:

- Full name
- Email
- Phone number
- Country
- City
- Address line 1
- Address line 2
- Postal code

Use **React Hook Form + Zod** validation.

Example validation:

- Email must be valid
- Phone number is required
- Postal code is required
- Full name minimum 2 characters
- Address minimum 5 characters

---

#### Step 2: Delivery Method

Options:

```text
Standard Delivery — Free — 3–5 business days
Express Delivery — $14.99 — 1–2 business days
Pickup Point — $4.99 — 2–3 business days
```

When the user selects a delivery method, the total price updates.

---

#### Step 3: Payment

For your project, payment can be mocked.

Fields:

- Cardholder name
- Card number
- Expiry date
- CVC

Use Zod validation.

Important: do not store real card data.

For a real integration later, use Stripe test mode.

---

#### Step 4: Review Order

Show:

- Products
- Quantities
- Shipping address
- Delivery method
- Payment method summary
- Coupon discount
- Tax
- Final total

Button:

```text
[Place Order]
```

This should call:

```text
POST /orders
```

---

#### Step 5: Order Confirmation

Route:

```text
/checkout/success
```

Show:

```text
Thank you for your order!

Order number: LUMA-10482
Estimated delivery: March 18–20
```

Buttons:

```text
[View Order]
[Continue Shopping]
```

After successful order:

- Clear cart
- Save order in order history
- Show confirmation page

---

### 4.9 Login Page

Route:

```text
/login
```

#### Purpose

Allow users to sign in.

#### Main Content

Fields:

- Email
- Password

Actions:

```text
[Login]
[Continue with Google] optional
[Forgot password?]
[Create account]
```

#### Functionality

Use:

```text
POST /auth/login
```

After login:

- Save token/user data
- Redirect to previous page or account page
- If user is admin, allow access to `/admin`

Use Zod for form validation.

---

### 4.10 Register Page

Route:

```text
/register
```

#### Purpose

Allow users to create an account.

#### Main Content

Fields:

- Full name
- Email
- Password
- Confirm password
- Accept terms checkbox

Validation:

- Valid email
- Password minimum length
- Password and confirm password must match
- Terms must be accepted

Use:

```text
POST /auth/register
```

---

### 4.11 Account Dashboard

Route:

```text
/account
```

#### Purpose

Allow logged-in customers to manage their personal information.

---

#### Account Sections

##### 1. Account Overview

Show:

- User name
- Email
- Total orders
- Wishlist count
- Recent order

---

##### 2. Profile Settings

User can update:

- Full name
- Email
- Phone number
- Password

---

##### 3. Addresses

User can:

- Add address
- Edit address
- Delete address
- Set default shipping address

---

##### 4. Order History

Route:

```text
/account/orders
```

Show a table/list:

```text
Order #LUMA-10482
Date: March 12, 2026
Status: Shipped
Total: $342.02
```

Actions:

```text
[View Details]
[Reorder]
```

---

##### 5. Order Details

Route:

```text
/account/orders/:id
```

Show:

- Order status timeline
- Ordered products
- Shipping address
- Payment method summary
- Total amount
- Tracking number if shipped

Example statuses:

```text
Pending → Paid → Processing → Shipped → Delivered
```

---

##### 6. Wishlist

Route:

```text
/wishlist
```

Show saved products.

Users can:

- Remove from wishlist
- Move to cart
- Open product page

---

### 4.12 Static Information Pages

These pages make the store feel realistic.

#### About Page

Route:

```text
/about
```

Content:

- Store story
- Mission
- Product quality promise
- Team section

---

#### Contact Page

Route:

```text
/contact
```

Content:

- Contact form
- Email
- Phone
- Address
- FAQ links

Contact form fields:

- Name
- Email
- Subject
- Message

Use Zod validation.

---

#### Shipping and Returns Page

Route:

```text
/shipping-and-returns
```

Content:

- Shipping options
- Return policy
- Refund rules
- Damaged product instructions

---

#### FAQ Page

Common questions:

- How long does delivery take?
- Can I return a product?
- How do coupons work?
- How can I track my order?
- What payment methods are accepted?

---

## 5. Admin Dashboard

The admin dashboard should feel like a separate application inside your project.

It should have:

- Sidebar navigation
- Top bar
- Admin profile menu
- Search
- Notifications
- Tables
- Forms
- Charts
- Status badges
- Confirmation modals

---

### 5.1 Admin Dashboard Home

Route:

```text
/admin
```

#### Purpose

Give the admin a quick overview of store performance.

#### Main Content

##### KPI Cards

Show:

```text
Total Revenue
Total Orders
Total Customers
Products in Stock
Low Stock Products
Pending Orders
```

Example:

```text
Revenue: $24,580
Orders: 312
Customers: 1,240
Pending Orders: 18
```

---

##### Sales Chart

Show sales by day/week/month.

Example chart filters:

```text
Today | 7 Days | 30 Days | This Year
```

---

##### Recent Orders Table

Columns:

- Order ID
- Customer
- Date
- Status
- Total
- Action

---

##### Low Stock Products

Show products that have stock below a certain number.

Example:

```text
Keychron K2 Keyboard — 3 left
Sony WH-1000XM5 — 2 left
```

---

### 5.2 Admin Products Page

Route:

```text
/admin/products
```

#### Purpose

Allow admin to manage all products.

#### Main Content

##### Products Table

Columns:

- Product image
- Product name
- SKU
- Category
- Price
- Stock
- Status
- Created date
- Actions

Statuses:

```text
Published
Draft
Out of Stock
Archived
```

Actions:

```text
View
Edit
Delete
Duplicate
Archive
```

---

##### Filters

Admin can filter by:

- Category
- Brand
- Status
- Stock level
- Price
- Date created

---

##### Bulk Actions

Allow admin to select multiple products and:

- Delete
- Archive
- Publish
- Change category
- Apply discount

---

### 5.3 Create/Edit Product Page

Routes:

```text
/admin/products/new
/admin/products/:id/edit
```

#### Purpose

Allow admin to create and update product information.

---

#### Product Form Sections

##### Basic Information

Fields:

- Product name
- Slug
- Brand
- Category
- Short description
- Full description

---

##### Pricing

Fields:

- Price
- Old price
- Cost price optional
- Discount percentage optional

Validation:

- Price must be greater than 0
- Old price must be greater than price if discount exists

---

##### Inventory

Fields:

- SKU
- Stock quantity
- Low stock threshold
- Availability status

Validation:

- Stock cannot be negative
- SKU is required

---

##### Images

Admin can:

- Upload images
- Reorder images
- Delete images
- Set main image

For practice, image upload can be mocked or you can use image URLs.

---

##### Variants

Example variant data:

```text
Color: Black, White, Silver
Storage: 128GB, 256GB
Size: Small, Medium, Large
```

Each variant can have:

- SKU
- Price difference
- Stock
- Image

---

##### Specifications

Dynamic fields:

```text
Battery Life: 30 hours
Weight: 250g
Material: Aluminum
Warranty: 2 years
```

---

##### SEO Fields

Fields:

- Meta title
- Meta description
- URL slug

---

##### Publish Settings

Options:

- Draft
- Published
- Archived
- Featured product
- Best seller
- New arrival

---

#### Functionality

Admin can:

- Save as draft
- Publish product
- Edit product
- Delete product
- Preview product page

Use Zod for validation.

---

### 5.4 Admin Categories Page

Route:

```text
/admin/categories
```

#### Purpose

Manage product categories.

#### Main Content

Category table:

- Category image
- Name
- Slug
- Number of products
- Status
- Actions

Admin can:

- Create category
- Edit category
- Delete category
- Reorder categories
- Mark category as featured
- Add category description
- Add category banner image

Example categories:

```text
Audio
Desk Setup
Smart Watches
Keyboards
Accessories
Bags
```

---

### 5.5 Admin Orders Page

Route:

```text
/admin/orders
```

#### Purpose

Allow admin to process and manage customer orders.

---

#### Orders Table

Columns:

- Order ID
- Customer name
- Date
- Payment status
- Fulfillment status
- Total
- Delivery method
- Actions

Payment statuses:

```text
Pending
Paid
Failed
Refunded
```

Fulfillment statuses:

```text
New
Processing
Shipped
Delivered
Cancelled
Returned
```

---

#### Filters

Admin can filter by:

- Order status
- Payment status
- Date range
- Customer
- Total amount
- Delivery method

---

### 5.6 Admin Order Details Page

Route:

```text
/admin/orders/:id
```

#### Purpose

Allow admin to manage one specific order.

#### Main Content

Show:

- Order ID
- Customer details
- Shipping address
- Ordered products
- Payment status
- Delivery method
- Order total
- Customer notes
- Internal admin notes
- Status timeline

---

#### Admin Actions

Admin can:

- Change order status
- Mark order as paid
- Mark order as shipped
- Add tracking number
- Cancel order
- Refund order mock
- Print invoice
- Contact customer

Example status flow:

```text
New → Paid → Processing → Shipped → Delivered
```

Business rule:

- Admin should not mark order as shipped if payment is not paid.
- Admin should not mark delivered before shipped.
- Cancelled orders should not be edited.

---

### 5.7 Admin Customers Page

Route:

```text
/admin/customers
```

#### Purpose

Allow admin to view and manage customers.

#### Main Content

Customer table:

- Name
- Email
- Registration date
- Number of orders
- Total spent
- Status
- Actions

Customer statuses:

```text
Active
Blocked
Admin
```

Admin can:

- View customer profile
- Block customer
- Unblock customer
- Promote user to admin optional
- See customer order history

---

### 5.8 Admin Reviews Page

Route:

```text
/admin/reviews
```

#### Purpose

Moderate product reviews.

#### Main Content

Review table:

- Product
- User
- Rating
- Review text
- Date
- Status
- Actions

Review statuses:

```text
Pending
Approved
Rejected
```

Admin can:

- Approve review
- Reject review
- Delete review
- Reply to review

---

### 5.9 Admin Coupons Page

Route:

```text
/admin/coupons
```

#### Purpose

Create and manage discount codes.

---

#### Coupon Fields

- Code
- Discount type
- Discount value
- Minimum order amount
- Usage limit
- Expiration date
- Active/inactive status

Discount types:

```text
Percentage discount
Fixed amount discount
Free shipping
```

Examples:

```text
WELCOME10 — 10% off
SUMMER20 — 20% off orders over $100
FREESHIP — free shipping
```

---

#### Functionality

Admin can:

- Create coupon
- Edit coupon
- Disable coupon
- Delete coupon
- See usage count

Validation rules:

- Coupon code is required
- Discount value must be positive
- Percentage discount cannot be more than 100%
- Expiration date must be in the future

---

### 5.10 Admin Settings Page

Route:

```text
/admin/settings
```

#### Purpose

Manage global store settings.

#### Settings Sections

##### Store Information

- Store name
- Contact email
- Phone number
- Address

---

##### Shipping Settings

- Free shipping minimum amount
- Standard shipping price
- Express shipping price

---

##### Tax Settings

- Default tax percentage
- Region-specific taxes optional

---

##### Homepage Content

Admin can edit:

- Hero title
- Hero subtitle
- Hero image
- Promotional banners
- Featured categories

---

## 6. Main User Patterns

---

### Pattern 1: User Browses and Buys a Product

Flow:

```text
Homepage → Category Page → Product Detail → Add to Cart → Checkout → Order Confirmation
```

Example:

1. User opens homepage.
2. User clicks “Audio”.
3. User filters by brand “Sony”.
4. User opens Sony headphones product page.
5. User selects color “Black”.
6. User adds product to cart.
7. User goes to checkout.
8. User fills shipping and payment forms.
9. User places order.
10. User sees confirmation page.

---

### Pattern 2: User Searches for a Product

Flow:

```text
Search Bar → Search Results → Product Detail → Add to Cart
```

Example:

1. User types “keyboard”.
2. Search results page shows matching products.
3. User sorts by “Best Rated”.
4. User opens a product.
5. User adds it to cart.

---

### Pattern 3: User Saves Product for Later

Flow:

```text
Product Card → Wishlist → Login/Register → Wishlist Saved
```

Example:

1. Guest user likes a product.
2. Product is saved to local wishlist.
3. User creates account.
4. Wishlist syncs with user account optional.
5. User later moves item from wishlist to cart.

---

### Pattern 4: Returning Customer Reorders

Flow:

```text
Login → Account → Order History → Reorder → Cart → Checkout
```

Example:

1. User logs in.
2. User opens previous orders.
3. User clicks “Reorder”.
4. Products are added to cart.
5. User checks out faster using saved address.

---

### Pattern 5: Admin Adds a New Product

Flow:

```text
Admin Login → Products → Add Product → Fill Form → Upload Images → Publish
```

Example:

1. Admin logs in.
2. Admin opens product management.
3. Admin creates a new product.
4. Admin adds price, stock, category, images, and description.
5. Admin publishes the product.
6. Product appears in the public catalog.

---

### Pattern 6: Admin Processes an Order

Flow:

```text
Admin Dashboard → Orders → Order Details → Change Status → Add Tracking
```

Example:

1. Admin sees pending orders.
2. Admin opens order details.
3. Admin checks payment status.
4. Admin changes order to “Processing”.
5. Later admin changes status to “Shipped”.
6. Admin adds tracking number.
7. Customer sees updated order status in account.

---

## 7. State Management Plan

For this project, a good split would be:

### Zustand

Use Zustand for client-side state:

- Cart state
- Wishlist state
- Theme mode
- Cart drawer open/close
- Mobile menu open/close
- Checkout step state
- Auth token optional

Example Zustand stores:

```text
useCartStore
useWishlistStore
useThemeStore
useUiStore
```

---

### TanStack Query

Use TanStack Query for server data:

- Products
- Categories
- Product details
- Orders
- User profile
- Reviews
- Coupons
- Admin statistics

Example query keys:

```text
['products', filters]
['product', slug]
['categories']
['orders']
['order', orderId]
['admin', 'stats']
```

---

### Zod

Use Zod for:

- Login form validation
- Register form validation
- Checkout form validation
- Product creation form validation
- Coupon form validation
- Review form validation
- API response validation optional

---

## 8. API Plan

For the beginning, I recommend using **MSW Mock API**.

Why?

Because you can build the full frontend without waiting for a backend.

Later, you can replace MSW with a real backend.

---

### Main API Endpoints

#### Products

```text
GET /products
GET /products/:slug
GET /products/featured
GET /products/new
GET /products/best-sellers
POST /admin/products
PATCH /admin/products/:id
DELETE /admin/products/:id
```

---

#### Categories

```text
GET /categories
GET /categories/:slug
POST /admin/categories
PATCH /admin/categories/:id
DELETE /admin/categories/:id
```

---

#### Authentication

```text
POST /auth/login
POST /auth/register
POST /auth/logout
GET /auth/me
```

---

#### Cart (optional server sync)

```text
GET /cart
POST /cart/items
PATCH /cart/items/:id
DELETE /cart/items/:id
```

You can also keep cart fully in Zustand/localStorage for simpler implementation.

---

#### Orders

```text
POST /orders
GET /account/orders
GET /account/orders/:id
GET /admin/orders
GET /admin/orders/:id
PATCH /admin/orders/:id/status
```

---

#### Coupons

```text
POST /coupons/validate
GET /admin/coupons
POST /admin/coupons
PATCH /admin/coupons/:id
DELETE /admin/coupons/:id
```

---

#### Reviews

```text
GET /products/:id/reviews
POST /products/:id/reviews
GET /admin/reviews
PATCH /admin/reviews/:id/status
DELETE /admin/reviews/:id
```

---

## 9. Important UI States

Every major page should include realistic states.

### Loading State

Use skeleton loaders.

Example:

- Product card skeletons
- Table row skeletons
- Checkout button loading spinner

---

### Empty State

Examples:

```text
Your cart is empty.
No products found.
You have no orders yet.
No reviews pending.
```

---

### Error State

Examples:

```text
Something went wrong while loading products.
Could not apply coupon.
Payment failed. Please try again.
```

---

### Success State

Examples:

```text
Product added to cart.
Coupon applied successfully.
Order placed successfully.
Product published.
```

Use toast notifications for success and error messages.

---

## 10. Design Direction

The design should feel:

- Clean
- Premium
- Modern
- Minimalistic
- Spacious
- Trustworthy

### Suggested Color Palette

Example:

```text
Background: #F8F8F8
Text: #111827
Primary: #2563EB
Accent: #F97316
Success: #16A34A
Error: #DC2626
```

### Main Components to Design

You should create or find Figma designs for:

- Header
- Footer
- Product card
- Product grid
- Filter sidebar
- Cart drawer
- Checkout stepper
- Form inputs
- Buttons
- Modal
- Toast
- Admin sidebar
- Admin tables
- Dashboard cards
- Charts
- Product form

These components are great for AI Perfect Pixel design-to-code practice.

---

## 11. MVP Version

If you want to build the project step by step, start with this MVP:

### Storefront MVP

- Homepage
- Product catalog
- Product detail page
- Cart drawer
- Cart page
- Checkout page
- Order success page
- Login/register pages

### Admin MVP

- Admin dashboard overview
- Products table
- Create/edit product
- Orders table
- Order details page

After that, add:

- Wishlist
- Reviews
- Coupons
- Customer account
- Analytics
- Category management
- Settings

---

## 12. Final Project Summary

You are building a realistic e-commerce platform where:

- Users can discover products through homepage, categories, search, and filters.
- Users can view detailed product information, select variants, and add products to cart.
- Users can complete checkout using validated forms.
- Customers can manage orders, addresses, profile, and wishlist.
- Admins can manage the entire store: products, categories, orders, customers, reviews, coupons, and settings.
- The frontend uses TanStack Query for server data, Zustand for cart/UI state, Zod for validation, and Figma/AI Perfect Pixel for high-quality UI implementation.

This project will look strong in a portfolio because it includes both a polished customer-facing store and a realistic admin dashboard.