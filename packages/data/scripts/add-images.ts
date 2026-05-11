import fs from "fs";
import path from "path";

const dishesDir = path.join(__dirname, "../dishes");
const files = fs
  .readdirSync(dishesDir)
  .filter((f) => f.endsWith(".json") && f !== "index.json");

for (const file of files) {
  const filePath = path.join(dishesDir, file);
  const dish = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  if (!dish.image_url) {
    const prompt = encodeURIComponent(
      `${dish.name} Filipino food photography overhead shot natural lighting`,
    );
    dish.image_url = `https://image.pollinations.ai/prompt/${prompt}`;
    dish.image_credit = "AI Generated (prototype - Pollinations.ai)";
    fs.writeFileSync(filePath, JSON.stringify(dish, null, 2));
    console.log(`✓ ${dish.name}`);
  } else {
    console.log(`skip ${dish.name} — already has image`);
  }
}
