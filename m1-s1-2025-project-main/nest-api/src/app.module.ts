import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/books/book.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthorModule } from './modules/authors/author.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [DatabaseModule, AuthorModule, BookModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
