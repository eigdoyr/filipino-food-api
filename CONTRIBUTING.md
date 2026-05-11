# Contributing to Filipino Food API

Thanks for helping grow this project! Here's how to add a dish or improve existing data.

## Adding a Dish

1. Fork the repo and create a branch:

   ```bash
   git checkout -b feat/add-dish-name
   ```

2. Create a new JSON file under `packages/data/dishes/`:

   ```bash
   touch packages/data/dishes/your-dish.json
   ```

3. Use this structure:

   ```json
   {
     "id": "your-dish",
     "name": "Your Dish",
     "description": "2-3 sentences. What it is, how it tastes, why it matters.",
     "type": ["main_dish"],
     "main_ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"],
     "occasion": ["everyday"],
     "flavor_profile": ["savory"],
     "cooking_method": ["stewed"],
     "origin_region": "Region (only if the dish genuinely originates from there)",
     "tags": ["tag1", "tag2"]
   }
   ```

4. Run the validator to make sure your dish passes:

   ```bash
   npm run validate
   ```

5. Rebuild the index:

   ```bash
   npm run build:index
   ```

6. Commit using conventional commits:

   ```bash
   git commit -m "feat(data): add your-dish"
   ```

7. Open a Pull Request.

## Field Rules

- `id` — lowercase slug only, e.g. `kare-kare`, `bicol-express`
- `description` — minimum 20 characters, maximum 300. No fluff.
- `type` — must use valid values from the schema enum
- `main_ingredients` — top 3 to 5 ingredients only, not a full recipe list
- `origin_region` — only set if the dish genuinely originates from that region. Leave it out if the dish is nationwide or origin is unclear.
- `image_url` — leave empty, images are handled separately

## Valid Enum Values

**type:** `main_dish`, `soup`, `dessert`, `snack`, `appetizer`, `breakfast`, `rice_dish`, `noodle_dish`, `kakanin`, `bread_pastry`, `side_dish`, `condiment`, `beverage`, `street_food`

**occasion:** `everyday`, `breakfast`, `merienda`, `fiesta`, `christmas`, `media_noche`, `new_year`, `birthday`, `wedding`, `lent`, `party`, `potluck`, `pulutan`, `cold_weather`, `street_food`

**flavor_profile:** `savory`, `sweet`, `sour`, `spicy`, `bitter`, `umami`, `salty`

**cooking_method:** `grilled`, `stewed`, `fried`, `steamed`, `baked`, `boiled`, `roasted`, `sauteed`, `cured`, `smoked`, `raw`

## Fixing Existing Data

Found a mistake? Open an issue or submit a PR with the fix and a brief explanation of what was wrong.

## Questions

Open a GitHub Issue and tag it with the `question` label.
