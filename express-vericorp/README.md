# Express + VeriCorp

REST API with company verification powered by VeriCorp.

## Features

- Express middleware for VAT validation
- Batch company lookup endpoint
- Error handling with proper HTTP codes
- TypeScript

## Quick Start

```bash
git clone https://github.com/vericorptest-collab/vericorp-templates.git
cd vericorp-templates/express-vericorp
cp .env.example .env
npm install
npm run dev
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/company/:taxId` | Look up a company |
| GET | `/api/validate/:taxId` | Validate a VAT number |
| POST | `/api/batch` | Batch lookup (max 10) |

## Environment Variables

```
VERICORP_API_KEY=your_rapidapi_key
PORT=3000
```
