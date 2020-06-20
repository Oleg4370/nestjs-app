import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/shared/database';
import { UserModule } from '@src/app/user';
import { AuthModule } from '@src/app/auth';
import { OperationModule } from '@src/app/operation';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    OperationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
