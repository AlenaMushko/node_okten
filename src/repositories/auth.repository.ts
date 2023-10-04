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

  public async updateUser(id: ITokenPayload, body: IUser): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      id,
      { ...body },
      { new: true },
    )) as unknown as IUser;
  }
}

export const authRepository = new AuthRepository();
