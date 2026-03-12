export type SaleModel = {
  id: number
  purchasedAt: string
  book: {
    id: string
    title: string
    author: {
      firstName: string
      lastName: string
    }
  }
}

export type ClientModel = {
  id: number
  firstName: string
  lastName: string
  email?: string
  photoUrl?: string
  purchaseCount?: number
  sales?: SaleModel[]
}

export type CreateClientModel = {
  firstName: string
  lastName: string
  email?: string
  photoUrl?: string
}

export type UpdateClientModel = Partial<CreateClientModel>