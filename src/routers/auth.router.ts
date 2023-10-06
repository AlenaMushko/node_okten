import { Router } from "express";

import { authController } from "../controllers";
import {
  authenticateMiddleware,
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { userSchema } from "../validations";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(userSchema.create),
  authMiddleware.uniqueEmail,
  authController.register,
);

router.get(
  "/activated/:actionToken",
  authMiddleware.isActivated,
  authMiddleware.activatedUser,
  authController.activatedUser,
);

//якщо верифікаційний лист загубився, відправити ще один
router.post(
  "/activated",
  commonMiddleware.isBodyValid(userSchema.activated),
  authMiddleware.activatedAgainUser,
  authController.activatedAgainUser,
);

router.post(
  "/forgotPassword",
  commonMiddleware.isBodyValid(userSchema.activated),
  authMiddleware.isUserByEmail,
  authController.forgotPassword,
);

router.get(
  "/reset-password/:resetToken",
  commonMiddleware.isBodyValid(userSchema.login),
  authMiddleware.isForgotPassword,
  userMiddleware.findByIdByThrow,
  authController.resetPassword,
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(userSchema.login),
  authMiddleware.loginError,
  authenticateMiddleware.isUserVerify,
  authController.login,
);

router.post(
  "/refreshToken",
  authenticateMiddleware.refreshToken,
  authMiddleware.refreshToken,
  authController.refreshToken,
);

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

router.delete("/logout", authenticateMiddleware.isLogin, authController.logout);

export const authRouter = router;
