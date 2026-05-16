import { describe, it, expect } from "vitest";
import app from "../src/index";

describe("GET /v1/dishes", () => {
  it("returns 200 with pagination meta", async () => {
    const res = await app.request("/v1/dishes");
    expect(res.status).toBe(200);

    const body = (await res.json()) as any;
    expect(body.data).toBeInstanceOf(Array);
    expect(body.meta.total).toBeGreaterThan(0);
    expect(body.meta.page).toBe(1);
    expect(body.meta.limit).toBe(10);
  });

  it("respects pagination params", async () => {
    const res = await app.request("/v1/dishes?page=2&limit=5");
    const body = (await res.json()) as any;
    expect(body.meta.page).toBe(2);
    expect(body.meta.limit).toBe(5);
    expect(body.data.length).toBeLessThanOrEqual(5);
  });

  it("filters by type", async () => {
    const res = await app.request("/v1/dishes?type=soup");
    const body = (await res.json()) as any;
    expect(body.data.every((d: any) => d.type.includes("soup"))).toBe(true);
  });
});

describe("GET /v1/dishes/:id", () => {
  it("returns 200 for valid dish", async () => {
    const res = await app.request("/v1/dishes/adobo");
    expect(res.status).toBe(200);

    const body = (await res.json()) as any;
    expect(body.data.id).toBe("adobo");
    expect(body.data.name).toBe("Adobo");
  });

  it("returns 404 for invalid dish", async () => {
    const res = await app.request("/v1/dishes/not-a-real-dish");
    expect(res.status).toBe(404);

    const body = (await res.json()) as any;
    expect(body.error.code).toBe("NOT_FOUND");
  });
});

describe("GET /v1/dishes/search", () => {
  it("returns 200 with matching results", async () => {
    const res = await app.request("/v1/dishes/search?q=pork");
    expect(res.status).toBe(200);

    const body = (await res.json()) as any;
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.query).toBe("pork");
  });

  it("returns 400 without query", async () => {
    const res = await app.request("/v1/dishes/search");
    expect(res.status).toBe(400);

    const body = (await res.json()) as any;
    expect(body.error.code).toBe("MISSING_QUERY");
  });
});

describe("GET /v1/dishes/regions", () => {
  it("returns 200 with region array", async () => {
    const res = await app.request("/v1/dishes/regions");
    expect(res.status).toBe(200);

    const body = (await res.json()) as any;
    expect(body.data).toBeInstanceOf(Array);
    expect(body.data[0]).toHaveProperty("name");
    expect(body.data[0]).toHaveProperty("dish_count");
  });
});
