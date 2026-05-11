import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";

const router = new Hono();

const spec = {
  openapi: "3.0.0",
  info: {
    title: "Filipino Food API",
    version: "1.1.0",
    description: "An open-source REST API for Filipino cuisine data.",
  },
  paths: {
    "/": {
      get: {
        summary: "Health check",
        responses: {
          "200": { description: "API is running" },
        },
      },
    },
    "/v1/dishes": {
      get: {
        summary: "List all dishes",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "limit", in: "query", schema: { type: "integer" } },
          { name: "type", in: "query", schema: { type: "string" } },
          { name: "occasion", in: "query", schema: { type: "string" } },
          { name: "region", in: "query", schema: { type: "string" } },
        ],
        responses: {
          "200": { description: "Paginated list of dishes" },
        },
      },
    },
    "/v1/dishes/search": {
      get: {
        summary: "Search dishes",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Matching dishes" },
          "400": { description: "Missing query parameter" },
        },
      },
    },
    "/v1/dishes/regions": {
      get: {
        summary: "List all regions with dish counts",
        responses: {
          "200": { description: "List of regions" },
        },
      },
    },
    "/v1/dishes/{id}": {
      get: {
        summary: "Get a single dish by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Dish data" },
          "404": { description: "Dish not found" },
        },
      },
    },
  },
};

router.get("/", swaggerUI({ url: "/docs/spec" }));
router.get("/spec", (c) => c.json(spec));

export default router;
