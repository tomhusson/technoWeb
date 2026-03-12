export type BookAuthorModel = {
  id: string
  firstName: string
  lastName: string
}

export type SaleModel = {
  id: number
  purchasedAt: string
  customer: {
    id: number
    firstName: string
    lastName: string
  }
}

export type BookModel = {
  id: string
  title: string
  yearPublished: number
  photoUrl?: string
  purchaseCount?: number
  author: BookAuthorModel
  sales?: SaleModel[]
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  photoUrl?: string
}

export type UpdateBookModel = Partial<CreateBookModel>

export type FilterBooksModel = {
  limit: number
  offset: number
}

export type GetBooksModel = {
  totalCount: number
  data: BookModel[]
}