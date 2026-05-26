import { Hono } from "hono";
import dishes from "../../../data/dishes/index.json";
import { errorResponse } from "../middleware/error";

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
    return c.json(
      errorResponse("Query parameter q is required", "MISSING_QUERY", 400),
      400,
    );
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

router.get("/stats", (c) => {
  const countBy = (
    key: "type" | "occasion" | "flavor_profile" | "cooking_method",
  ) => {
    const counts: Record<string, number> = {};
    for (const dish of dishes) {
      for (const value of dish[key]) {
        counts[value] = (counts[value] ?? 0) + 1;
      }
    }
    return counts;
  };

  const byRegion: Record<string, number> = {};
  for (const dish of dishes) {
    if (dish.origin_region) {
      byRegion[dish.origin_region] = (byRegion[dish.origin_region] ?? 0) + 1;
    }
  }

  const ingredientCounts: Record<string, number> = {};
  for (const dish of dishes) {
    for (const ingredient of dish.main_ingredients) {
      ingredientCounts[ingredient] = (ingredientCounts[ingredient] ?? 0) + 1;
    }
  }

  const topIngredients = Object.entries(ingredientCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return c.json({
    data: {
      total_dishes: dishes.length,
      by_type: countBy("type"),
      by_occasion: countBy("occasion"),
      by_region: byRegion,
      by_flavor: countBy("flavor_profile"),
      by_cooking_method: countBy("cooking_method"),
      top_ingredients: topIngredients,
    },
  });
});

router.get("/:id", (c) => {
  const id = c.req.param("id");
  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    return c.json(errorResponse("Dish not found", "NOT_FOUND", 404), 404);
  }

  return c.json({ data: dish });
});

export default router;
