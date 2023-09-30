import { User } from "../models";
import { IUser } from "../types";

class AuthRepository {
  public async findOne(email: string): Promise<IUser> {
    return (await User.findOne({ email })) as unknown as IUser;
  }
}

export const authRepository = new AuthRepository();
