import { ApiError } from "../errors";
import { User } from "../models";
import { userRepository } from "../repositories";
import { IUser } from "../types";
import { IPaginationResponse, IQuery } from "../types/query.types";

class UserService {
  public async findAll(): Promise<IUser[]> {
    try {
      return await userRepository.findAll();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(value: IUser): Promise<IUser> {
    try {
      return await userRepository.create(value);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateByIdPut(userId: string, value: IUser): Promise<IUser> {
    try {
      return await userRepository.updateByIdPut(userId, value);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateByIdPatch(userId: string, value: IUser): Promise<IUser> {
    try {
      return await userRepository.updateByIdPatch(userId, value);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(userId: string): Promise<IUser> {
    try {
      return await userRepository.deleteById(userId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findWithPagination(
    query: IQuery,
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObg = JSON.parse(
        //Ця операція використовує регулярний вираз для знаходження всіх входжень "gte", "lte", "gt" та "lt" в рядку queryStr
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
      );
      //$gte: Greater Than or Equal (Більше або Рівно)
      //$lte: Less Than or Equal (Менше або Рівно)
      //$gt: Greater Than (Більше)
      //$lt: Less Than (Менше)
      const { page = 1, limit = 6, sortedBy = "name", ...searchObj } = queryObg;

      const skip = +limit * (+page - 1);

      const users = await User.find(searchObj)
        .skip(skip)
        .limit(+limit)
        .sort(sortedBy);
      // const users = await userRepository.searchByQuery(searchObj);
      const allUsers = await userRepository.count();
      return {
        page: +page,
        perPage: +limit,
        allItems: allUsers,
        foundItems: users.length,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
