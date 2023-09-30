import { Router } from "express";

import { authController } from "../controllers";
import { commonMiddleware } from "../middlewares";
import { userSchema } from "../validations";

const router = Router();

//singnup
router.post(
  "/register",
  commonMiddleware.isBodyValid(userSchema.create),
  authController.register,
);

//signin
router.post(
  "/login",
  commonMiddleware.isBodyValid(userSchema.create),
  authController.login,
);

export const authRouter = router;
