import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { configs } from "../config";
import { authRepository, userRepository } from "../repositories";
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

    const tokensPair = tokenService.generateTokenPairs({ id: user._id });
    await authRepository.login(
      user,
      tokensPair.accessToken,
      tokensPair.refreshToken,
    );

    return tokensPair;
  }

  public async logout(id: ITokenPayload): Promise<void> {
    await authRepository.logout(id);
  }

  public async refreshToken(refreshToken: string): Promise<IJwt> {
    const tokenSecret = configs.REFRESH_TOKEN_SECRET;
    const { id } = jwt.verify(refreshToken, tokenSecret) as JwtPayload;

    const user = await userRepository.findById(id);

    const tokensPair = tokenService.generateTokenPairs({ id: user._id });
    await authRepository.login(
      user,
      tokensPair.accessToken,
      tokensPair.refreshToken,
    );

    return tokensPair;
  }

  public async updateUser(userId: ITokenPayload, body: IUser): Promise<IUser> {
    return await authRepository.updateUser(userId, body);
  }
}

export const authService = new AuthService();
