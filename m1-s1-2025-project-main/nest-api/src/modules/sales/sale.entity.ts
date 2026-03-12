import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity, type BookId } from '../books/entities/book.entity';
import { Customer } from '../customers/customer.entity';

export type SaleId = number & { __brand: 'Sale' };

@Entity('sales')
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: SaleId;

  @Column({ name: 'purchased_at', type: 'date' })
  purchasedAt: Date;

  @Column({ name: 'book_id', type: 'uuid' })
  bookId: BookId;

  @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;

  @Column({ name: 'customer_id', type: 'int' })
  customerId: number;

  @ManyToOne(() => Customer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}