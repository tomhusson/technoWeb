import { useState } from 'react'
import axios from 'axios'
import type { ClientModel } from '../ClientModel'

export const useClientDetailsProvider = () => {
  const [client, setClient] = useState<ClientModel | null>(null)

  const loadClient = (id: number): void => {
    axios
      .get<ClientModel>(`http://localhost:3000/customers/${id}`)
      .then((res) => setClient(res.data))
      .catch((err) => console.error(err))
  }

  return { client, loadClient }
}