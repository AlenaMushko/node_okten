// import * as jwt from "jsonwebtoken";
// import { JwtPayload } from "jsonwebtoken";
//
// import { configs } from "../config";
import { authRepository } from "../repositories";
import { tokenRepository } from "../repositories/token.repository";
import { ICredentials, IJwt, ITokenPayload, IUser } from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser): Promise<void> {
    const { password } = body;
    // хешуємо пароль npm i bcryptjs
    const hashadPassword = await passwordService.hash(password);

    await authRepository.register(body, hashadPassword);
  }

  public async login(body: ICredentials): Promise<IJwt> {
    const { email } = body;
    const user = await authRepository.findOne(email);

    const tokensPair = tokenService.generateTokenPairs({
      userId: user._id,
      name: user.name,
    });
    await tokenRepository.createToken({ ...tokensPair, _userId: user._id });

    return tokensPair;
  }

  public async updateUser(userId: ITokenPayload, body: IUser): Promise<IUser> {
    return await authRepository.updateUser(userId, body);
  }
}

export const authService = new AuthService();
