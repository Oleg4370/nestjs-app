import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { config } from '@src/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy, JwtStrategy } from '@src/app/auth/strategies';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: config.token.secret,
      signOptions: { expiresIn: config.token.expiresIn },
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
