import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { ApiError } from "../errors";
import { userService } from "../services";
import { IUser } from "../types";
import { userSchema } from "../validations";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]> | undefined> {
    try {
      const users = await userService.findAll();

      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser> | undefined> {
    try {
      const { error, value } = userSchema.create.validate(req.body);

      if (error) {
        throw new ApiError("Validation failed", 400);
      }

      const newUser = await userService.create(value);

      return res
        .status(201)
        .json({ message: "User is created", user: newUser });
    } catch (error) {
      next(error);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser> | undefined> {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid Id", 400);
      }
      const user = await userService.findById(id);

      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  public async updateByIdPut(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser> | undefined> {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid Id", 400);
      }
      const { value } = userSchema.create.validate(req.body);

      const updatedUser = await userService.updateByIdPut(id, value);

      return res
        .status(200)
        .json({ message: "User is updated", user: updatedUser });
    } catch (e) {
      next(e);
    }
  }

  public async updateByIdPatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser> | undefined> {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid Id", 400);
      }
      const { value } = userSchema.updateUserSchema.validate(req.body);

      const updatedUser = await userService.updateByIdPatch(id, value);

      return res
        .status(200)
        .json({ message: "User is updated", user: updatedUser });
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser> | undefined> {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid Id", 400);
      }
      await userService.deleteById(id);

      return res.status(200).json({ message: `User id=${id} is deleted` });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
