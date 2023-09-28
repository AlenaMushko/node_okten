import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Car } from "../models/Car.model";
import { carRepository } from "../repositories";
import { carSchema } from "../validations/carValidation";

class CarMiddleware {
  public async findByIdByThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const car = await carRepository.findById(id);

      if (!car) {
        throw new ApiError("Car not found", 404);
      }

      res.locals.car = car;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async updateByIdByThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const car = await Car.findById(id);

      if (!car) {
        throw new ApiError("Car not found", 404);
      }

      const { error } = carSchema.create.validate(req.body);

      if (error) {
        throw new ApiError("Validation failed", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async updateByIdPatchByThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const car = await Car.findById(id);

      if (!car) {
        throw new ApiError("Car not found", 404);
      }
      const { error } = carSchema.updateCarSchema.validate(req.body);

      if (error) {
        throw new ApiError("Validation failed", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarMiddleware();
