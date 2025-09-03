import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import checkId from "../middlewares/checkId.js";
import { addProduct, updateProductDetails, removeProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts } from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.post("/", authenticate, authorizeAdmin, formidable(), addProduct);
router.get("/", fetchProducts);
router.get("/allproducts", fetchAllProducts);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.post("/filtered-products", filterProducts);
router.put("/:id", authenticate, authorizeAdmin, formidable(), updateProductDetails);
router.delete("/:id", authenticate, authorizeAdmin, removeProduct);
router.get("/:id", fetchProductById);
router.post("/:id/reviews", authenticate, checkId, addProductReview);


export default router;