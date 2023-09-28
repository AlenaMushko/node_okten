import { Router } from "express";

import { userController } from "../controllers";
import { commonMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.get("/", userController.findAll);

router.post("/", userController.create);

router.get(
  "/:id",
  commonMiddleware.isIdWalid,
  userMiddleware.findByIdByThrow,
  userController.findById,
);

router.put(
  "/:id",
  commonMiddleware.isIdWalid,
  userMiddleware.UpdateByIdByThrow,
  userController.updateByIdPut,
);

router.patch(
  "/:id",
  commonMiddleware.isIdWalid,
  userMiddleware.UpdateByIdPatchByThrow,
  userController.updateByIdPatch,
);

router.delete(
  "/:id",
  commonMiddleware.isIdWalid,
  userMiddleware.findByIdByThrow,
  userController.deleteById,
);

export const userRouter = router;
