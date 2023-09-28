import { NextFunction, Request, Response } from "express";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {}
  public async login(req: Request, res: Response, next: NextFunction) {}
}

export const authController = new AuthController();
