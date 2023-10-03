import { Token } from "../models/Token.modal";
import { IToken, ITokenPayload } from "../types";

class TokenRepository {
  public async createToken(body: Partial<IToken>): Promise<IToken> {
    return await Token.create(body);
  }

  public async getByID(userId: ITokenPayload): Promise<IToken> {
    return await Token.findOne({ _userId: userId });
  }

  public async logout(_id: ITokenPayload): Promise<void> {
    await Token.deleteOne({ _id });
  }
}

export const tokenRepository = new TokenRepository();
