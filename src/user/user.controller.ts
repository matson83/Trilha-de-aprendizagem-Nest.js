import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/intecerptors/log.intecerptors";
import { ParamId } from "src/decorators/param-id.decorator";

@UseInterceptors(LogInterceptor)
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
  async getUserById(@ParamId() id: number) {
    return this.userService.findById(id);
  }

  @Patch(":id")
  async updateUser(
    @ParamId() id: number,
    @Body() { name, email, password }: UpdateUserDto,
  ) {
    return this.userService.update(id, {
      name,
      email,
      password,
    });
  }

  @Delete(":id")
  async deleteUser(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
