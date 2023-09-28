"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carMiddleware = void 0;
const errors_1 = require("../errors");
const Car_model_1 = require("../models/Car.model");
const repositories_1 = require("../repositories");
const carValidation_1 = require("../validations/carValidation");
class CarMiddleware {
    async findByIdByThrow(req, res, next) {
        try {
            const { id } = req.params;
            const car = await repositories_1.carRepository.findById(id);
            if (!car) {
                throw new errors_1.ApiError("Car not found", 404);
            }
            res.locals.car = car;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async updateByIdByThrow(req, res, next) {
        try {
            const { id } = req.params;
            const car = await Car_model_1.Car.findById(id);
            if (!car) {
                throw new errors_1.ApiError("Car not found", 404);
            }
            const { error } = carValidation_1.carSchema.create.validate(req.body);
            if (error) {
                throw new errors_1.ApiError("Validation failed", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async updateByIdPatchByThrow(req, res, next) {
        try {
            const { id } = req.params;
            const car = await Car_model_1.Car.findById(id);
            if (!car) {
                throw new errors_1.ApiError("Car not found", 404);
            }
            const { error } = carValidation_1.carSchema.updateCarSchema.validate(req.body);
            if (error) {
                throw new errors_1.ApiError("Validation failed", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carMiddleware = new CarMiddleware();
