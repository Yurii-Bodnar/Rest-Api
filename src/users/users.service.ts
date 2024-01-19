///
// import { ProductsService } from "./../products/products.service";
import { InjectModel } from "@nestjs/sequelize";
import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create.user.dto";
import { Products } from "src/products/products.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      return { success: true, data: user };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create user");
    }
  }

  async getUsers() {
    const user = await this.userRepository.findAll({ include: { all: true } });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: Products,
      raw: true,
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
