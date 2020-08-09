import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { OperationEntity } from './operation.entity';

@Injectable()
export class OperationService {
  constructor(
    private connection: Connection,
    @InjectRepository(OperationEntity)
    private operationRepository: Repository<OperationEntity>
  ) {}

  public async getOperations(): Promise<OperationEntity[]> {
    return await this.operationRepository.find();
  }

  public async getOperationById(id: number): Promise<OperationEntity> {
    return await this.operationRepository.findOne(id);
  }

  public async addOperation(operation: any): Promise<OperationEntity> {
    const newOperation = this.operationRepository.create({ ...operation });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(newOperation);
      await queryRunner.commitTransaction();
      return operation;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}

export interface OperationInterface {
  id: string;
  type: OperationType;
  categoryId: string;
  sum: number;
  currency: Currency;
}
