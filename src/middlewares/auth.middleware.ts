import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { authRepository, userRepository } from "../repositories";
import { passwordService } from "../services";

class AuthMiddleware {
  public async uniqueEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authRepository.findOne(req.body.email);

      if (user) {
        throw new ApiError("Email already exists", 409);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async loginError(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authRepository.findOne(req.body.email);
      if (!user) {
        throw new ApiError("Invalid email or password", 401);
      }

      //чи введений пароль при логанізації = паролю із реєстрації
      const isMatched = await passwordService.compare(
        req.body.password,
        user.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 401);
      }

      res.locals.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userRepository.findOne(res.locals.tokenObj);
      if (!user) {
        throw new ApiError("Token not valid", 401);
      }

      res.locals.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async verifyAganUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authRepository.findOne(req.body.email);

      if (!user) {
        throw new ApiError("You are not registered", 404);
      }

      res.locals.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
