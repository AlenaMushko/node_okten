import { Activated, User } from "../models";
import { IActivated, IActivatedModel, ITokenPayload, IUser } from "../types";

class AuthRepository {
  public async register(body: IUser, hashadPassword: string): Promise<IUser> {
    return (await User.create({
      ...body,
      password: hashadPassword,
    })) as unknown as IUser;
  }

  public async actionToken(
    body: IUser,
    actionToken: string,
  ): Promise<IActivated> {
    return (await Activated.create({
      accessToken: actionToken,
      userEmail: body.email,
    })) as unknown as IActivated;
  }
  public async verifyUser(user: IUser): Promise<void> {
    await User.findByIdAndUpdate(user._id, { verify: true, actionToken: "" });
  }

  public async findActivated(accessToken: string): Promise<IActivatedModel> {
    return (await Activated.findOne({
      accessToken,
    })) as unknown as IActivatedModel;
  }

  public async deleteActivated(activated: IActivatedModel): Promise<void> {
    await Activated.deleteOne({ _id: activated._id });
  }
  public async findOne(email: string): Promise<IUser> {
    return (await User.findOne({ email })) as unknown as IUser;
  }

  public async updateUser(id: ITokenPayload, body: IUser): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      id,
      { ...body },
      { new: true },
    )) as unknown as IUser;
  }

  public async forgotPassword(
    body: IUser,
    newPassword: string,
  ): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      body._id,
      { password: newPassword },
      { new: true },
    )) as unknown as IUser;
  }
}

export const authRepository = new AuthRepository();
