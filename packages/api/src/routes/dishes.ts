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

router.get("/search", (c) => {
  const q = c.req.query("q")?.toLowerCase();

  if (!q) {
    return c.json({ error: "Query parameter q is required" }, 400);
  }

  const results = dishes.filter((d) => {
    return (
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q)) ||
      d.main_ingredients.some((i) => i.toLowerCase().includes(q))
    );
  });

  return c.json({
    data: results,
    query: q,
    total: results.length,
  });
});

router.get("/regions", (c) => {
  const regions = dishes
    .filter((d) => d.origin_region)
    .reduce(
      (acc, d) => {
        const region = d.origin_region as string;
        acc[region] = (acc[region] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

  const data = Object.entries(regions).map(([name, dish_count]) => ({
    name,
    dish_count,
  }));

  return c.json({ data, total: data.length });
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
