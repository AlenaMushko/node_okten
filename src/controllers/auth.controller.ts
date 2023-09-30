import { NextFunction, Request, Response } from "express";

import { authService } from "../services";
import { IJwt, IMessage } from "../types";

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
}

export const authController = new AuthController();
