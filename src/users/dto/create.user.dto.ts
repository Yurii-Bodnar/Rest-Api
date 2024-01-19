import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "John", description: "users name" })
  readonly name:string
  @ApiProperty({ example: "user@mail.com", description: "users email" })
  readonly email: string;
  @ApiProperty({ example: "f1s23dda", description: "users password" })
  readonly password: string;
}
