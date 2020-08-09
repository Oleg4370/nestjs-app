import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'operations' })
export class OperationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  categoryId: number;

  @Column('varchar', { length: 45})
  type: string;

  @Column('varchar', { length: 45})
  currency: string;

  @Column('int')
  sum: number;
}
