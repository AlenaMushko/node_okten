import { NextFunction, Request, Response } from "express";

import { carService } from "../services";
import { ICar } from "../types";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar[]>> {
    try {
      const cars = await carService.getAll();

      return res.status(200).json(cars);
    } catch (e) {
      next(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const newCar = await carService.create(req.body);
      return res.status(201).json({ message: "Car is created", car: newCar });
    } catch (e) {
      next(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const car = res.locals.car;

      return res.status(200).json({ data: car });
    } catch (e) {
      next(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  public async updateByIdPut(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const { carId } = req.params;
      const updatedCar = await carService.updateByIdPut(carId, req.body);

      return res
        .status(200)
        .json({ messaga: "Car is updated", car: updatedCar });
    } catch (e) {
      next(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  public async updateByIdPatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const { carId } = req.params;
      const updatedCar = await carService.updateByIdPatch(carId, req.body);

      return res
        .status(200)
        .json({ message: "Car is updated", user: updatedCar });
    } catch (e) {
      next(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const { carId } = req.params;
      await carService.deleteById(carId);

      return res.status(200).json({ message: `Car id=${carId} is deleted` });
    } catch (e) {
      next(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}

export const carController = new CarController();