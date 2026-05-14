import fs from "fs";
import path from "path";
import sizeOf from "image-size";

const dishesDir = path.join(__dirname, "../packages/data/dishes");
const files = fs
  .readdirSync(dishesDir)
  .filter((f) => f.endsWith(".json") && f !== "index.json");

async function main() {
  let updated = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(dishesDir, file);
    const dish = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!dish.image_url) {
      console.log(`skip ${dish.name} — no image_url`);
      continue;
    }

    try {
      const response = await fetch(dish.image_url);
      const buffer = Buffer.from(await response.arrayBuffer());
      const dimensions = sizeOf(buffer);

      dish.image_width = dimensions.width;
      dish.image_height = dimensions.height;

      fs.writeFileSync(filePath, JSON.stringify(dish, null, 2));
      console.log(`✓ ${dish.name} (${dimensions.width}x${dimensions.height})`);
      updated++;
    } catch (err) {
      console.error(`✗ ${dish.name} — ${err}`);
      failed++;
    }
  }

  console.log(`\n${updated} updated, ${failed} failed`);
}

main();
