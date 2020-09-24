import { Body, Controller, Get, Param, Post, UseGuards, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '@src/app/auth/guards';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody
} from '@nestjs/swagger';
import { OperationService } from './operation.service';
import { operationSchema } from './operation.schemas';
import { OperationEntity } from './operation.entity';

@ApiBearerAuth()
@ApiTags('operations')
@Controller('api/operations')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all operations' })
  @ApiResponse({ status: 200, description: 'The found records', type: [OperationEntity] })
  @UseGuards(JwtAuthGuard)
  async getOperations(): Promise<OperationEntity[]> {
    return await this.operationService.getOperations();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get operation by id' })
  @ApiResponse({ status: 200, description: 'The found record', type: OperationEntity })
  @UseGuards(JwtAuthGuard)
  async getOperationById(@Param() params): Promise<OperationEntity> {
    return await this.operationService.getOperationById(params.id);
  }

  @Post('/add')
  @ApiOperation({ summary: 'Add new operation' })
  @ApiBody({ type: OperationEntity })
  @ApiResponse({ status: 201, description: 'Operation added', type: OperationEntity })
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
