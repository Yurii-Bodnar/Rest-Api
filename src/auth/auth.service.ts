import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create.user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    const token = this.generateToken(user);
    return {
      ...token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        products: user.products,
      },
    };
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);

    if (candidate) {
      throw new NotFoundException(
        `User with email:"${dto.email}" already exists`
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user.data);
  }

  async logout(token: string, userId: number) {
    const decodedToken = this.jwtService.decode(token.split(" ")[1]) as {
      id: number;
    };
    if (!decodedToken || !decodedToken.id) {
      throw new UnauthorizedException("Invalid token");
    }

    const user = await this.usersService.getUserById(decodedToken.id);

    if (!user || Number(user.id) !== Number(userId)) {
      throw new UnauthorizedException("Invalid token");
    }

    return { message: "Logout successful", data: { token: "" } };
  }

  private generateToken(user: User) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: "Wrong password or Email!" });
  }
}
