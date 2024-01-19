import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { Products } from "./products.model";
import { User } from "src/users/users.model";
import { UserProducts } from "./userProducts.model";
import { UsersModule } from "src/users/users.module";

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    SequelizeModule.forFeature([Products, User, UserProducts]),
    //
    UsersModule,
  ],
  ///
  // exports: [ProductsService],
})
export class ProductsModule {}
