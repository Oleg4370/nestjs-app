import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({ select: ['login', 'id']});
  }

  getUserById(id): Promise<UserEntity> {
    return this.userRepository.findOneOrFail(id, { select: ['login', 'id']});
  }

  getUser(condition): Promise<UserEntity> {
    return this.userRepository.findOneOrFail(condition);
  }
}

export interface UserInterface {
  login: string;
  hash?: string;
  password?: string,
  id?: number;
}
