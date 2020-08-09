import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'refreshTokens' })
export class AuthEntity {
  @PrimaryColumn('varchar', { length: 124 })
  refreshToken: string;

  @Column('varchar', { length: 124 })
  login: string;
}
