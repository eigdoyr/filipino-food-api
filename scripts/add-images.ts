import fs from "fs";
import path from "path";
import { fal } from "@fal-ai/client";

const dishesDir = path.join(__dirname, "../packages/data/dishes");
const files = fs
  .readdirSync(dishesDir)
  .filter((f) => f.endsWith(".json") && f !== "index.json");

fal.config({
  credentials: process.env.FAL_API_KEY,
});

async function generateImage(
  dishName: string,
  description: string,
): Promise<string> {
  const result = await fal.subscribe("fal-ai/realistic-vision", {
    input: {
      prompt: `A professional food photography shot of ${dishName}, ${description}. Close up shot, overhead angle, served in a traditional Filipino ceramic bowl or plate, plain dark wooden table, soft natural window light from the side, shallow depth of field, sharp focus on the food only`,
      negative_prompt:
        "cartoon, illustration, painting, drawing, unrealistic, blurry, extra dishes, cluttered table, people, hands, text, watermark, props, garnish, flowers, colorful background, busy background",
      image_size: "square_hd",
      num_images: 1,
    },
  });
  return (result.data as any).images[0].url;
}

async function main() {
  console.log("FAL_API_KEY set:", !!process.env.FAL_API_KEY);
  for (const file of files) {
    const filePath = path.join(dishesDir, file);
    const dish = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (dish.id) {
      try {
        console.log(`Generating image for ${dish.name}...`);
        const imageUrl = await generateImage(dish.name, dish.description);
        dish.image_url = imageUrl;
        dish.image_credit = "AI Generated (fal.ai Realistic Vision)";
        fs.writeFileSync(filePath, JSON.stringify(dish, null, 2));
        console.log(`✓ ${dish.name}`);
        await new Promise((r) => setTimeout(r, 500));
      } catch (err) {
        console.error(`✗ ${dish.name} — ${err}`);
      }
    } else {
      console.log(`skip ${dish.name} — already has image`);
    }
  }
}

main();
