import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SalesService } from './sale.service';
import { CreateSaleDto } from './sale.dto';
import { SaleEntity } from './sale.entity';

@Controller('sales')
export class SaleController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() dto: CreateSaleDto): Promise<SaleEntity> {
    return this.salesService.create(dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.salesService.delete(id);
  }
}