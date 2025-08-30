import express from "express";
import { createUser,loginUser,logoutUser,getAllUsers,getCurrentUserProfile,updateCurrentUserProfile,deleteUserById,getUserById,updateUserById } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/",createUser);
router.get("/",authenticate,authorizeAdmin,getAllUsers);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/profile",authenticate,getCurrentUserProfile);
router.put("/profile",authenticate,updateCurrentUserProfile);

//Admin Routes

router.delete("/:id",authenticate,authorizeAdmin,deleteUserById)
router.get("/:id",authenticate,authorizeAdmin,getUserById)
router.put("/:id",authenticate,authorizeAdmin,updateUserById)

export default router;