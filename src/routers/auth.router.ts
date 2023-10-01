import { Router } from "express";

import { authController } from "../controllers";
import {
  authenticateMiddleware,
  authMiddleware,
  commonMiddleware,
} from "../middlewares";
import { userSchema } from "../validations";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(userSchema.create),
  authMiddleware.uniqueEmail,
  authController.register,
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(userSchema.login),
  authMiddleware.loginError,
  authController.login,
);

router.post("/logout", authenticateMiddleware.isLogin, authController.logout);

router.get(
  "/current",
  authenticateMiddleware.isLogin,
  authController.currentUser,
);

router.patch(
  "/update",
  authenticateMiddleware.isLogin,
  authController.updateUser,
);

export const authRouter = router;
