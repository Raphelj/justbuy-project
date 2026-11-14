import path from "path";
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const router = express.Router();

// Memory storage for direct streaming to Cloudinary or fallback to disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).send({ message: "No image file provided" });
    }

    // If Cloudinary credentials are configured, upload to Cloudinary
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "justbuy" },
        (error, result) => {
          if (error) {
            return res.status(500).send({ message: error.message });
          }
          return res.status(200).send({
            message: "Image uploaded successfully to Cloudinary",
            image: result.secure_url,
          });
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    } else {
      // Local fallback in case Cloudinary keys are not set
      const fs = await import("fs");
      const uploadDir = "uploads/";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      const filename = `${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`;
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, req.file.buffer);

      return res.status(200).send({
        message: "Image uploaded locally",
        image: `/${filePath.replace(/\\/g, "/")}`,
      });
    }
  });
});

export default router;