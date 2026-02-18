# Next.js + VeriCorp

Company verification form built with Next.js and the VeriCorp API.

## Features

- Server-side VAT validation via API route
- Real-time format checking with `eu-tax-id-validator`
- Company data display with all enriched fields
- TypeScript, Tailwind CSS

## Quick Start

```bash
npx create-next-app --example https://github.com/vericorptest-collab/vericorp-templates/tree/main/nextjs-vericorp my-app
cd my-app
cp .env.example .env.local
# Add your RapidAPI key to .env.local
npm run dev
```

## Environment Variables

```
VERICORP_API_KEY=your_rapidapi_key
```

## Get an API Key

Sign up at [RapidAPI](https://rapidapi.com/vericorptestcollab/api/vericorp).
