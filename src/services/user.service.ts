import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRespository } from "../respositories/user.respository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRespository.getList();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters long",
        400,
      );
    }

    if (!dto.email || dto.email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }

    if (!dto.password || dto.password.length < 6) {
      throw new ApiError(
        "Password is requied and should be at least 6 character long",
        400,
      );
    }
    return await userRespository.create(dto);
  }

  public async getById(userId: number): Promise<IUser> {
    const user = await userRespository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async updateById(userId: number, dto: IUser): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters long",
        400,
      );
    }

    if (!dto.email || dto.email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }

    if (!dto.password || dto.password.length < 6) {
      throw new ApiError(
        "Password is requied and should be at least 6 character long",
        400,
      );
    }

    return await userRespository.updateById(userId, dto);
  }

  public async deleteById(userId: number): Promise<void> {
    return await userRespository.deleteById(userId);
  }
}

export const userService = new UserService();