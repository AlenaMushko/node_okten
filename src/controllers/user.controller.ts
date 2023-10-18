import { NextFunction, Request, Response } from "express";

import { userService } from "../services";
import { IUser } from "../types";
import { IQuery } from "../types/query.types";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findWithPagination(
        req.query as unknown as IQuery,
      );

      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const newUser = await userService.create(req.body);

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
  ): Promise<Response<IUser>> {
    try {
      const user = res.locals.user;

      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  public async updateByIdPut(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;

      const updatedUser = await userService.updateByIdPut(userId, req.body);

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
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;

      const updatedUser = await userService.updateByIdPatch(userId, req.body);

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
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      await userService.deleteById(userId);

      return res.status(200).json({ message: `User id=${userId} is deleted` });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
