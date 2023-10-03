"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carMiddleware = void 0;
const errors_1 = require("../errors");
const repositories_1 = require("../repositories");
class CarMiddleware {
    async findByIdByThrow(req, res, next) {
        try {
            const { carId } = req.params;
            const car = await repositories_1.carRepository.findById(carId);
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
}
exports.carMiddleware = new CarMiddleware();
