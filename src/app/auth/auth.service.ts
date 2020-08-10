import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Repository, Connection } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/app/user';
import { LogsService } from '@src/shared/logs';
import { Token } from './auth.models';
import { AuthEntity } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private connection: Connection,
    private jwtService: JwtService,
    private userService: UserService,
    private logsService: LogsService,
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>
  ) {}

  async generateToken(userData: object): Promise<Token> {
    const refreshToken = uuidv4();
    const newTokenObject = this.authRepository.create({ refreshToken, ...userData });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(newTokenObject);
      await queryRunner.commitTransaction();
    } catch (err) {
      await this.logsService.create({ level: 'database', label: 'rollbackTransaction', message: err });
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return {
      accessToken: this.jwtService.sign(userData),
      refreshToken
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const { login, hash } = await this.userService.getUser(
        { login: username }
      );
      const isPasswordCorrect = hash && await bcrypt.compare(password, hash);

      if (login && isPasswordCorrect) {
        return { login };
      }
    } catch (err) {
      await this.logsService.create({ level: 'database', label: 'getUser', message: err });
    }
    return null;
  }

  async login(user: LoginInterface) {
    const payload = { login: user.username};

    return await this.generateToken(payload);
  }

  async removeRefreshToken(query: object) {
    try {
      const removedObject = await this.authRepository.delete(query);
      return removedObject.affected;
    } catch (err) {
      await this.logsService.create({ level: 'database', label: 'removeRefreshToken', message: err });
    }
  }

  async refreshToken(refreshToken: string): Promise<Token> {
    try {
      const refreshTokenData = await this.authRepository.findOneOrFail({ refreshToken });

      await this.removeRefreshToken({
        refreshToken: refreshTokenData.refreshToken
      });

      return await this.generateToken({ login: refreshTokenData.login});
    } catch (err) {
      throw new BadRequestException('RefreshToken not exist');
    }
  }
}

export interface LoginInterface {
  username: string;
  password: string,
}
