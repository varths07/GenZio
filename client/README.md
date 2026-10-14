# GenZio storefront

The active storefront is the Vite app in this folder (`npm run dev` / `npm run build`).
The separate `mens-fashion-store` directory is an unused Vite starter and is not
part of this app's routes.

## Demo catalog

`src/data/demoProducts.js` contains 12 illustrative menswear products. They are
added to the storefront catalog only; they are not written to Supabase.

Set `VITE_ENABLE_DEMO_PRODUCTS=false` in the frontend environment to disable
them. By default, demo products are enabled during development and disabled in
production builds. Set the value to `true` only when explicitly previewing the
demo catalog in a production build. Demo items are always marked as demos and
cannot be checked out.

To remove the fixture entirely, delete `src/data/demoProducts.js`, remove its
imports from `src/context/ShopContext.jsx`, and keep `storefrontProducts` mapped
to the real `products` array.

## Store configuration

Set `VITE_SUPPORT_EMAIL` to enable the contact email form. It opens the
customer's email application and does not send a message by itself.

The current project has no order persistence or payment-provider integration;
checkout is intentionally informational and does not accept payment details or
create simulated orders.
