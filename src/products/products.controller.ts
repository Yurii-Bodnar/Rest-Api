import { ProductsService } from "./products.service";
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post(":id")
  create(@Body() dto: ProductDto, @Param("id") id: number) {
    return this.productsService.addProduct(dto, id);
  }
  @Get("by-id/:id")
  getById(@Param("id") id: number) {
    return this.productsService.getProductsById(id);
  }
  @Get("user/:userId")
  getAllProducts(@Param("userId") userId: number) {
    return this.productsService.getUserProducts(userId);
  }
  @Get("all")
  getAll() {
    return this.productsService.getAllProducts();
  }
  @Delete("delete/:productId")
  deleteProduct(@Param("productId") productId: number) {
    return this.productsService.deleteProductById(productId);
  }
  @Put("update/:productId")
  updateProduct(
    @Param("productId") productId: number,
    @Body() dto: ProductDto
  ) {
    return this.productsService.updateProductById(productId, dto);
  }
}
