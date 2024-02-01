import { InjectModel } from "@nestjs/sequelize";
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from "@nestjs/common";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create.user.dto";
import { Products } from "src/products/products.model";
import { ProductsService } from "src/products/products.service";

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      user.products = [];
      return { success: true, data: user };
    } catch (error) {
      console.error(error);
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async getUsers() {
    const users = await this.userRepository.findAll({
      include: [
        {
          model: Products,
          attributes: [
            "productId",
            "avatar",
            "title",
            "description",
            "price",
            "phone",
            "createdAt",
            "updatedAt",
          ],
          through: { attributes: [] },
        },
      ],
      attributes: ["id", "name", "email"],
    });

    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: Products,
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }
}
