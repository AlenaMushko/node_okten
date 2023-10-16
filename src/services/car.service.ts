import { carRepository } from "../repositories";
import { ICar } from "../types";
import { IPaginationResponse, IQuery } from "../types/query.types";

class CarService {
  public async findWithPagination(
    query: IQuery,
  ): Promise<IPaginationResponse<ICar>> {
    const queryStr = JSON.stringify(query);
    const queryObg = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );
    const { page = 1, limit = 6, sortedBy = "price", ...searchObj } = queryObg;
    const skip = +limit * (+page - 1);

    const [cars, allUsers] = await Promise.all([
      await carRepository.searchByQuery(searchObj, skip, sortedBy, limit),
      await carRepository.count(searchObj),
    ]);

    return {
      page: +page,
      perPage: +limit,
      allItems: allUsers,
      foundItems: cars.length,
      data: cars,
    };
  }

  public async getAllOwner(id: object): Promise<ICar[]> {
    return await carRepository.getAllOwner(id);
  }

  public async create(value: ICar): Promise<ICar> {
    return await carRepository.create(value);
  }

  public async updateByIdPut(id: string, value: ICar): Promise<ICar> {
    return await carRepository.updateByIdPut(id, value);
  }

  public async updateByIdPatch(id: string, value: ICar): Promise<ICar> {
    return await carRepository.updateByIdPatch(id, value);
  }

  public async deleteById(id: string): Promise<ICar> {
    return await carRepository.deleteById(id);
  }
}

export const carService = new CarService();
