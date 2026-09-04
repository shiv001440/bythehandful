# By The Handful

> Handcrafted dry fruits, organic nuts, gourmet berries, and artisanal gift hampers.

An e-commerce platform built with **TanStack Start**, **React 19**, **Tailwind CSS**, **Supabase**, and **Razorpay**.

---

## Features

- **Gourmet Catalog:** Browse handcrafted dry fruits, rare harvest nuts, dried berries, seeds, and gift hampers.
- **Interactive Cart & Drawer:** Seamless sliding cart with real-time total calculations and persistence.
- **Authentication:** Email & Password authentication powered by Supabase Auth with session persistence.
- **Razorpay Checkout:** Secure payment flow supporting UPI, Netbanking, Cards, and Wallets with server-side HMAC signature verification.
- **Order Tracking:** Authenticated customer order history, status tracking, and printable receipts.
- **Admin Dashboard:** Role-based access control (`is_admin`) for managing customer orders, tracking sales analytics, and updating fulfillment statuses.

---

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (Full-stack SSR) + [TanStack Router](https://tanstack.com/router)
- **UI & Components:** [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL with Row-Level Security, Auth)
- **Payments:** [Razorpay](https://razorpay.com/) via `react-razorpay` & server-side `razorpay` SDK
- **Bundler & Tooling:** [Vite 8](https://vitejs.dev/) + TypeScript + ESLint + Prettier

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **pnpm**
- A **Supabase** project
- A **Razorpay** account (Test or Live)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd "By The Handful Website"
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory (or copy from `.env.development.example`):

```env
# Supabase Configuration (Development Project)
SUPABASE_URL="https://<your-dev-project-id>.supabase.co"
SUPABASE_PUBLISHABLE_KEY="<your-dev-publishable-key>"
VITE_SUPABASE_URL="https://<your-dev-project-id>.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="<your-dev-publishable-key>"
VITE_SUPABASE_PROJECT_ID="<your-dev-project-id>"
SUPABASE_SERVICE_ROLE_KEY="<your-dev-service-role-key>"

# Razorpay Configuration (Test Mode for development)
VITE_RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxxxxxx"
RAZORPAY_WEBHOOK_SECRET="xxxxxxxxxxxxxxxxxxxx"

# Optional (for AI features if enabled)
GEMINI_API_KEY="<your-gemini-api-key>"
```

> **Production Deployment Protocol**:
>
> - Use `.env.production.example` as reference for configuring production hosting secrets (Vercel, Netlify, Railway, etc.).
> - Switch `VITE_RAZORPAY_KEY_ID` to `rzp_live_...` and `RAZORPAY_KEY_SECRET` to production values **only** as a final, separate deploy step directly in your hosting dashboard—never bundled in feature code commits. This allows instant isolation and rotation without redeploying code.

### 3. Database Setup (Supabase)

Run the SQL migration files located in `supabase/migrations/` sequentially in your Supabase SQL Editor:

1. `20260810183348_8ddd3522-7d16-4a07-b5b5-c257f85e93c9.sql` (Initial tables & triggers)
2. `20260810183421_4a6719f0-aaa8-41db-b961-c5bb3646a9db.sql`
3. `20260815124000_add_paypal_orders.sql`
4. `20260818120000_add_admin_role.sql`
5. `20260823143234_add_razorpay.sql`
6. `20260824100000_add_payments_insert_policy.sql`
7. `20260825120000_fix_rls_gaps.sql` (Admin profile access, anti-privilege escalation & table grants)
8. `20260826100000_lockdown_orders_and_payments.sql` (Lock down payments immutability, order status protection & revoke dangerous privileges)
9. `20260827100000_create_products_table.sql` (Authoritative products catalog table with price seeding)
10. `20260828100000_enforce_payment_idempotency.sql` (Unique indexes & constraints for payment and order idempotency)

---

## Development & Scripts

```bash
# Start local development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting checks
npm run lint

# Format codebase with Prettier
npm run format
```

---

## Razorpay Testing Guide

When testing payments in **Test Mode** (`rzp_test_...`):

- **UPI / Netbanking:** Select any bank/UPI app in the Razorpay popup and click **Success**.
- **Domestic Indian Cards:**
  - **Visa:** `4100 2800 0000 1007`
  - **Mastercard:** `5500 6700 0000 1002`
  - **RuPay:** `6527 6589 0000 1005`
  - _Expiry:_ Any future date (e.g. `12/28`) | _CVV:_ `123` | _OTP:_ Click **Success** or enter any OTP.

_(Note: International cards require enabling in your Razorpay Dashboard under Account & Settings → Payment Methods)._

---

## License

Private & Proprietary. All rights reserved by By The Handful.
