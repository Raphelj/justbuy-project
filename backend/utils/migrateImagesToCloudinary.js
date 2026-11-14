import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

const migrateImages = async () => {
  try {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error(
        "❌ Missing Cloudinary credentials in .env file! Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
      );
      process.exit(1);
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");

    const products = await Product.find({});
    console.log(`Found ${products.length} products to check.\n`);

    for (const product of products) {
      const currentImage = product.image;

      // Skip if already on Cloudinary
      if (currentImage && currentImage.includes("cloudinary.com")) {
        console.log(`⏭️  Skipping "${product.name}" (already on Cloudinary)`);
        continue;
      }

      console.log(`🔄 Migrating image for: "${product.name}"...`);

      try {
        let uploadResult;

        if (currentImage && currentImage.startsWith("http")) {
          // Upload directly from remote URL (e.g. Unsplash)
          uploadResult = await cloudinary.uploader.upload(currentImage, {
            folder: "justbuy/products",
          });
        } else if (currentImage && currentImage.includes("uploads")) {
          // Upload local file from uploads folder
          const localFilePath = path.join(
            process.cwd(),
            currentImage.replace(/\\/g, "/")
          );

          if (fs.existsSync(localFilePath)) {
            uploadResult = await cloudinary.uploader.upload(localFilePath, {
              folder: "justbuy/products",
            });
          } else {
            console.warn(
              `⚠️ Local file not found: ${localFilePath}. Skipping.`
            );
            continue;
          }
        } else {
          console.warn(`⚠️ Unrecognized image format: ${currentImage}. Skipping.`);
          continue;
        }

        // Update product in database with Cloudinary URL
        product.image = uploadResult.secure_url;
        await product.save();

        console.log(`✅ Uploaded to: ${uploadResult.secure_url}\n`);
      } catch (err) {
        console.error(
          `❌ Failed to migrate "${product.name}":`,
          err.message,
          "\n"
        );
      }
    }

    console.log("🎉 Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exit(1);
  }
};

migrateImages();

