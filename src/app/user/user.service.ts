import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/shared/database';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  getUser(login: string): Promise<UserInterface> {
    return this.databaseService.find('users', { login });
  }

  addNewUser(newUser: UserInterface): Promise<UserInterface> {
    return this.databaseService.add('users', newUser);
  }

  async getAllUsers(): Promise<any> {
    const users: Array<UserInterface> = await this.databaseService.findAll('users');
    return users.map(({hash, ...userData}) => userData);
  }
}

export interface UserInterface {
  login: string;
  hash?: string;
  password?: string,
  id?: string;
}
