import { Connection } from 'typeorm';
import { config } from '@src/config';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: config.dataBase.userRepo,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [config.dataBase.provider],
  },
];
