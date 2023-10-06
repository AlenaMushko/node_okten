import { EEmailAction } from "../enums/email.action.enum";
import { ApiError } from "../errors";
import { authRepository } from "../repositories";
import { tokenRepository } from "../repositories/token.repository";
import {
  IActivatedModel,
  ICredentials,
  IJwt,
  ITokenPayload,
  IUser,
} from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser, actionToken: string): Promise<void> {
    try {
      const { password } = body;
      // хешуємо пароль npm i bcryptjs
      const hashadPassword = await passwordService.hash(password);

      Promise.all([
        await authRepository.register(body, hashadPassword),
        await authRepository.actionToken(body, actionToken),
      ]);

      await emailService.sendEmail(body.email, EEmailAction.REGISTER, {
        name: body.name + ", " || " ",
        actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activatedUser(
    activated: IActivatedModel,
    user: IUser,
  ): Promise<void> {
    Promise.all([
      await authRepository.verifyUser(user),
      await authRepository.deleteActivated(activated),
    ]);

    await emailService.welcomeEmail(user.email, EEmailAction.WELCOME, {
      name: user.name + ", " || " ",
    });
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

  public async forgotPassword(
    body: IUser,
    newPassword: string,
  ): Promise<IUser> {
    return await authRepository.forgotPassword(body, newPassword);
  }

  public async activatedAgainUser(user: IUser): Promise<void> {
    await emailService.sendEmail(user.email, EEmailAction.REGISTER, {
      name: user.name + ", " || " ",
      actionToken: user.actionToken,
    });
  }
}

export const authService = new AuthService();
