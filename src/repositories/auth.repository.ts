import { User } from "../models";
import { ITokenPayload, IUser } from "../types";

class AuthRepository {
  public async register(
    body: IUser,
    hashadPassword: string,
    actionToken: string,
  ): Promise<IUser> {
    return (await User.create({
      ...body,
      password: hashadPassword,
      actionToken,
    })) as unknown as IUser;
  }

  public async verifyUser(user: IUser): Promise<void> {
    await User.findByIdAndUpdate(user._id, { verify: true, actionToken: "" });
  }

  public async findOne(email: string): Promise<IUser> {
    return (await User.findOne({ email })) as unknown as IUser;
  }

  public async updateUser(id: ITokenPayload, body: IUser): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      id,
      { ...body },
      { new: true },
    )) as unknown as IUser;
  }

  public async forgotPassword(
    body: IUser,
    newPassword: string,
  ): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      body.email,
      { ...body, password: newPassword },
      { new: true },
    )) as unknown as IUser;
  }
}

export const authRepository = new AuthRepository();
