import { NextFunction, Request, Response } from "express";

import { authService } from "../services";
import { IJwt, IMessage, IUser } from "../types";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IMessage>> {
    try {
      await authService.register(req.body);

      return res.status(201).json("User created");
    } catch (e) {
      next(e);
    }
  }
  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IJwt>> {
    try {
      const tokenPair = await authService.login(req.body);
      return res.status(200).json({ ...tokenPair });
    } catch (e) {
      next(e);
    }
  }

  public currentUser(req: Request, res: Response, next: NextFunction): IUser {
    try {
      const user = res.locals.user;

      return res.status(200).json(user) as unknown as IUser;
    } catch (e) {
      next(e);
    }
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IMessage>> {
    try {
      await authService.logout(res.locals.user._id);

      return res.status(204).json("Logout success");
    } catch (e) {
      next(e);
    }
  }

  public async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const user = res.locals.user;
      const updateUser = await authService.updateUser(user._id, req.body);
      return res.status(200).json(updateUser);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
