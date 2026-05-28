# PromptSeen Backend Deployment Report

## Status

- Overall status: `[NEEDS_REVIEW]`
- Product: `promptseen`
- Domain: `promptseen.online`
- Runtime: Cloudflare Workers via OpenNext / Next.js
- Deployment target: Cloudflare Worker `promptseen`
- Public URLs:
  - `https://promptseen.online/`
  - `https://www.promptseen.online/`

`[NEEDS_REVIEW]` is used because the backend is deployed and smoke-tested, but R2 is not enabled on the Cloudflare account and live AI/payment execution remains intentionally gated for owner review.

## What Was Delivered

### Backend API

Implemented and deployed these API routes:

- `GET /api/health`
  - Runtime, provider, and D1 health check.
  - Confirmed D1 is configured and reachable.

- `GET /api/prompts`
  - Returns prompt library from D1.
  - Supports optional `tag` and `q` query filters.
  - Falls back to static seed data if D1 is unavailable.

- `POST /api/generations`
  - Creates an AI image generation job record.
  - Deployed in safe `draft` mode by default.
  - Real provider execution is gated behind `ENABLE_REAL_AI=true` after owner review.

- `GET /api/generations?id=<job_id>`
  - Returns generation job status from D1.

- `GET /api/entitlements?userId=<id>`
  - Returns membership plan and credit entitlement.
  - Defaults anonymous users to the Free plan with starter credits.

- `POST /api/paypal/create-order`
  - PayPal order API contract is present.
  - Live order creation is review-gated until pricing/refund policy is finalized.

- `GET /api/auth/google/status`
  - Google OAuth readiness endpoint.
  - Does not expose client secrets.

### Data Layer

Created Cloudflare D1 database:

- Database name: `promptseen-prod`
- Binding: `DB`
- Migration applied: `migrations/0001_promptseen_backend.sql`

D1 tables created:

- `prompts`
- `users`
- `entitlements`
- `generation_jobs`
- `payment_orders`
- `audit_log`

Seed data:

- 6 launch prompt records inserted with `INSERT OR IGNORE` so migration is repeatable.

### Data / API Contract Files

Added machine-readable and human-readable contracts:

- `backend-contract.json`
- `backend-contract.md`

### Cloudflare Configuration

Updated `wrangler.jsonc` with:

- Worker name: `promptseen`
- D1 binding: `DB`
- Production vars for non-secret product config
- Custom domains:
  - `promptseen.online`
  - `www.promptseen.online`

Secrets were uploaded to Cloudflare Worker secrets. Secret values are not included in this report.

## Deployment Result

Build command:

```bash
npm run build
```

Result:

- Next.js build: passed
- TypeScript check: passed
- Static generation: passed
- API routes detected as dynamic server routes

Deploy command:

```bash
env -u CLOUDFLARE_API_TOKEN npm run deploy
```

Result:

- OpenNext build: passed
- Worker upload: passed
- Assets upload: passed
- Worker deployed: passed
- Custom domain triggers deployed: passed
- Current Version ID: `db909422-f48b-4aa2-9105-f39eee1dcdca`

## Smoke Test Results

### DNS

Authoritative nameservers are Cloudflare:

- `brodie.ns.cloudflare.com`
- `liz.ns.cloudflare.com`

Cloudflare A records observed through public resolver:

- `104.21.85.79`
- `172.67.203.216`

### API Smoke Tests

- `GET https://promptseen.online/api/health`: passed
- `GET https://www.promptseen.online/api/health`: passed
- `GET https://www.promptseen.online/api/prompts`: passed, returned D1 source data
- `GET https://www.promptseen.online/api/entitlements?userId=anonymous`: passed
- `GET https://www.promptseen.online/api/auth/google/status`: passed
- `POST https://www.promptseen.online/api/generations`: passed, created a draft generation job

Health check confirmed:

- D1 configured: yes
- D1 reachable: yes
- Prompt rows: 6
- Google config present: yes
- FAL config present: yes
- PayPal config present: yes

## Secrets / Git Safety

- `.env.site` exists locally and is ignored by Git.
- `.env.site` was not committed.
- Secret values were not written into source files or this report.
- Worker secrets were set through Cloudflare Wrangler secret storage.

## Known Blockers / Review Items

### P1 — R2 Not Enabled

R2 bucket creation failed because R2 is not enabled in the Cloudflare account.

Impact:

- Current API deployment is live and working.
- Upload/file storage endpoints are intentionally not enabled yet.
- Before enabling real user uploads, enable R2 in Cloudflare Dashboard and create/bind the planned bucket.

Recommended next step:

1. Enable R2 in the Cloudflare Dashboard.
2. Create bucket `promptseen-assets`.
3. Add binding `ASSETS_BUCKET` to `wrangler.jsonc`.
4. Add signed upload/download endpoints after retention policy review.

### P1 — Live AI Execution Gated

`POST /api/generations` currently records draft jobs and does not call FAL by default.

Reason:

- Prevents accidental cost and unsafe user-generated image processing before owner review.

To enable after review:

- Set Worker var `ENABLE_REAL_AI=true`.
- Add moderation, credit deduction, upload retention, and error handling policies.

### P1 — Payment Execution Gated

PayPal credentials are configured, but live order creation is not activated in v0.

Before enabling:

- Finalize pricing.
- Confirm refund policy.
- Add webhook verification and order capture flow.
- Add entitlement credit update after verified payment.

### P1 — Google OAuth Needs Console Validation

Google OAuth config is present, but production sign-in should be validated in Google Cloud Console before public launch.

Check:

- Authorized redirect URI includes `https://promptseen.online/api/auth/callback/google`.
- OAuth consent screen is production-ready.

## Files Added / Changed

- `.gitignore`
- `wrangler.jsonc`
- `lib/backend.ts`
- `types/cloudflare-bindings.d.ts`
- `migrations/0001_promptseen_backend.sql`
- `backend-contract.json`
- `backend-contract.md`
- `deployment-report.md`
- `app/api/health/route.ts`
- `app/api/prompts/route.ts`
- `app/api/generations/route.ts`
- `app/api/entitlements/route.ts`
- `app/api/paypal/create-order/route.ts`
- `app/api/auth/google/status/route.ts`

## Quality Gate Self-Check

- Frontend machine-readable data contract: passed (`backend-contract.json`)
- Production secrets excluded from code: passed
- `.env.site` excluded from Git: passed
- D1 migration applied remotely: passed
- API endpoints publicly reachable: passed
- Custom domains attached: passed
- DNS points to Cloudflare: passed
- R2 storage ready: not passed, requires Cloudflare Dashboard R2 enablement
- Live payment flow: review-gated
- Live AI generation: review-gated

## Downstream Handoff

Frontend can now consume:

- Prompt data: `/api/prompts`
- Entitlements: `/api/entitlements?userId=anonymous`
- Generation job creation: `/api/generations`
- Runtime readiness: `/api/health`

Do not assume:

- Real AI image generation is live.
- PayPal capture/webhook flow is live.
- R2 uploads are enabled.
- Google OAuth has completed production console validation.

Recommended next phase:

- Frontend integration against these APIs.
- Enable R2 and implement signed upload flow.
- Add real auth/session middleware.
- Add PayPal webhook verification and entitlement updates.
- Enable real FAL execution only after content safety and cost controls are in place.

[NEEDS_REVIEW]
