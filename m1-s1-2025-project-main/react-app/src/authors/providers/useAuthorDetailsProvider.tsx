import { useState } from 'react'
import axios from 'axios'
import type { AuthorModel } from '../AuthorModel'

export const useAuthorDetailsProvider = () => {
  const [author, setAuthor] = useState<AuthorModel | null>(null)

  const loadAuthor = (id: string): void => {
    axios
      .get<AuthorModel>(`http://localhost:3000/authors/${id}`)
      .then((res) => setAuthor(res.data))
      .catch((err) => console.error(err))
  }

  return { author, loadAuthor }
}