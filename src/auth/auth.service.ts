import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '@src/user';
import { DatabaseService } from '@src/shared/database';
import { JwtService } from '@nestjs/jwt';
import { Token } from '@src/auth/auth.models';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private databaseService: DatabaseService
  ) {}

  async generateToken(userData: object): Promise<Token> {
    const refreshToken = uuidv4();
    await this.databaseService.add('refreshTokens', { refreshToken, ...userData });

    return {
      accessToken: this.jwtService.sign(userData),
      refreshToken
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const { login, hash } = await this.usersService.getUser(username);
    const isPasswordCorrect = hash && await bcrypt.compare(password, hash);

    if (login && isPasswordCorrect) {
      return { login };
    }
    return null;
  }

  async login(user: LoginInterface) {
    const payload = { login: user.username};

    return await this.generateToken(payload);
  }

  async removeRefreshToken(query: object): Promise<string> {
    const removedObject = await this.databaseService.remove('refreshTokens', query);

    return removedObject.refreshToken;
  }

  async refreshToken(refreshToken: string): Promise<Token> {
    const refreshTokenData = await this.databaseService.find('refreshTokens', { refreshToken });
    if (isEmpty(refreshTokenData)) {
      throw new BadRequestException('RefreshToken not exist');
    }

    await this.removeRefreshToken({
      refreshToken: refreshTokenData.refreshToken
    });
    return await this.generateToken({ login: refreshTokenData.login});
  }
}

export interface LoginInterface {
  username: string;
  password: string,
}
