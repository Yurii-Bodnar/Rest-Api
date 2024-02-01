import { Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
@ApiTags("Auth")
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVET_KEY || "SECRET",
      signOptions: { expiresIn: "24h" },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
