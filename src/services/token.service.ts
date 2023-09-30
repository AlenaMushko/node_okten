import * as jwt from "jsonwebtoken";

import { configs } from "../config";
import { IJwt, ITokenPayload } from "../types";

const tokenSecret = configs.TOKEN_SECRET;

class TokenService {
  public generateTokenPairs(payload: ITokenPayload): IJwt {
    const accessToken = jwt.sign(payload, tokenSecret, { expiresIn: "15m" });

    const refreshToken = jwt.sign(payload, tokenSecret, { expiresIn: "30d" });

    return { accessToken, refreshToken };
  }
}

export const tokenService = new TokenService();
