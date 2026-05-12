import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const dishesDir = path.join(__dirname, "../packages/data/dishes");
const files = fs
  .readdirSync(dishesDir)
  .filter((f) => f.endsWith(".json") && f !== "index.json");

async function downloadImage(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
  return response.arrayBuffer();
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

async function uploadToR2(
  key: string,
  imageBuffer: ArrayBuffer,
): Promise<string> {
  await s3.send(
    new PutObjectCommand({
      Bucket: "filipino-food-api-images",
      Key: key,
      Body: new Uint8Array(imageBuffer),
      ContentType: "image/jpeg",
    }),
  );

  return `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/filipino-food-api-images/${key}`;
}

async function main() {
  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(dishesDir, file);
    const dish = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!dish.image_url || dish.image_url.includes("r2.dev")) {
      console.log(`skip ${dish.name} — already on R2 or no image`);
      continue;
    }

    try {
      console.log(`Uploading ${dish.name}...`);
      const imageBuffer = await downloadImage(dish.image_url);
      const key = `dishes/${dish.id}.jpg`;
      const r2Url = await uploadToR2(key, imageBuffer);
      dish.image_url = r2Url;
      dish.image_credit =
        "AI Generated (fal.ai Realistic Vision) hosted on Cloudflare R2";
      fs.writeFileSync(filePath, JSON.stringify(dish, null, 2));
      console.log(`✓ ${dish.name}`);
      uploaded++;
    } catch (err) {
      console.error(`✗ ${dish.name} — ${err}`);
      failed++;
    }
  }

  console.log(`\n${uploaded} uploaded, ${failed} failed`);
}

main();
