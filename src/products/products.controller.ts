import { ProductsService } from "./products.service";
import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  create(@Body()dto: ProductDto) {
    return this.productsService.addProduct(dto);
  }
  @Get("/:id")
  getById(@Param("id") id: number) {
    return this.productsService.getProducts(id);
  }
}
