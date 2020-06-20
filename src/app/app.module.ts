import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/shared/database';
import { UserModule } from '@src/user';
import { AuthModule } from '@src/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
