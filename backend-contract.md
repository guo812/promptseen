# PromptSeen Backend API Contract

Product: promptseen  
Domain: promptseen.online  
Runtime: Next.js / OpenNext on Cloudflare Workers  
Storage: Cloudflare D1 (`DB`) + R2 (`ASSETS_BUCKET`)  

## Endpoints

- `GET /api/health`
  - Auth: none
  - Returns runtime/provider/D1 health without exposing secrets.

- `GET /api/prompts?tag=&q=`
  - Auth: none
  - Returns prompt library from D1. Falls back to static seed if D1 is unavailable.

- `POST /api/generations`
  - Auth: anonymous v0; Google session planned before paid launch.
  - Body: `{ "prompt": "string", "style": "optional", "userId": "optional" }`
  - Creates a D1 generation job.
  - Default mode is safe `draft`; real AI calls require owner review and `ENABLE_REAL_AI=true`.

- `GET /api/generations?id=<job_id>`
  - Auth: anonymous v0; owner/user access check planned.
  - Returns generation job status.

- `GET /api/entitlements?userId=<id>`
  - Auth: anonymous v0; Google session planned.
  - Returns plan and credits, defaulting to Free.

- `POST /api/paypal/create-order`
  - Auth: Google session planned.
  - Body: `{ "planId": "starter" | "pro" | "creator" }`
  - Returns PayPal order contract in review-gated mode.

- `GET /api/auth/google/status`
  - Auth: none
  - Returns Google OAuth readiness without exposing client secret.

## Environment Variables

Secrets are platform secrets and must not be committed:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `FAL_KEY`
- `OPENAI_API_KEY`
- `REPLICATE_API_TOKEN`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `SESSION_SECRET`

Non-secret vars:

- `SITE_NAME`
- `SITE_SLUG`
- `DOMAIN`
- `APP_ORIGIN`
- `PRODUCT_TYPE`
- `AI_PROVIDER`
- `PAYMENT_PROVIDER`
- `AUTH_PROVIDER`
- `ENABLE_REAL_AI`

## Quality Gate

- Production secrets stay out of Git.
- Payment and real AI execution stay gated until owner review.
- D1 migration is repeatable with `INSERT OR IGNORE` seed data.
- Frontend can consume `backend-contract.json` as the machine-readable contract.
