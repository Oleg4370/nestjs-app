import { Body, Controller, Get, Param, Post, UseGuards, BadRequestException } from '@nestjs/common';
import { OperationService, OperationInterface } from './operation.service';
import { JwtAuthGuard } from '@src/app/auth/guards';
import { operationSchema } from './operation.schemas';
import { OperationEntity } from './operation.entity';


@Controller('api/operations')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOperations(): Promise<OperationEntity[]> {
    return await this.operationService.getOperations();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOperationById(@Param() params): Promise<OperationEntity> {
    return await this.operationService.getOperationById(params.id);
  }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async addOperation(@Body() operationReq): Promise<OperationEntity> {
    try {
      const operation = await operationSchema.validateAsync(operationReq);
      return await this.operationService.addOperation(operation);
    } catch (validationError) {
      throw new BadRequestException(validationError);
    }
  }
}
