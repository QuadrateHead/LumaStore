# UI Context

## HTML Design Fidelity

When recreating a page represented in `context/UIHTMLDESIGN`, use its HTML files as the source of truth. Match the mockup's content and UI as closely as possible:

- Preserve the text and its meaning, DOM structure, layout, and styles from the corresponding HTML file.
- Keep the mockup's images, icons, and other visual assets; do not replace, omit, or alter them as part of reproducing the UI.
- Do not introduce new copy or visual design choices that diverge from the mockup.
- If a referenced font is unavailable, load it from Google Fonts or the same source used by the HTML mockup. If a referenced icon is unavailable, use `lucide-react` as a fallback.

These fidelity rules take precedence over the general design direction and patterns below wherever an HTML mockup exists for the page.

## General Direction

LumaStore should feel premium, minimal, and conversion-focused. The visual design should communicate quality, trust, and clarity without feeling cluttered. The project favors spacious layouts, confident type hierarchy, and product-first merchandising.

The interface should feel modern and elevated while keeping the structure easy to scan. Product cards, category modules, value propositions, and checkout summaries should all work together to support the buying journey.

## Design Principles

- Modern storefront aesthetic with generous whitespace
- Clean typography and strong content hierarchy
- High trust through visible value messaging and product quality cues
- Light, neutral foundation with restrained color accents
- Clear conversion intent across product cards, cart, and checkout flows

## Theme

Use a premium neutral palette built for a polished retail experience:

- Background: soft off-white or warm gray
- Foreground text: dark charcoal or slate
- Primary accent: blue or deep indigo for action states and emphasis
- Secondary accent: orange or amber for sale/discount highlights
- Success states: green
- Error states: red
- Surfaces: white or very light neutral surfaces with subtle borders and soft shadows

The project should not simulate a dark movie-like aesthetic. It should feel like a modern e-commerce storefront for premium lifestyle goods.

## Core Layout Patterns

### Homepage Pattern

1. Header with logo, navigation, search, wishlist, cart, and profile/login controls.
2. Hero section with text, promotion, and a clear primary call-to-action.
3. Featured category cards with product count and category visuals.
4. New arrivals section with a horizontal or grid product row.
5. Best sellers section with high-performing items.
6. Promotional banner for seasonal or campaign-specific offers.
7. Store benefits section with trust-building features.
8. Customer reviews preview and email signup/newsletter block.

### Catalog Pattern

1. Breadcrumbs at the top.
2. Page title and item count.
3. Left-hand filter sidebar or collapsible filters.
4. Sorting controls.
5. Product grid with card variants and call-to-action buttons.
6. Pagination or load-more controls.

### Product Detail Pattern

1. Breadcrumbs.
2. Image gallery with thumbnails and main product preview.
3. Product title, brand, pricing, old price, rating, and stock status.
4. Variant selector and quantity controls.
5. Primary purchase actions: Add to Cart, Buy Now, Add to Wishlist.
6. Delivery information and guarantees.
7. Tabbed sections for description, specifications, reviews, and FAQ.
8. Related products.

### Cart and Checkout Pattern

1. Summary panel with item quantities and totals.
2. Coupon or discount field.
3. Shipping information and delivery method selection.
4. Payment form with secure, mocked validation only.
5. Review order before submission.
6. Confirmation page with order number and next actions.

### Admin Pattern

1. Sidebar navigation with grouping by management area.
2. Top bar with search, notifications, and profile.
3. KPI summary cards and sales chart panels.
4. Data tables with statuses and actions.
5. Search/filter controls and bulk actions when relevant.
6. Forms with clear validation and publish states.

## Component Styling Rules

- Use Tailwind utilities in component markup for layout, spacing, border radius, and typography; avoid Sass/SCSS.
- Match each mockup's button font weight exactly (the HomePage buttons use `700`).
- Prefer subtle shadows and borders over heavy decoration.
- Maintain strong spacing rhythm between major sections and tighter grouping within individual blocks.
- Keep cards visually consistent across homepage, catalog, and product detail contexts.
- Use accent colors sparingly and intentionally to direct attention to actions and promotions.

## Component Types

Common component categories for this project:

- Header and navigation
- Hero and banners
- Category cards
- Product cards
- Filters and sort controls
- Cart drawer and cart summary
- Checkout form fields and steps
- Account navigation and profile panels
- Admin KPI cards and tables
- Form sections for product and coupon management

## Iconography

Preserve the icons shown in the HTML mockups. When a mockup does not specify an icon or its icon is unavailable, use Lucide React and keep icons simple and line-based.

## Accessibility and UX Expectations

- Buttons must have clear labeling and visible focus states.
- Forms should use accessible labels and inline validation messaging.
- Empty states and error states must be explicit and helpful.
- The app should remain keyboard-friendly and responsive across desktop and mobile devices.

## Delivery Goal

The UI should be polished enough to feel like a real store, not just a static mock. Every major flow should communicate value, trust, and simplicity while preserving the structure required for a scalable e-commerce product.
