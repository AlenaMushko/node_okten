import { Router } from "express";

import { carController } from "../controllers";
import {
  authenticateMiddleware,
  carMiddleware,
  commonMiddleware,
} from "../middlewares";
import { carSchema } from "../validations/carValidation";

const router = Router();

router.get(
  "/",
  commonMiddleware.isQueryValid(carSchema.queryCarSchema),
  carController.getAll,
);

router.get("/owner", authenticateMiddleware.isLogin, carController.getAllOwner);

router.post(
  "/",
  authenticateMiddleware.isLogin,
  commonMiddleware.isBodyValid(carSchema.create),
  carController.create,
);

router.get(
  "/:carId",
  authenticateMiddleware.isLogin,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.findByIdByThrow,
  carController.findById,
);

router.put(
  "/:carId",
  authenticateMiddleware.isLogin,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(carSchema.create),
  carMiddleware.findByIdByThrow,
  carController.updateByIdPut,
);

router.patch(
  "/:carId",
  authenticateMiddleware.isLogin,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(carSchema.updateCarSchema),
  carMiddleware.findByIdByThrow,
  carController.updateByIdPatch,
);

router.delete(
  "/:carId",
  authenticateMiddleware.isLogin,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.findByIdByThrow,
  carController.deleteById,
);

export const carRouter = router;
