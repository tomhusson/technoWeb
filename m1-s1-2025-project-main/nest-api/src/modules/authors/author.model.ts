import { AuthorId } from './author.entity';
import { BookEntity } from '../books/entities/book.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  bookCount?: number;
  averageSales?: number;
  books?: BookEntity[];
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  photoUrl?: string;
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;