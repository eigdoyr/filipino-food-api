import fs from "fs";
import path from "path";

const dishesDir = path.join(__dirname, "../packages/data/dishes");
const files = fs
  .readdirSync(dishesDir)
  .filter((f) => f.endsWith(".json") && f !== "index.json");

const dishes = files.map((file) => {
  const raw = fs.readFileSync(path.join(dishesDir, file), "utf-8");
  return JSON.parse(raw);
});

const output = path.join(dishesDir, "index.json");
fs.writeFileSync(output, JSON.stringify(dishes, null, 2));

console.log(`Built index with ${dishes.length} dishes`);
