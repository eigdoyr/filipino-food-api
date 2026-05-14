import { S3Client, CopyObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const dishesDir = path.join(__dirname, "../packages/data/dishes");
const files = fs
  .readdirSync(dishesDir)
  .filter((f) => f.endsWith(".json") && f !== "index.json");

async function main() {
  let updated = 0;
  let failed = 0;

  for (const file of files) {
    const dish = JSON.parse(
      fs.readFileSync(path.join(dishesDir, file), "utf-8"),
    );
    const key = `dishes/${dish.id}.jpg`;

    try {
      await s3.send(
        new CopyObjectCommand({
          Bucket: "filipino-food-api-images",
          CopySource: `filipino-food-api-images/${key}`,
          Key: key,
          MetadataDirective: "REPLACE",
          CacheControl: "public, max-age=31536000, immutable",
          ContentType: "image/jpeg",
        }),
      );
      console.log(`✓ ${dish.name}`);
      updated++;
    } catch (err) {
      console.error(`✗ ${dish.name} — ${err}`);
      failed++;
    }
  }

  console.log(`\n${updated} updated, ${failed} failed`);
}

main();
