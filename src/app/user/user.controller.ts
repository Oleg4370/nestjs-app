import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService, UserInterface } from './user.service';
import { JwtAuthGuard } from '@src/app/auth/guards';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  //@UseGuards(JwtAuthGuard)
  //TODO: add Guard - only for admin
  async getUsers(): Promise<UserInterface[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param() params): Promise<UserInterface> {
    return await this.userService.getUser(params.id);
  }
}
