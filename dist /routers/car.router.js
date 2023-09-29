"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const carValidation_1 = require("../validations/carValidation");
const router = (0, express_1.Router)();
router.get("/", controllers_1.carController.getAll);
router.post("/", middlewares_1.commonMiddleware.isBodyValid(carValidation_1.carSchema.create), controllers_1.carController.create);
router.get("/:carId", middlewares_1.commonMiddleware.isIdValid("carId"), middlewares_1.carMiddleware.findByIdByThrow, controllers_1.carController.findById);
router.put("/:carId", middlewares_1.commonMiddleware.isIdValid("carId"), middlewares_1.commonMiddleware.isBodyValid(carValidation_1.carSchema.create), controllers_1.carController.updateByIdPut);
router.patch("/:carId", middlewares_1.commonMiddleware.isIdValid("carId"), middlewares_1.commonMiddleware.isBodyValid(carValidation_1.carSchema.updateCarSchema), controllers_1.carController.updateByIdPatch);
router.delete("/:carId", middlewares_1.commonMiddleware.isIdValid("carId"), middlewares_1.carMiddleware.findByIdByThrow, controllers_1.carController.deleteById);
exports.carRouter = router;