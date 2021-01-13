import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { NewUserDTO, UpdateUserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";

@Controller('users')
export class UserController{
  constructor(private readonly userService: UserService){}

  @Get()
  async getUsers(): Promise<User[]>{
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() data: NewUserDTO): Promise<User>{
    return await this. userService.createUser(data);
  }

  @Put(":id")
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDTO): Promise<User>{
    return await this. userService.updateUser(id, data);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<void>{
    this.userService.deleteUser(id);
  }
}