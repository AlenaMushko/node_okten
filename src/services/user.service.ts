import { userRepository } from "../repositories";
import { IUser } from "../types";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return await userRepository.findAll();
  }

  public async create(value: IUser): Promise<IUser> {
    return await userRepository.create(value);
  }

  public async updateByIdPut(id: string, value: IUser): Promise<IUser> {
    return await userRepository.updateByIdPut(id, value);
  }

  public async updateByIdPatch(id: string, value: IUser): Promise<IUser> {
    return await userRepository.updateByIdPatch(id, value);
  }

  public async deleteById(id: string): Promise<IUser> {
    return await userRepository.deleteById(id);
  }
}

export const userService = new UserService();
