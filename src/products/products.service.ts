//
import { UsersService } from "src/users/users.service";
import { InjectModel } from "@nestjs/sequelize";
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { Products } from "./products.model";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products)
    private productsRepository: typeof Products,
    private usersService: UsersService
  ) {}

  async addProduct(dto: ProductDto, userId: number) {
    const user = await this.usersService.getUserById(userId);
    const product = await user.$create("Product", dto);
    return product;
  }

  async getProductsById(productId: number) {
    const product = await this.productsRepository.findOne({
      where: { productId },
    });

    if (product) {
      return product;
    } else {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }
  }

  async getUserProducts(userId: number) {
    const user = await this.usersService.getUserById(userId);

    if (user) {
      return user.products;
    } else {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }

  async getAllProducts() {
    try {
      const products = await this.productsRepository.findAll();
      return { success: true, data: products };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Failed to fetch products" };
    }
  }

  async deleteProductById(productId: number): Promise<{}> {
    try {
      const existingProduct = await this.productsRepository.findOne({
        where: { productId },
      });

      if (!existingProduct) {
        throw new HttpException("Not found product", HttpStatus.NOT_FOUND);
      }
      await existingProduct.destroy();
      return { message: "Product deleted successfully" };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        "Error removing product",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  async updateProductById(productId: number, updatedProductDto: ProductDto) {
    try {
      const existingProduct = await this.productsRepository.findOne({
        where: { productId },
      });
      console.log(existingProduct);
      if (!existingProduct) {
        throw new HttpException("Not found product", HttpStatus.NOT_FOUND);
      }
      Object.assign(existingProduct, updatedProductDto);
      await existingProduct.save();

      return { message: "Product updated successfully", existingProduct };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        "Error updating product",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
