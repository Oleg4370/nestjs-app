import { Module } from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  exports: [UserService, DatabaseService]
})
export class UserModule {}
