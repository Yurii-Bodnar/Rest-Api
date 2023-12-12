import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType } from "sequelize-typescript";

interface UserCreationAttrs {
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
}
