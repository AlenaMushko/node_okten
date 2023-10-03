import * as jwt from "jsonwebtoken";

import { configs } from "../config";
import { IJwt, ITokenPayload } from "../types";

const accessTokenSecret = configs.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = configs.REFRESH_TOKEN_SECRET;

class TokenService {
  public generateTokenPairs(payload: ITokenPayload): IJwt {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }
}

export const tokenService = new TokenService();
