# Filipino Food API
 
An open-source REST API for Filipino cuisine data. Get structured information on Filipino dishes including ingredients, regional origins, occasion tags, flavor profiles, and AI-generated food photography.
 
## Base URL
 
```
http://localhost:8787 (local)
```
 
## Endpoints
 
### GET /
Health check.
 
### GET /dishes
Returns a paginated list of dishes.
 
**Query params:**
- `page` — page number (default: 1)
- `limit` — results per page (default: 10)
**Example:**
```
GET /dishes?page=1&limit=5
```
 
### GET /dishes/:id
Returns a single dish by ID.
 
**Example:**
```
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
