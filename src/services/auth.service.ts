import { ApiError } from "../errors";
import { User } from "../models";
import { authRepository } from "../repositories";
import { ICredentials, IJwt, IUser } from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser): Promise<void> {
    const { password } = body;
    // хешуємо пароль npm i bcryptjs
    const hashadPassword = await passwordService.hash(password);

    await User.create({ ...body, password: hashadPassword });
  }

  public async login(body: ICredentials): Promise<IJwt> {
    const { password, email } = body;
    const user = await authRepository.findOne(email);
    if (!user) {
      throw new ApiError("Invalid email or password", 401);
    }

    const isMatched = await passwordService.compare(password, user.password);
    if (!isMatched) {
      throw new ApiError("Invalid email or password", 401);
    }

    const tokensPair = tokenService.generateTokenPairs({ id: user._id });

    return tokensPair;
  }
}

export const authService = new AuthService();
