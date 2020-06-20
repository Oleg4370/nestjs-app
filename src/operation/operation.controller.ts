import { Body, Controller, Get, Param, Post, UseGuards, BadRequestException } from '@nestjs/common';
import { OperationService, OperationInterface } from './operation.service';
import { JwtAuthGuard } from '@src/auth/guards';
import { operationSchema } from '@src/operation/operation.schemas';

@Controller('api/operations')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOperations(): Promise<[OperationInterface]> {
    return await this.operationService.getOperations();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOperationById(@Param() params): Promise<OperationInterface> {
    return await this.operationService.getOperationById(params.id);
  }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async addOperation(@Body() operationReq): Promise<OperationInterface> {
    let operation;
    try {
      operation = await operationSchema.validateAsync(operationReq);
    } catch (validationError) {
      throw new BadRequestException(validationError);
    }
    return await this.operationService.addOperation(operation);
  }
}
