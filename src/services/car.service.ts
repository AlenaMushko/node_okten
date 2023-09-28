import { carRepository } from "../repositories";
import { ICar } from "../types";

class CarService {
  public async getAll(): Promise<ICar[]> {
    return await carRepository.getAll();
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
