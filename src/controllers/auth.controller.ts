import { NextFunction, Request, Response } from "express";

import { authService, tokenService } from "../services";
import { IJwt, IMessage, IUser } from "../types";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IMessage>> {
    try {
      const actionToken = await tokenService.generateVerifyToken(req.body);
      await authService.register(req.body, actionToken);

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
      const tokenPair = await authService.login(res.locals.user);
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

  public async activatedUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IMessage>> {
    try {
      const activated = res.locals.activated;
      const user = res.locals.user;
      await authService.activatedUser(activated, user);

      return res.status(200).json("Verification successful");
    } catch (e) {
      next(e);
    }
  }

  public async activatedAgainUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IMessage>> {
    try {
      const user = res.locals.user;
      await authService.activatedAgainUser(user);

      return res.status(200).json("Send verification letter again successful");
    } catch (e) {
      next(e);
    }
  }

  public async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IJwt>> {
    try {
      const user = res.locals.user;
      const tokenObj = res.locals.tokenObj;

      const tokensPair = await tokenService.refreshToken(user, tokenObj._id);

      return res.status(200).json({ ...tokensPair });
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

  public async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const user = res.locals.user;
      const newPassword = req.body.password;

      const updateUser = await authService.forgotPassword(user, newPassword);

      return res.status(200).json(updateUser);
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
      const token = res.locals.tokenModel;
      await tokenService.logout(token._id);

      return res.status(204).json("Logout success");
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
