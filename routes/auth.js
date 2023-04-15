import express from "express";
import { logout, register } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);

export default router;