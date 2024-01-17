//
// import { UsersService } from "src/users/users.service";
import { InjectModel } from "@nestjs/sequelize";
import { Injectable } from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { Products } from "./products.model";
import { UsersService } from "src/users/users.service";
// import { User } from "src/users/users.model";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products)
    private productsRepository: typeof Products
    //
    // private usersService: typeof UsersService
  ) {}
  async addProduct(dto: ProductDto) {
    const product = await this.productsRepository.create(dto);
    // const user = await this.usersService;
    return product;
  }
  async getProducts(id: number) {
    const products = await this.productsRepository.findOne({
      where: { productId: id },
    });
    return products;
  }
}
