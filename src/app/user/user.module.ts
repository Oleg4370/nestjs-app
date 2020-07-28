import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/shared/database';
import { UserController, UserService } from '@src/app/user';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService,
  ],
})
export class UserModule {}
