import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Products } from "../products/products.model";
import { UserProducts } from "../products/userProducts.model";
///
// import { ProductsModule } from "../products/products.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Products, UserProducts]),
    ///
    // ProductsModule,
  ],
  //
  exports: [UsersService],
})
export class UsersModule {}
