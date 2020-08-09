import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '@src/config';
import { UserModule } from '@src/app/user';
import { AuthModule } from '@src/app/auth';
import { OperationModule } from '@src/app/operation';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
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
    OperationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
