import { Controller, Post, Body, UseGuards, Request, HttpCode } from '@nestjs/common';
import { LocalAuthGuard, JwtAuthGuard } from '@src/app/auth/guards';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody
} from '@nestjs/swagger';
import { TokenEntity, UserEntity, AuthEntity } from './auth.entity';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Authentication' })
  @ApiBody({ type: UserEntity })
  @ApiResponse({ status: 200, description: 'User authenticated', type: TokenEntity })
  @UseGuards(LocalAuthGuard)
  async login(@Body() user) {
    return await this.authService.login(user);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiBody({ type: AuthEntity })
  @ApiResponse({ status: 200, description: 'Token refreshed', type: TokenEntity })
  @UseGuards(JwtAuthGuard)
  async refresh(@Body() tokenData) {
    return await this.authService.refreshToken(tokenData.refreshToken);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiBody({ type: AuthEntity })
  @ApiResponse({ status: 200, description: 'Successfully logged out!' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logout(@Request() req) {
    await this.authService.removeRefreshToken({ login: req.user });
    return 'Successfully logged out!';
  }
}
