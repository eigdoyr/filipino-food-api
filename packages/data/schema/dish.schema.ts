import { z } from "zod";

export const DishType = z.enum([
  "main_dish",
  "soup",
  "dessert",
  "snack",
  "appetizer",
  "breakfast",
  "rice_dish",
  "noodle_dish",
  "kakanin",
  "bread_pastry",
  "side_dish",
  "condiment",
  "beverage",
  "street_food",
]);

export const Occasion = z.enum([
  "everyday",
  "breakfast",
  "merienda",
  "fiesta",
  "christmas",
  "media_noche",
  "new_year",
  "birthday",
  "wedding",
  "lent",
  "party",
  "potluck",
  "pulutan",
  "cold_weather",
  "street_food",
]);

export const FlavorProfile = z.enum([
  "savory",
  "sweet",
  "sour",
  "spicy",
  "bitter",
  "umami",
  "salty",
]);

export const CookingMethod = z.enum([
  "grilled",
  "stewed",
  "fried",
  "steamed",
  "baked",
  "boiled",
  "roasted",
  "sauteed",
  "cured",
  "smoked",
  "raw",
]);

export const DishSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must be a lowercase slug"),
  name: z.string().min(2).max(100),
  local_name: z.string().min(2).max(100).optional(),
  description: z.string().min(20).max(300),
  type: z.array(DishType).min(1),
  main_ingredients: z.array(z.string()).min(1).max(5),
  occasion: z.array(Occasion).min(1),
  flavor_profile: z.array(FlavorProfile).min(1),
  cooking_method: z.array(CookingMethod).min(1),
  origin_region: z.string().optional(),
  image_url: z.string().url().optional(),
  image_credit: z.string().optional(),
  tags: z.array(z.string()).max(10),
});

export type Dish = z.infer<typeof DishSchema>;
