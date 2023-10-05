import * as jwt from "jsonwebtoken";

import { configs } from "../config";
import { tokenRepository } from "../repositories/token.repository";
import { IJwt, ITokenPayload, ITokensPair, IUser } from "../types";

const accessTokenSecret = configs.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = configs.REFRESH_TOKEN_SECRET;

class TokenService {
  public generateTokenPairs(payload: ITokensPair): IJwt {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  public generateVerifyToken(email: string): string {
    return jwt.sign(email, accessTokenSecret, {
      expiresIn: "1h",
    });
  }
  public async logout(id: ITokenPayload): Promise<void> {
    await tokenRepository.logout(id);
  }

  public async refreshToken(user: IUser, _id: ITokenPayload): Promise<IJwt> {
    const tokensPair = tokenService.generateTokenPairs({
      userId: user._id,
      name: user.name,
    });

    await Promise.all([
      await tokenRepository.logout(_id),
      await tokenRepository.createToken({ ...tokensPair, _userId: user._id }),
    ]);
    return tokensPair;
  }
}

export const tokenService = new TokenService();
