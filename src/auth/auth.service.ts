import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { users } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthRegisterDto } from "./dto/auth-register.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(users: users) {
    const payload = {
      sub: users.id,
      name: users.name,
      email: users.email,
    };

    const token = this.jwtService.sign(payload, {});

    return {
      accessToken: token,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
    };
  }

  async checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: "users",
        issuer: "login",
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: { email, password },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid Email");
    }

    return true;
  }

  async reset(token: string, password: string) {
    const id = 0;

    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
