import { ProductsService } from "./products.service";
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("add/:id")
  create(@Body() dto: ProductDto, @Param("id") id: number) {
    return this.productsService.addProduct(dto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("by-id/:id")
  getById(@Param("id") id: number) {
    return this.productsService.getProductsById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("user/:userId")
  getAllProducts(@Param("userId") userId: number) {
    return this.productsService.getUserProducts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("all")
  getAll() {
    return this.productsService.getAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Delete("delete/:productId")
  deleteProduct(@Param("productId") productId: number) {
    return this.productsService.deleteProductById(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Put("update/:productId")
  updateProduct(
    @Param("productId") productId: number,
    @Body() dto: ProductDto
  ) {
    return this.productsService.updateProductById(productId, dto);
  }
}
