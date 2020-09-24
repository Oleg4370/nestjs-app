import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'operations' })
export class OperationEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('int')
  categoryId: number;

  @ApiProperty()
  @Column('varchar', { length: 45})
  type: string;

  @ApiProperty()
  @Column('varchar', { length: 45})
  currency: string;

  @ApiProperty()
  @Column('int')
  sum: number;
}
