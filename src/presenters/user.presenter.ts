import { configs } from "../config";
import { IPresenter, IUser } from "../types";

class UserPresenter implements IPresenter<IUser, Partial<IUser>> {
  present(data: IUser): Partial<IUser> {
    return {
      _id: data._id,
      name: data.name,
      age: data.age,
      email: data.email,
      gender: data.gender,
      verify: data.verify,
      actionToken: data.actionToken,
      lastVisited: data.lastVisited,
      avatar: `${configs.AWE_S3_URL}/${data.avatar}`,
    };
  }
}

export const userPresenter = new UserPresenter();
