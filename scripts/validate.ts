import fs from "fs";
import path from "path";
import { DishSchema } from "../packages/data/schema/dish.schema";

const dishesDir = path.join(__dirname, "../packages/data/dishes");
const files = fs
  .readdirSync(dishesDir)
  .filter((f) => f.endsWith(".json") && f !== "index.json");

let passed = 0;
let failed = 0;

for (const file of files) {
  const filePath = path.join(dishesDir, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  const result = DishSchema.safeParse(data);

  if (result.success) {
    console.log(`✓ ${file}`);
    passed++;
  } else {
    console.error(`✗ ${file}`);
    console.error(result.error.format());
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
