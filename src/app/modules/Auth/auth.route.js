import express from "express";
import { authControllers } from "./auth.controller.js";
const router = express.Router();

router.post("/signin", authControllers.loginUser);

router.post("/refresh-token", authControllers.refreshToken);
export const authRoutes = router;
