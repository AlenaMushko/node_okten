import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models";
import { updateUserSchema, userSchema } from "../validations";

class UserMiddleware {
  public async findByIdByThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const users = await User.find();
      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

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
      const users = await User.find();
      const { error } = userSchema.validate(req.body);

      if (error) {
        throw new ApiError("Validation failed", 400);
      }

      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new ApiError("User not found", 404);
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
      const users = await User.find();
      const { error } = updateUserSchema.validate(req.body);

      if (error) {
        throw new ApiError("Validation failed", 400);
      }

      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
