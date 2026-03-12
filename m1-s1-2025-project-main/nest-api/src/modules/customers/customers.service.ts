import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { SaleEntity } from '../sales/sale.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  async findAll(): Promise<(Customer & { purchaseCount: number })[]> {
    const customers = await this.customerRepository.find();
    return Promise.all(
      customers.map(async (customer) => {
        const purchaseCount = await this.saleRepository.count({
          where: { customerId: customer.id },
        });
        return { ...customer, purchaseCount };
      }),
    );
  }

  async findOne(id: number): Promise<Customer & { sales: SaleEntity[] }> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);
    const sales = await this.saleRepository.find({
      where: { customerId: id },
      relations: ['book', 'book.author'],
    });
    return { ...customer, sales };
  }

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(dto);
    return this.customerRepository.save(customer);
  }

  async update(id: number, dto: UpdateCustomerDto): Promise<Customer> {
    await this.customerRepository.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}