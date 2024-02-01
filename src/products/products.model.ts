import { ApiProperty } from "@nestjs/swagger";
import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserProducts } from "./userProducts.model";

interface ProductsCreationAttrs {
  productId: number;
  avatar: string;
  title: string;
  description: string;
  price: number;
  phone: number;
}

@Table({ tableName: "products" })
export class Products extends Model<Products, ProductsCreationAttrs> {
  @ApiProperty({ example: "1", description: "unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  productId: number;

  @ApiProperty({
    example: "https://www.google.com/imgres",
    description: "Avatar",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  avatar: string;
  @ApiProperty({
    example: "Jumper",
    description: "You need to write a product title",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @ApiProperty({
    example: "I will sell a jumper in good condition, size M",
    description: "You need to describe the product",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  description: string;
  @ApiProperty({
    example: "1000",
    description: "You need to add price your product",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;
  @ApiProperty({
    example: "222333222",
    description: "You need to add your phone number",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  phone: number;

  @BelongsToMany(() => User, () => UserProducts)
  users: User[];
}
