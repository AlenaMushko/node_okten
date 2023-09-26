import { Router } from "express";

import { userController } from "../controllers";
import { userMiddleware } from "../middlewares";

const router = Router();

router.get("/", userController.findAll);

router.post("/", userController.create);

router.get("/:id", userMiddleware.findByIdByThrow, userController.findById);

router.put(
  "/:id",
  userMiddleware.UpdateByIdByThrow,
  userController.updateByIdPut,
);

router.patch(
  "/:id",
  userMiddleware.UpdateByIdPatchByThrow,
  userController.updateByIdPatch,
);

router.delete(
  "/:id",
  userMiddleware.findByIdByThrow,
  userController.deleteById,
);

export const userRouter = router;
