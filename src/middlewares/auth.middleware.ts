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

  public async isActivated(req: Request, res: Response, next: NextFunction) {
    try {
      const { actionToken } = req.params;

      const activated = await authRepository.findActivated(actionToken);
      if (!activated || activated.accessToken !== actionToken) {
        throw new ApiError("Invalid or expired token", 401);
      }

      res.locals.activated = activated;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async activatedUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authRepository.findOne(res.locals.activated.userEmail);
      if (!user) {
        throw new ApiError("Invalid or expired token", 401);
      }

      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const userEmail = req.body.email || res.locals.userEmail;
      const user = await authRepository.findOne(userEmail);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { resetToken } = req.params;

      const forgotPassword = await authRepository.findActivated(resetToken);
      if (!forgotPassword) {
        throw new ApiError("Token not valid", 401);
      }

      res.locals.userEmail = forgotPassword.userEmail;
      res.locals.tokenId = forgotPassword._id;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async activatedAgainUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await authRepository.findOne(req.body.email);

      if (!user) {
        throw new ApiError("You are not registered", 401);
      }

      if (user.verify) {
        throw new ApiError("You are already verify", 401);
      }

      res.locals.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
