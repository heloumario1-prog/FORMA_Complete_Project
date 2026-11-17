# FORMA — Everyday Essentials

A complete React + Vite single-page boutique store for the Week 4 frontend assignment. Built with JavaScript, JSX, plain CSS and Lucide icons. No backend, database or payment service is needed.

## Start on Windows

1. Extract this ZIP (do not run it from inside the ZIP).
2. Open the extracted `forma` folder in VS Code.
3. Choose **Terminal → New Terminal**. Confirm `package.json` is in the current folder.
4. Run:

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite, usually http://localhost:5173. Leave the terminal running. Use Ctrl+C to stop it. Install a supported Node.js LTS release if `npm` is not recognized.

## Production build

```sh
npm run build
npm run preview
```

The build output is `dist/`. `index.html` is an application entry point; use Vite rather than opening it directly by double-clicking. The relative Vite base also supports static hosting under a subdirectory.

## Features

- 16 sample products across Desk, Lighting, Bags, Drinkware and Audio.
- Search descriptions, names and categories; combine category, favorites and sorting.
- Product quick view, stock-aware quantities and accessible native modal dialogs.
- Cart drawer with quantity changes, removal and clear confirmation.
- Shipping is $5.99 below $100; free from $100; empty-cart shipping is $0.
- Cart and favorites survive reloads through validated localStorage.
- Full demo checkout with required fields, email validation and an order confirmation.
- Responsive CSS, mobile menu, reduced-motion support, image fallback and keyboard controls.

## Structure

```text
index.html
vite.config.js
package.json
public/illustrations/     Original SVG product illustrations
src/
  App.jsx                State ownership, catalog filtering, cart actions
  main.jsx               React entry point and toast provider
  styles.css             Theme, layout and responsive breakpoints
  components/            Header, Hero, Collections, CategoryTabs,
                         ProductToolbar, ProductGrid, ProductCard,
                         ProductQuickView, CartDrawer, CheckoutModal,
                         Dialog, Quantity, OrderSummary, Img,
                         ToastProvider and Footer
  hooks/useLocalStorage.js
  data/products.js
  utils/currency.js
```

## React concepts explained

`useState` holds search, category, sorting, favorites mode, the current overlay and the checkout result. Individual components hold their own short-lived state: form fields, validation errors, quantity selection and mobile navigation.

`useEffect` saves cart and favorites after changes. The shared Dialog uses an effect to open a native `dialog`, lock document scrolling, and restore focus when it closes. Native `showModal()` keeps the background inactive, traps keyboard focus and supports Escape.

Props pass state down and callbacks up. For example, ProductCard receives a product, its saved status and cart quantity; `onAdd` and `onFav` update App state.

`useMemo` derives the visible product list by applying search, category and favorites together, then sorting. Counts and money totals are derived rather than stored separately. Prices are integer cents, formatted with Intl.NumberFormat.

The localStorage hook reads once and saves changes. App validates values against the current product catalog: unknown entries and invalid quantities are dropped, duplicates are removed and quantities are clamped to stock. Failed JSON parsing or unavailable storage falls back safely to in-memory state.

## Checkout and sample data

This is an educational simulation. Product specifications, stock, ratings and review counts are fictional sample data. No order is sent and no payment is processed. Form values are never persisted or transmitted by the application. The successful confirmation snapshots purchased items before clearing the cart. Closing or canceling checkout preserves the cart.

## Images and fonts

Photography uses fixed images.unsplash.com URLs. These are illustrative stock photographs, not exact manufactured product photographs. Original SVG illustrations for the tote, tray, carafe, pouch and mat are included in public/illustrations. The hero uses https://images.unsplash.com/photo-1497215728101-856f4ea42174. All other stock image URLs are listed in src/data/products.js. Images have a branded fallback if unavailable. DM Sans and Manrope load from Google Fonts with system fallbacks; icons come from lucide-react. Internet is needed for initial npm installation and external photos/fonts; the store logic has no network API dependency.

## Verification

See VERIFICATION.md for checks actually completed and limitations.

## Submission

Use SUBMISSION.md for the description. Submit this source ZIP if the portal accepts project archives. If the portal requires a live URL, deploy `dist/` to a static host and submit that URL. Do not include node_modules when creating your own archive.
