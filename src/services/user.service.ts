import { userRepository } from "../repositories";
import { IUser } from "../types";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return await userRepository.findAll();
  }

  public async create(value: IUser): Promise<IUser> {
    return await userRepository.create(value);
  }

  public async updateByIdPut(userId: string, value: IUser): Promise<IUser> {
    return await userRepository.updateByIdPut(userId, value);
  }

  public async updateByIdPatch(userId: string, value: IUser): Promise<IUser> {
    return await userRepository.updateByIdPatch(userId, value);
  }

  public async deleteById(userId: string): Promise<IUser> {
    return await userRepository.deleteById(userId);
  }
}

export const userService = new UserService();
