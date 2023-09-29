import { Router } from "express";

import { userController } from "../controllers";
import { commonMiddleware, userMiddleware } from "../middlewares";
import { userSchema } from "../validations";

const router = Router();

router.get("/", userController.findAll);

router.post(
  "/",
  commonMiddleware.isBodyValid(userSchema.create),
  userController.create,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.findByIdByThrow,
  userController.findById,
);

router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(userSchema.create),
  userController.updateByIdPut,
);

router.patch(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(userSchema.updateUserSchema),
  userController.updateByIdPatch,
);

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.findByIdByThrow,
  userController.deleteById,
);

export const userRouter = router;
