import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import { addProduct, updateProductDetails, removeProduct, fetchProducts } from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.post("/", authenticate, authorizeAdmin, formidable(), addProduct);
router.put("/:id", authenticate, authorizeAdmin, formidable(), updateProductDetails);
router.delete("/:id", authenticate, authorizeAdmin, removeProduct);
router.get("/", fetchProducts);


export default router;