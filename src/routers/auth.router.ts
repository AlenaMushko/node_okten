import { Router } from "express";

import { authController } from "../controllers";

const router = Router();

router.get("/register", authController.register);

router.get("/login", authController.login);

export const authRouter = router;
