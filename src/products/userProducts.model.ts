import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { Products } from "./products.model";
import { User } from "src/users/users.model";

@Table({ tableName: "userProducts", createdAt: false, updatedAt: false })
export class UserProducts extends Model<UserProducts> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  userId: number;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  productId: number;
}
