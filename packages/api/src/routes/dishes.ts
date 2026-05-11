import { Hono } from "hono";
import dishes from "../../../data/dishes/index.json";

const router = new Hono();

router.get("/", (c) => {
  const page = Number(c.req.query("page") ?? 1);
  const limit = Number(c.req.query("limit") ?? 10);

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = dishes.slice(start, end);

  return c.json({
    data: paginated,
    meta: {
      total: dishes.length,
      page,
      limit,
      pages: Math.ceil(dishes.length / limit),
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
