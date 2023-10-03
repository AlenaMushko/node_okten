import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { configs } from "../config";
import { ApiError } from "../errors";
import { userRepository } from "../repositories";

const tokenSecret = configs.ACCESS_TOKEN_SECRET;

class AuthenticateMiddleware {
  public async isLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new ApiError("Authorization header missing", 401);
      }

      const [bearer, token] = authorization.split(" ");
      if (!bearer || !token) {
        throw new ApiError("Not authorized", 401);
      }

      const { id } = jwt.verify(token, tokenSecret) as JwtPayload;

      const user = await userRepository.findById(id);

      //розлогінити юзера, якщо немає токенів
      if (
        !user ||
        !user.accessToken ||
        !user.refreshToken ||
        user.accessToken !== token
      ) {
        throw new ApiError("Token not valid", 401);
      }

      // щоб знати хто робить запит і можна додати при створенні машинок, щоб потім брати всі машинки що додав певний юзер
      res.locals.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authenticateMiddleware = new AuthenticateMiddleware();
