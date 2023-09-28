import { Router } from "express";

import { carController } from "../controllers";
import { carMiddleware, commonMiddleware } from "../middlewares";

const router = Router();

router.get("/", carController.getAll);

router.post("/", carController.create);

router.get(
  "/:id",
  commonMiddleware.isIdWalid,
  carMiddleware.findByIdByThrow,
  carController.findById,
);

router.put(
  "/:id",
  commonMiddleware.isIdWalid,
  carMiddleware.updateByIdByThrow,
  carController.updateByIdPut,
);

router.patch(
  "/:id",
  commonMiddleware.isIdWalid,
  carMiddleware.updateByIdPatchByThrow,
  carController.updateByIdPatch,
);

router.delete(
  "/:id",
  commonMiddleware.isIdWalid,
  carMiddleware.findByIdByThrow,
  carController.deleteById,
);

export const carRouter = router;
