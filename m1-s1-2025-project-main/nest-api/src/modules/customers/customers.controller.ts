import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('customers') 
export class CustomersController {
  
  private customers = [
    { }
  ];

  @Get()
  findAll() {
    return this.customers;
  }

  @Post()
  create(@Body() newCustomer: any) {
    const id = this.customers.length + 1;
    const customer = { id, ...newCustomer };
    this.customers.push(customer);
    return customer;
  }
}