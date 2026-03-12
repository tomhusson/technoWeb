import { useState } from 'react'
import axios from 'axios'
import type { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from '../AuthorModel'

export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<AuthorModel[]>([])

  const loadAuthors = (): void => {
    axios
      .get<AuthorModel[]>('http://localhost:3000/authors')
      .then((res) => setAuthors(res.data))
      .catch((err) => console.error(err))
  }

  const createAuthor = (author: CreateAuthorModel): void => {
    axios
      .post<AuthorModel>('http://localhost:3000/authors', author)
      .then(() => loadAuthors())
      .catch((err) => console.error(err))
  }

  const updateAuthor = (id: string, input: UpdateAuthorModel): void => {
    axios
      .patch<AuthorModel>(`http://localhost:3000/authors/${id}`, input)
      .then(() => loadAuthors())
      .catch((err) => console.error(err))
  }

  const deleteAuthor = (id: string): void => {
    axios
      .delete(`http://localhost:3000/authors/${id}`)
      .then(() => loadAuthors())
      .catch((err) => console.error(err))
  }

  return { authors, loadAuthors, createAuthor, updateAuthor, deleteAuthor }
}