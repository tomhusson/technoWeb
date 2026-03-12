export type AuthorModel = {
  id: string
  firstName: string
  lastName: string
  photoUrl?: string
  bookCount?: number
  averageSales?: number
  books?: AuthorBookModel[]
}

export type AuthorBookModel = {
  id: string
  title: string
  yearPublished: number
}

export type CreateAuthorModel = {
  firstName: string
  lastName: string
  photoUrl?: string
}

export type UpdateAuthorModel = Partial<CreateAuthorModel>