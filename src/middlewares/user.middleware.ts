import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models";
import { userRepository } from "../repositories";
import { userSchema } from "../validations";

class UserMiddleware {
  public async findByIdByThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const user = await userRepository.findById(id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async UpdateByIdByThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        throw new ApiError("User not found", 404);
      }

      const { error } = userSchema.create.validate(req.body);

      if (error) {
        throw new ApiError("Validation failed", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async UpdateByIdPatchByThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        throw new ApiError("User not found", 404);
      }
      const { error } = userSchema.updateUserSchema.validate(req.body);

      if (error) {
        throw new ApiError("Validation failed", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
