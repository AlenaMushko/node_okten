import { User } from "../models";
import { IUser } from "../types";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(value: IUser): Promise<IUser> {
    return (await User.create({ ...value })) as unknown as IUser;
  }

  public async findById(id: string): Promise<IUser> {
    return (await User.findById(id)) as unknown as IUser;
  }

  public async updateByIdPut(id: string, value: IUser): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      id,
      { ...value },
      { new: true },
    )) as unknown as IUser;
  }

  public async updateByIdPatch(id: string, value: IUser): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      id,
      { ...value },
      { new: true },
    )) as unknown as IUser;
  }

  public async deleteById(id: string): Promise<IUser> {
    return (await User.deleteOne({ _id: id })) as unknown as IUser;
  }
}

export const userService = new UserService();
