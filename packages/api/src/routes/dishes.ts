import { Hono } from "hono";
import dishes from "../../../data/dishes/index.json";

const router = new Hono();

router.get("/", (c) => {
  const page = Number(c.req.query("page") ?? 1);
  const limit = Number(c.req.query("limit") ?? 10);
  const type = c.req.query("type");
  const occasion = c.req.query("occasion");
  const region = c.req.query("region");

  let filtered = dishes;

  if (type) {
    filtered = filtered.filter((d) => d.type.includes(type));
  }

  if (occasion) {
    filtered = filtered.filter((d) => d.occasion.includes(occasion));
  }

  if (region) {
    filtered = filtered.filter(
      (d) => d.origin_region?.toLowerCase() === region.toLowerCase(),
    );
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return c.json({
    data: paginated,
    meta: {
      total: filtered.length,
      page,
      limit,
      pages: Math.ceil(filtered.length / limit),
    },
  });
});

router.get("/:id", (c) => {
  const id = c.req.param("id");
  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    return c.json({ error: `Dish not found: ${id}` }, 404);
  }

  return c.json({ data: dish });
});

export default router;
