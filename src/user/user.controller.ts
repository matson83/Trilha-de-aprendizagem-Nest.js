import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() { name, email, password }: CreateUserDto) {
    return this.userService.create({
      name,
      email,
      password,
    });
  }

  @Get()
  async getUsers() {
    return this.userService.list();
  }

  @Get(":id")
  async getUserById(@Param("id", ParseIntPipe) id) {
    return this.userService.findById(id);
  }

  @Patch(":id")
  async updateUser(
    @Param("id", ParseIntPipe) id,
    @Body() { name, email, password }: UpdateUserDto,
  ) {
    return this.userService.update(id, {
      name,
      email,
      password,
    });
  }

  @Delete(":id")
  async deleteUser(@Param("id", ParseIntPipe) id) {
    return this.userService.delete(id);
  }
}
