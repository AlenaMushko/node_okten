import bcrypt from "bcrypt";

class PasswordService {
  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 7);
    // 7 it is number( includes salt and round), can write default
  }
}

export const passwordService = new PasswordService();
