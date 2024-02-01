import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Products } from "../products/products.model";
import { UserProducts } from "../products/userProducts.model";
import { ProductsModule } from "src/products/products.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Products, UserProducts]),
    forwardRef(() => ProductsModule),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
