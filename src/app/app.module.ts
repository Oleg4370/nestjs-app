import { Module } from '@nestjs/common';
import { DatabaseService } from '@src/database';
import { UserModule } from '@src/user';
import { AuthModule } from '@src/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
