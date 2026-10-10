# Code Standards

## General

- Keep components small and single-purpose. One component should solve one problem clearly.
- Prefer reusable building blocks over page-specific duplication.
- Fix root causes rather than layering one-off CSS overrides or ad hoc hacks.
- Keep storefront and admin workflows visually and structurally separated.

## TypeScript

- Strict mode is required throughout the project.
- Avoid `any` when a real product or API shape can be described explicitly.
- Use domain types for product, cart item, order, review, and user data.
- Prefer named exports and clear interfaces for shared component props.

## Styling

- Use Tailwind utilities in component markup as the primary styling mechanism.
- Do not add Sass/SCSS. Use plain CSS only for global tokens, browser-specific behavior, or repeated rules that cannot be expressed clearly with existing Tailwind utilities.
- For shared components that appear across pages, use page-independent names such as `Header` and `Footer`; avoid page prefixes such as `HomeHeader` and `HomeFooter`.
- Match typography in the source HTML precisely. In particular, buttons use `font-weight: 700` when that is the value in the mockup.
- Merge required SVG base styles with caller-provided size classes so overrides do not remove icon strokes or fills.
- Give interactive buttons a pointer cursor.
- Prefer the theme variables defined in `src/styles/tailwind.css` for shared colors, radii, and surfaces instead of introducing ad hoc values in component classes.
- Keep visual decisions consistent with `ui-context.md`.
- Do not hardcode colors or spacing patterns in a way that bypasses the design system.
- Keep layout classes intentional and maintainable; avoid deep CSS nesting or broad resets.

## Forms and Validation

- Use React Hook Form for form state and validation logic.
- Use Zod schemas for checkout, login, registration, coupon, review, and product creation flows.
- Validate at the form boundary and keep error messages specific and actionable.
- Never store real card details in client state or local storage.

## State and Data

- Use Zustand for cart, wishlist, theme, and shared interaction state.
- Use TanStack Query for async product, category, order, and dashboard data.
- Use mock data or MSW at the start of the project instead of introducing a live backend prematurely.
- Keep product and order shapes consistent across pages to avoid UI drift.

## API and Persistence

- The current project scope does not require a production API layer. Use mock data or local API simulation until the project explicitly expands.
- If a real backend is added later, update `project-overview.md`, `architecture-context.md`, and this file before implementing it.
- For browser-side persistence, prefer simple local storage strategies only for lightweight UI state such as cart or wishlist if needed.

## File Organization

- `/src/elements` — reusable UI building blocks only. These are small, atomic, presentational elements that are intentionally composable and do not know about page-level business logic. Examples: `Button`, `Badge`, `ProductTag`, `SectionTitle`, `Logo`, `Price`, `QuantitySelector`. Reusable element files must be generic, portable, and reusable across multiple features.
- `/src/components` — page-level and feature-level assembled UI pieces. These compose elements into meaningful sections and screens such as `Header`, `Hero`, `ProductCard`, `CartSummary`, `CheckoutForm`, `AdminSidebar`, and `DashboardStats`.
- `/src/components/ui` — generated or shared primitive wrappers that are framework/library-level building blocks. Keep these focused and avoid feature-specific logic.
- `/src/features` — feature-specific modules such as cart, auth, products, checkout, and admin. Keep route-level flows and business logic grouped by domain here.
- `/src/store` — Zustand stores for cart, wishlist, UI state, and shared client state.
- `/src/lib` — API helpers, validation schemas, constants, and shared utilities.
- `/src/types` — domain models for product, order, customer, coupon, review, and UI state structures.
- `/src/hooks` — reusable custom hooks that encapsulate logic such as form handling, local storage access, or query orchestration.
- `/src/pages` — route-level page containers when needed, typically thin shells that compose components/features together.
- `/src/assets` — static product imagery, icons, and other non-code assets.
- `/src/styles` or `/src/index.css` — global styling tokens, resets, and app-wide themes. Do not spread global visual logic across unrelated files.

Rules:

- Do not put business logic into `/src/elements`; keep them stateless and reusable.
- Do not create page-specific components inside `/src/elements`.
- Keep `/src/components` for assembled UI and `/src/features` for feature logic and orchestration.
- Keep all folders inside `/src` focused and distinct; do not mix domain logic with presentational code.
- Prefer a clear import direction: `elements` -> `components` -> `features` -> `pages`; avoid circular dependencies.

## UI Source and Design Discipline

- The UI must first read from the HTML mockups in `/UIHTMLDESIGN` folder when available.
- Start by analyzing the HTML files to extract the actual structure, layout, reusable blocks, and design logic before inventing new design decisions.
- Break the HTML content into sections by responsibility: reusable elements, section components, page-level layouts, and feature-specific blocks.
- Only after the HTML structure is mapped and understood should the team propose or implement custom design solutions that deviate from the mockups.
- If a new design decision is needed, it should be treated as a deliberate extension of the HTML structure, not a replacement for it.
- Reusable elements from the HTML mockups must be translated into `/src/elements` and shared components into `/src/components`.
- Pages could consist of multiple HTML design files. For example: LumaStore-CheckoutSuccessPage.html and LumaStore — Checkout Page is actually one CheckoutPage


## UX and Product Standards

- Every major flow should include loading, empty, error, and success states.
- Product pages should clearly communicate price, stock status, variants, and trust cues.
- Cart and checkout flows should be explicit and friction-light.
- Admin features should prioritize actionability, structure, and operational clarity.

## Implementation Expectations

- Build the storefront in clearly scoped increments.
- Do not combine unrelated feature work into a single implementation step.
- Reference the approved spec files before introducing new state or new product behavior.
- Keep the app coherent enough to support real commerce features later without a large rewrite.
