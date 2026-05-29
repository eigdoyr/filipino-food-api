# Changelog

All notable changes to this project will be documented here.

## [1.3.0] — May 2026

### Added

- `GET /v1/dishes/stats` endpoint with aggregate statistics
- PR template for contributors
- Pull-request based workflow with branch protection

### Fixed

- `.wrangler` build artifacts no longer tracked in git

## [1.2.0] — May 2026

### Added

- AI-generated food photography for all 100 dishes via fal.ai Realistic Vision
- Cloudflare R2 bucket for permanent image hosting
- Images served via public CDN — no expiry, no third-party dependency
- `upload-to-r2.ts` script for bulk image uploads
- `update-r2-urls.ts` script for URL migration

## [1.1.0] — May 2026

### Added

- API versioning — all routes now prefixed with `/v1`
- Security headers middleware (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)
- Max query string length validation (256 character limit)
- Standardized error response shape across all endpoints
- GitHub Issue templates (Add Dish, Fix Data, Bug Report)
- `SECURITY.md` with responsible disclosure policy
- `.env.example` with documented environment variables
- README badges (build status, license, version, dish count)

### Changed

- Scripts moved from `packages/data/scripts/` to top-level `scripts/`
- Health check response updated to include `version` and `docs` URL

## [1.0.0] — May 2026

### Added

- 100 Filipino dish entries with AI-generated images via Pollinations.ai
- `GET /dishes` with pagination and filtering by type, occasion, region
- `GET /dishes/:id` with 404 handling
- `GET /dishes/search` full-text search across name, description, tags, ingredients
- `GET /dishes/regions` with dish counts per region
- Rate limiting — 60 requests/minute per IP via Cloudflare KV
- CORS middleware — open to all origins
- Swagger UI at `/docs`
- Deployed to Cloudflare Workers
- GitHub Actions CI for dataset validation

## [0.2.0] — May 2026

### Added

- `GET /search` endpoint
- `GET /regions` endpoint
- Filtering by type, occasion, region
- Pagination
- Rate limiting middleware
- OpenAPI spec and Swagger UI

## [0.1.0] — May 2026

### Added

- Zod dish schema with enums and strict validation
- 50 Filipino dish seed dataset
- Data validation script
- Basic Hono.js API on Cloudflare Workers
- `GET /dishes` and `GET /dishes/:id` endpoints
- GitHub Actions CI
- README and CONTRIBUTING guide
