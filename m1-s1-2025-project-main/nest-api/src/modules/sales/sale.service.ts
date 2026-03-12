import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { CreateSaleDto } from './sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  async create(dto: CreateSaleDto): Promise<SaleEntity> {
    const sale = this.saleRepository.create(dto);
    return this.saleRepository.save(sale);
  }

  async delete(id: number): Promise<void> {
    await this.saleRepository.delete(id);
  }
}