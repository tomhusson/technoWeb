import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/books/book.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthorModule } from './modules/authors/author.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SalesModule } from './modules/sales/sale.module';

@Module({
  imports: [DatabaseModule, AuthorModule, BookModule, CustomersModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}