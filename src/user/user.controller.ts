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

@Controller("users")
export class UserController {
  @Post()
  async createUser(@Body() { name, email, password }: CreateUserDto) {
    return { name, email, password };
  }

  @Get()
  async getUsers() {
    return { users: [] };
  }

  @Get(":id")
  async getUserById(@Param("id", ParseIntPipe) id) {
    return { user: {}, id };
  }

  @Patch(":id")
  async updateUser(
    @Param("id", ParseIntPipe) id,
    @Body() { name, email, password }: UpdateUserDto,
  ) {
    return { user: { id, name, email, password } };
  }

  @Delete(":id")
  async deleteUser(@Param("id", ParseIntPipe) id) {
    return { id };
  }
}
