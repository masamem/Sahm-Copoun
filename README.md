# Coponya coupons

Arabic, RTL coupon discovery website. Keeps the original olive and apricot visual design and completes store/category browsing, coupon search and sorting, coupon details with accessible dialogs, clipboard copying, saved favorites, account preferences, help and informational pages.

## Run and build

Requires Node.js 22 or later and pnpm 10 (the version in `package.json`).

```sh
pnpm install
pnpm dev
pnpm check
pnpm build
```

Vercel builds the site into `dist/public` and rewrites client-side routes to `index.html`. The included Vercel configuration supports direct links and reloads on inner pages.

## Current data and services

- `client/src/lib/data.ts` is the sample catalog. Every coupon is illustrative, clearly marked in the interface. Replace it with verified merchant data before launch; supply dates, terms, exclusions and destination URLs before offering real redemption.
- Favorites and the optional display name are stored on the current device with local storage. This is not server authentication or cross-device sync.
- Contact and report forms generate a message for copying. They do not send email or create support tickets. A service and actual recipient are needed for delivery.
- Privacy and terms pages describe the demo behavior and must be finalized with operator details for launch.
- The homepage uses the project's original external illustrations and Google Fonts. Host licensed assets locally if desired.
- Production deployment uses the existing Vercel `sahm` project linked to `masamem/Sahm-Copoun` on GitHub. The product name is Coponya — كوبونيا.

## Verification

TypeScript checking passed. The preview was bundled successfully with the esbuild command-line compiler and exercised in a browser. Standard Vite production building could not be verified in the restricted execution session because launching subprocesses returned `EPERM`; run `pnpm build` in the normal development environment before deployment. The preview bundle uses the application's custom CSS; Tailwind processing still needs the normal Vite build.
