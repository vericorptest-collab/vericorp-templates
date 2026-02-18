# Stripe + VeriCorp

Validate customer VAT numbers before creating Stripe subscriptions. Automatically applies VAT reverse charge for valid EU businesses.

## Features

- VAT validation before Stripe checkout
- Automatic VAT reverse charge for B2B EU transactions
- Company data stored in Stripe customer metadata
- TypeScript, Express

## Quick Start

```bash
git clone https://github.com/vericorptest-collab/vericorp-templates.git
cd vericorp-templates/stripe-vericorp
cp .env.example .env
npm install
npm run dev
```

## Flow

1. Customer enters VAT number
2. VeriCorp validates the VAT and retrieves company data
3. If valid B2B: apply reverse charge (0% VAT)
4. Create Stripe customer with company metadata
5. Proceed to checkout

## Environment Variables

```
VERICORP_API_KEY=your_rapidapi_key
STRIPE_SECRET_KEY=sk_test_...
PORT=3000
```
