import bcrypt from "bcrypt";

class PasswordService {
  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 7);
    // 7 it is number( includes salt and round), can write default
  }

  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export const passwordService = new PasswordService();
