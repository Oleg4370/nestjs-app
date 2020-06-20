import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService, UserInterface } from './user.service';
import { JwtAuthGuard } from '@src/auth/guards';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  //TODO: add Guard - only for admin
  async getUser(): Promise<[UserInterface]> {
    return await this.userService.getAllUsers();
  }
}
