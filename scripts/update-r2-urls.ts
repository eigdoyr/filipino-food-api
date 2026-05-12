import fs from "fs";
import path from "path";

const dishesDir = path.join(__dirname, "../packages/data/dishes");
const files = fs
  .readdirSync(dishesDir)
  .filter((f) => f.endsWith(".json") && f !== "index.json");

const PUBLIC_URL = "https://pub-2e1172f9672f425f9d4a549a832fbd21.r2.dev";

for (const file of files) {
  const filePath = path.join(dishesDir, file);
  const dish = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  if (dish.image_url && dish.image_url.includes("r2.cloudflarestorage.com")) {
    const key = `dishes/${dish.id}.jpg`;
    dish.image_url = `${PUBLIC_URL}/${key}`;
    fs.writeFileSync(filePath, JSON.stringify(dish, null, 2));
    console.log(`✓ ${dish.name}`);
  }
}

console.log("Done");
