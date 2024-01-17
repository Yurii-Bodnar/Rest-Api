///
// import { ProductsService } from "./../products/products.service";
import { InjectModel } from "@nestjs/sequelize";
import { Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create.user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User
    ///
    // private productsService: ProductsService
  ) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    // const products = await this.productsService.getProducts(1);
    // await user.$set("products", []);
    return user;
  }
  async getUsers() {
    const user = await this.userRepository.findAll({ include: { all: true } });
    return user;
  }
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }
}
