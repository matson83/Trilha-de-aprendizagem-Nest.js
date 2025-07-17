import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

@Controller("users")
export class UserController {
  @Post()
  async createUser(@Body() body) {
    return { body };
  }

  @Get()
  async getUsers() {
    return { users: [] };
  }

  @Get(":id")
  async getUserById(@Param() param) {
    return { user: { param } };
  }

  @Patch(":id")
  async updateUser(@Param() param, @Body() body) {
    return { user: { param, body } };
  }

  @Delete(":id")
  async deleteUser(@Param() param) {
    return { deleted: { param } };
  }
}
