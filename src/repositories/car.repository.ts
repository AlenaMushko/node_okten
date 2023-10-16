import { Car, User } from "../models";
import { ICar } from "../types";

class CarRepository {
  public async searchByQuery(
    searchObj: {
      [key: string]: string;
    },
    skip: number,
    sortedBy: string,
    limit: string,
  ): Promise<ICar[]> {
    return await Car.find(searchObj).skip(skip).limit(+limit).sort(sortedBy);
  }

  public async count(searchObj: { [key: string]: string }): Promise<number> {
    return await User.count(searchObj);
  }
  public async getAllOwner(id: object): Promise<ICar[]> {
    return (await Car.find({ ownerId: id }).populate(
      //коли отримує машинки юзера, і хочемо щне дані того юзера мати відразу
      "ownerId", //до якого поля доптсуємо
      "name email", //які поля включити із user
    )) as unknown as ICar[];
  }

  public async create(value: ICar): Promise<ICar> {
    return (await Car.create({ ...value })) as unknown as ICar;
  }

  public async findById(id: string): Promise<ICar> {
    return (await Car.findById(id)) as unknown as ICar;
  }

  public async updateByIdPut(id: string, value: ICar): Promise<ICar> {
    return (await Car.findByIdAndUpdate(
      id,
      { ...value },
      { new: true },
    )) as unknown as ICar;
  }

  public async updateByIdPatch(id: string, value: ICar): Promise<ICar> {
    return (await Car.findByIdAndUpdate(
      id,
      { ...value },
      { new: true },
    )) as unknown as ICar;
  }

  public async deleteById(id: string): Promise<ICar> {
    return (await Car.deleteOne({ _id: id })) as unknown as ICar;
  }
}

export const carRepository = new CarRepository();
