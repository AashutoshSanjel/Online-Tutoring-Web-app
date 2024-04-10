import express from "express";
import { getUser, login, logout, register, getAllUsers, deleteUser } from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized, logout);
router.get("/getuser", isAuthorized, getUser);
router.get("/allusers", isAuthorized, isAdmin, getAllUsers);
router.delete("/user/:userId", isAuthorized, isAdmin, deleteUser); // New delete route

export default router;
