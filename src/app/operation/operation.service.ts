import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/shared/database';

@Injectable()
export class OperationService {
  constructor(
    private databaseService: DatabaseService
  ) {}

  public async getOperations(): Promise<[OperationInterface]> {
    return await this.databaseService.findAll('operations');
  }

  public async getOperationById(id: string): Promise<OperationInterface> {
    return await this.databaseService.find('operations', { id });
  }

  public async addOperation(newOperation: OperationInterface): Promise<OperationInterface> {
    const operation = {
      id: uuidv4(),
      ...newOperation
    }
    return await this.databaseService.add('operations', operation);
  }
}

export interface OperationInterface {
  id: string;
  operationType: OperationType;
  categoryId: string;
  sum: number;
  currency: Currency;
}
