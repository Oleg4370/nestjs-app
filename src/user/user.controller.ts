import { Controller, Get } from '@nestjs/common';
import { UserService, UserInterface } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  //TODO: add Guard - only for admin
  async getUser(): Promise<[UserInterface]> {
    return await this.userService.getAllUsers();
  }
}
