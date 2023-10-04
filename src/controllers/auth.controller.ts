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

// public async refreshToken(
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ): Promise<Response<IJwt>> {
//   const { authorization } = req.headers;
//   if (!authorization) {
//   throw new ApiError("Authorization header missing", 401);
// }
// const [bearer, token] = authorization.split(" ");
// if (!bearer || !token) {
//   throw new ApiError("Not authorized", 401);
// }
// try {
//   const tokenObj = await Token.findOne({ accessToken: token });
//   if (!tokenObj) {
//     throw new ApiError("Access Denied. No refresh token provided", 401);
//   }
//   const user = (await User.findOne({
//     _id: tokenObj._userId,
//   })) as unknown as IUser;
//
//   const tokensPair = tokenService.generateTokenPairs({
//     userId: user._id,
//     name: user.name,
//   });
//   await Token.deleteOne({
//     _id: tokenObj._id,
//   });
//   await tokenRepository.createToken({ ...tokensPair, _userId: user._id });
//
//   return res.status(200).json({ ...tokensPair });
// } catch (e) {
//   next(e);
// }
// }
