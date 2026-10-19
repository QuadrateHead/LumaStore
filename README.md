# LumaStore

**A premium tech and lifestyle storefront, built as a modern e-commerce web app.**

LumaStore is designed to make discovering and buying products feel clear and polished—from browsing a catalog to reviewing an order. The project also plans for a separate admin experience for managing store operations.

## Project goals

- Create a responsive storefront for tech products and lifestyle accessories.
- Build out product discovery, search, cart, wishlist, checkout, and customer account flows.
- Provide admin screens for products, orders, customers, and promotions.
- Keep the app modular and ready to connect to a backend as it grows.

## Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 App Router + React 19 | User interface, file-based routing, and typed application code |
| Next.js + Turbopack | Development server and production builds |
| Tailwind CSS 4 | Styling |
| ESLint | Code linting |

## Getting started

```bash
npm install
npm run dev
```

Useful scripts:

```bash
npm run build   # Type-check and create a production build
npm run lint    # Run ESLint
npm run start   # Start the production build locally
```

## Current status

The storefront and admin mockup pages are implemented under `src/app`. Navigation uses Next.js `Link` and `next/navigation`; there is no React Router compatibility layer. There is no live backend or payment integration at this stage.

## Project notes

- [Project overview](./context/project-overview.md)
- [Architecture and stack direction](./context/architecture-context.md)
- [UI design references](./context/UIHTMLDESIGN/)
