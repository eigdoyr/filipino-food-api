import { describe, it, expect } from "vitest";
import app from "../src/index";

describe("GET /", () => {
  it("returns 200 with health check shape", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);

    const body = (await res.json()) as any;
    expect(body.status).toBe("ok");
    expect(body.name).toBe("Filipino Food API");
    expect(body.version).toBeDefined();
    expect(body.author).toBe("ryodgie");
  });
});
