import { BookId } from '../books/entities/book.entity';

export class CreateSaleDto {
  bookId: BookId;
  customerId: number;
  purchasedAt: Date;
}