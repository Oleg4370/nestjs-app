import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'refreshTokens' })
export class AuthEntity {
  @ApiProperty()
  @PrimaryColumn('varchar', { length: 124 })
  refreshToken: string;

  @ApiProperty()
  @Column('varchar', { length: 124 })
  login: string;
}

export class TokenEntity {
  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  accessToken: string;
}

export class UserEntity {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
