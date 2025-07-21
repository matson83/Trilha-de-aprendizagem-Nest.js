import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDto) {
    return await this.prisma.users.create({
      data: {
        email,
        name,
        password,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async list() {
    return this.prisma.users.findMany();
  }

  async findById(id: number) {
    await this.exists(id);
    return this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async update(id: number, data: Partial<CreateUserDto>) {
    await this.exists(id);
    return this.prisma.users.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);
    return this.prisma.users.delete({
      where: { id },
      select: {
        id: true,
      },
    });
  }

  async exists(id: number) {
    if (
      !(
        (await this.prisma.users.count({
          where: { id },
        })) > 0
      )
    ) {
      throw new NotFoundException("User not found");
    }
  }
}
