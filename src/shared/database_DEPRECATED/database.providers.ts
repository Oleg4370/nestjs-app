import { createConnection } from 'typeorm';
import { config } from '@src/config';

export const databaseProviders = [
  {
    provide: config.dataBase.provider,
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: config.dataBase.host,
      port: config.dataBase.port,
      username: config.dataBase.user,
      password: config.dataBase.password,
      database: config.dataBase.name,
      entities: [
        __dirname + '/../../app/**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];
