import { User } from "../models";
import { IToken, IUser } from "../types";

class UserRepository {
  public async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(value: IUser): Promise<IUser> {
    return (await User.create({ ...value })) as unknown as IUser;
  }

  public async findById(userId: string): Promise<IUser> {
    return (await User.findById(userId)) as unknown as IUser;
  }

  public async findOne(tokenObj: IToken): Promise<IUser> {
    return (await User.findOne({
      _id: tokenObj._userId,
    })) as unknown as IUser;
  }
  public async updateByIdPut(userId: string, value: IUser): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      userId,
      { ...value },
      { new: true },
    )) as unknown as IUser;
  }

  public async updateByIdPatch(userId: string, value: IUser): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      userId,
      { ...value },
      { new: true },
    )) as unknown as IUser;
  }

  public async deleteById(userId: string): Promise<IUser> {
    return (await User.deleteOne({ _id: userId })) as unknown as IUser;
  }
}

export const userRepository = new UserRepository();
