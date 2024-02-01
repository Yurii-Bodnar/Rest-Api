import { ApiProperty } from "@nestjs/swagger";

import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { Products } from "src/products/products.model";
import { UserProducts } from "src/products/userProducts.model";

interface UserCreationAttrs {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "Alex", description: "users name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ApiProperty({ example: "user@mail.com", description: "users email" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  @ApiProperty({ example: "f1s23dda", description: "users password" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @BelongsToMany(() => Products, () => UserProducts)
  products: Products[];
}
