import { Router } from "express";

import { carController } from "../controllers";
import { carMiddleware, commonMiddleware } from "../middlewares";
import { carSchema } from "../validations/carValidation";

const router = Router();

router.get("/", carController.getAll);

router.post(
  "/",
  commonMiddleware.isBodyValid(carSchema.create),
  carController.create,
);

router.get(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.findByIdByThrow,
  carController.findById,
);

router.put(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(carSchema.create),
  carMiddleware.findByIdByThrow,
  carController.updateByIdPut,
);

router.patch(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(carSchema.updateCarSchema),
  carMiddleware.findByIdByThrow,
  carController.updateByIdPatch,
);

router.delete(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.findByIdByThrow,
  carController.deleteById,
);

export const carRouter = router;
