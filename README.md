# Filipino Food API

![Build](https://github.com/eigdoyr/filipino-food-api/actions/workflows/validate.yml/badge.svg)
![License](https://img.shields.io/github/license/eigdoyr/filipino-food-api)
![Version](https://img.shields.io/badge/version-1.1.0-blue)
![Dishes](https://img.shields.io/badge/dishes-100-green)

An open-source REST API for Filipino cuisine data. Get structured information on Filipino dishes including ingredients, regional origins, occasion tags, flavor profiles, and AI-generated food photography.

## API Documentation

Interactive docs available at:

[View API Docs](https://filipino-food-api.ryodgie.workers.dev/docs)

## Base URL

```text
http://localhost:8787 (local)
https://filipino-food-api.workers.dev (production)
```

## Endpoints

### GET /docs

Interactive API documentation (Swagger UI).

### GET /

Health check.

### GET /dishes

Returns a paginated list of dishes.

**Query params:**

- `page` — page number (default: 1)
- `limit` — results per page (default: 10)
  **Example:**

```http
GET /dishes?page=1&limit=5
```

### GET /dishes/search

Search dishes by name, description, ingredients, or tags.

**Query params:**

- `q` — search query (required)

**Example:**

```http
GET /dishes/search?q=pork
GET /dishes/search?q=coconut milk
```

### GET /dishes/regions

Returns all regions that have at least one dish, with dish counts.

**Example:**

```http
GET /dishes/regions
```

### GET /dishes with filters

Filter dishes by type, occasion, or region.

**Query params:**

- `type` — e.g. `soup`, `main_dish`, `kakanin`
- `occasion` — e.g. `christmas`, `pulutan`, `everyday`
- `region` — e.g. `Bicol`, `Ilocos`

**Example:**

```http
GET /dishes?type=soup
GET /dishes?occasion=christmas
GET /dishes?region=Bicol
```

### GET /dishes/:id

Returns a single dish by ID.

**Example:**

```http
GET /dishes/adobo
GET /dishes/sinigang
```

## Running Locally

```bash
git clone https://github.com/eigdoyr/filipino-food-api.git
cd filipino-food-api
npm install
npm run dev
```

API will be available at `http://localhost:8787`.

## Validate Dataset

```bash
npm run validate
```

## Contributing

Want to add a dish? Check [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
