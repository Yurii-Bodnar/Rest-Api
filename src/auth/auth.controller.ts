import { Body, Controller, Headers, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create.user.dto";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/users/users.model";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Sign in user" })
  @ApiResponse({ status: 200, type: User })
  @Post("/login")
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: "Register user" })
  @ApiResponse({ status: 200, type: User })
  @Post("/registration")
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }

  @ApiOperation({ summary: "Logout user" })
  @ApiResponse({ status: 200, description: "The user has logged out" })
  @Post("/logout/:userId")
  logout(
    @Headers("Authorization") token: string,
    @Param("userId") userId: number
  ) {
    return this.authService.logout(token, userId);
  }
}
