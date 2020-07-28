import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { config } from '@src/config';
import { User } from './user.entity';


@Injectable()
export class UserService {
  constructor(
    @Inject(config.dataBase.userRepo)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ select: ['login', 'id']});
  }

  async getUser(id): Promise<User> {
    return this.userRepository.findOneOrFail(id, { select: ['login', 'id']});
  }
}

export interface UserInterface {
  login: string;
  hash?: string;
  password?: string,
  id?: number;
}
