import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '@src/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy, JwtStrategy } from '@src/app/auth/strategies';
import { UserModule } from '@src/app/user';
import { LogsModule } from '@src/shared/logs';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthEntity } from './auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.register({
      secret: config.token.secret,
      signOptions: { expiresIn: config.token.expiresIn },
    }),
    PassportModule,
    UserModule,
    LogsModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
