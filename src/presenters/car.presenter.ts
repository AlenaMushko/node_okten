import { configs } from "../config";
import { ICar, IPresenter } from "../types";

class CarPresenter implements IPresenter<ICar, Partial<ICar>> {
  present(data: ICar): Partial<ICar> {
    return {
      _id: data._id,
      model: data.model,
      year: data.year,
      price: data.price,
      ownerId: data.ownerId,
      img: Array.isArray(data.img)
        ? data.img.map((path) => `${configs.AWE_S3_URL}/${path}`)
        : `${configs.AWE_S3_URL}/${data.img}`,
    };
  }
}

export const carPresenter = new CarPresenter();
