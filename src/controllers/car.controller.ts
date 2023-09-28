import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { carService } from "../services";
import { ICar } from "../types";
import { carSchema } from "../validations/carValidation";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar[]> | undefined> {
    try {
      const cars = await carService.getAll();
      return res.status(200).json(cars);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar> | undefined> {
    try {
      const { error, value } = carSchema.create.validate(req.body);
      if (error) {
        throw new ApiError("Validation failed", 400);
      }
      const newCar = await carService.create(value);
      return res.status(201).json({ message: "Car is created", car: newCar });
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar> | undefined> {
    try {
      const car = res.locals.car;

      return res.status(200).json({ data: car });
    } catch (e) {
      next(e);
    }
  }

  public async updateByIdPut(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar> | undefined> {
    try {
      const { id } = req.params;
      const { value } = carSchema.create.validate(req.body);

      const updatedCar = await carService.updateByIdPut(id, value);

      return res
        .status(200)
        .json({ messaga: "Car is updated", car: updatedCar });
    } catch (e) {
      next(e);
    }
  }

  public async updateByIdPatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar> | undefined> {
    try {
      const { id } = req.params;
      const { value } = carSchema.create.validate(req.body);

      const updatedCar = await carService.updateByIdPatch(id, value);

      return res
        .status(200)
        .json({ message: "Car is updated", user: updatedCar });
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar> | undefined> {
    try {
      const { id } = req.params;
      await carService.deleteById(id);
      return res.status(200).json({ message: `Car id=${id} is deleted` });
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
