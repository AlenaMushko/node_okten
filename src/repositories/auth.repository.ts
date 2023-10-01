import { User } from "../models";
import { ITokenPayload, IUser } from "../types";

class AuthRepository {
  public async register(body: IUser, hashadPassword: string): Promise<IUser> {
    return (await User.create({
      ...body,
      password: hashadPassword,
    })) as unknown as IUser;
  }
  public async findOne(email: string): Promise<IUser> {
    return (await User.findOne({ email })) as unknown as IUser;
  }

  public async login(
    body: IUser,
    accessToken: string,
    refreshToken: string,
  ): Promise<IUser> {
    return (await User.findByIdAndUpdate(body._id, {
      accessToken,
      refreshToken,
    })) as unknown as IUser;
  }
  public async logout(_id: ITokenPayload): Promise<void> {
    await User.findByIdAndUpdate(_id, {
      accessToken: "",
      refreshToken: "",
    });
  }

  public async updateUser(id: ITokenPayload, body: IUser): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      id,
      { ...body },
      { new: true },
    )) as unknown as IUser;
  }
}

export const authRepository = new AuthRepository();
