import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from './author.model';
import { AuthorEntity, AuthorId } from './author.entity';
import { BookEntity } from '../books/entities/book.entity';
import { SaleEntity } from '../sales/sale.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    const authors = await this.authorRepository.find();
    return Promise.all(
      authors.map(async (author) => {
        const bookCount = await this.bookRepository.count({
          where: { authorId: author.id },
        });
        return { ...author, bookCount };
      }),
    );
  }

  public async getAuthorById(id: AuthorId): Promise<AuthorModel | undefined> {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) return undefined;

    const books = await this.bookRepository.find({
      where: { authorId: id },
    });

    const bookCount = books.length;

    const salesCounts = await Promise.all(
      books.map((book) =>
        this.saleRepository.count({ where: { bookId: book.id } }),
      ),
    );

    const averageSales =
      bookCount > 0
        ? salesCounts.reduce((a, b) => a + b, 0) / bookCount
        : 0;

    return { ...author, bookCount, averageSales, books };
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }

  public async updateAuthor(
    id: AuthorId,
    author: UpdateAuthorModel,
  ): Promise<AuthorModel | undefined> {
    const existing = await this.authorRepository.findOne({ where: { id } });
    if (!existing) return undefined;
    await this.authorRepository.update(id, author);
    return this.getAuthorById(id);
  }

  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.authorRepository.delete(id);
  }
}