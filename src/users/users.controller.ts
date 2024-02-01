import { UsersService } from "./users.service";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create.user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Products } from "src/products/products.model";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("create")
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getUsers();
  }

  @Get("/:id")
  getUserById(@Param("id") id: number) {
    return this.usersService.getUserById(id);
  }
}
