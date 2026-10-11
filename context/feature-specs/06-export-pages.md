- Read the UIHTMLDESIGN html files about HomePage
- Read Full Stack E Commerce Web Site Full.md
- Import `Next Page from list of not done pages` from UIHTMLDESIGN page by page, at first check html's, if HTMLs contain the same logic page(For example: LumaStore-CheckoutSuccessPage.html and LumaStore — Checkout Page is actually one CheckoutPage) merge it in one page
- Put components in /src/styles/components
- Put pages in /src/styles/pages

- For main section in all pages should be the same paddings

- If you need to change elements for solution, do it

- If a page element is used on another page, extract it into a reusable component or element instead of duplicating it. Use `/src/components` for assembled sections and page blocks, and `/src/elements` for generic UI atoms.

- Do routes

- Add page in list of done pages in progress-tracker
## Do not:
- Make an data functionality, only do UI functionality like tabs

## Check: 
- Does `Page` have the same text, icons, colors, DOM as HTML origin have
- Do all components imported
- Do all pages imported
- Do all pages have screen responsibility
- Does it imported from html filed correcly(check tsx, styles, animations and else)
- No eslint errors