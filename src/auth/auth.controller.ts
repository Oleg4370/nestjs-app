import { Controller, Post, Body, UseGuards, Request, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from '@src/auth/guards';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() user) {
    return await this.authService.login(user);
  }

  @Post('/refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(@Body() tokenData) {
    return await this.authService.refreshToken(tokenData.refreshToken);
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logout(@Request() req) {
    await this.authService.removeRefreshToken({ login: req.user });
    return 'Successfully logged out!';
  }
}
