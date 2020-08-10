import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '@src/config';
import { UserModule } from '@src/app/user';
import { AuthModule } from '@src/app/auth';
import { OperationModule } from '@src/app/operation';
import { LogsModule } from '@src/shared/logs';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(config.dataBase.mongoLink),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.dataBase.host,
      port: config.dataBase.port,
      username: config.dataBase.user,
      password: config.dataBase.password,
      database: config.dataBase.name,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    OperationModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
