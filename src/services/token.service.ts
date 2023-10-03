import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { configs } from "../config";
import { userRepository } from "../repositories";
import { tokenRepository } from "../repositories/token.repository";
import { IJwt, ITokenPayload, ITokensPair } from "../types";

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

  public async logout(id: ITokenPayload): Promise<void> {
    await tokenRepository.logout(id);
  }

  public async refreshToken(refreshToken: string): Promise<IJwt> {
    const tokenSecret = configs.REFRESH_TOKEN_SECRET;
    const { id } = jwt.verify(refreshToken, tokenSecret) as JwtPayload;

    const user = await userRepository.findById(id);

    const tokensPair = tokenService.generateTokenPairs({
      userId: user._id,
      name: user.name,
    });
    // await authRepository.login(
    //   user,
    //   tokensPair.accessToken,
    //   tokensPair.refreshToken,
    // );

    return tokensPair;
  }
}

export const tokenService = new TokenService();
