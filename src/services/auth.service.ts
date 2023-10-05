import { EEmailAction } from "../enums/email.action.enum";
import { ApiError } from "../errors";
import { User } from "../models";
import { authRepository } from "../repositories";
import { tokenRepository } from "../repositories/token.repository";
import { ICredentials, IJwt, ITokenPayload, IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser, actionToken: string): Promise<void> {
    try {
      const { password } = body;
      // хешуємо пароль npm i bcryptjs
      const hashadPassword = await passwordService.hash(password);

      await authRepository.register(body, hashadPassword, actionToken);

      await emailService.sendEmail(body.email, EEmailAction.REGISTER, {
        name: body.name + ", " || " ",
        actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async verifyUser(actionToken: string): Promise<void> {
    const user = (await User.findOne({ actionToken })) as IUser;
    if (!user) {
      throw new ApiError("Invalid or expired token", 401);
    }

    await authRepository.verifyUser(user);
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
