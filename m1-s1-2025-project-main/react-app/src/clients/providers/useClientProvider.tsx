import { useState } from 'react'
import axios from 'axios'
import type { ClientModel, CreateClientModel, UpdateClientModel } from '../ClientModel'

export const useClientProvider = () => {
  const [clients, setClients] = useState<ClientModel[]>([])

  const loadClients = (): void => {
    axios
      .get<ClientModel[]>('http://localhost:3000/customers')
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err))
  }

  const createClient = (client: CreateClientModel): void => {
    axios
      .post<ClientModel>('http://localhost:3000/customers', client)
      .then(() => loadClients())
      .catch((err) => console.error(err))
  }

  const updateClient = (id: number, input: UpdateClientModel): void => {
    axios
      .patch<ClientModel>(`http://localhost:3000/customers/${id}`, input)
      .then(() => loadClients())
      .catch((err) => console.error(err))
  }

  const deleteClient = (id: number): void => {
    axios
      .delete(`http://localhost:3000/customers/${id}`)
      .then(() => loadClients())
      .catch((err) => console.error(err))
  }

  return { clients, loadClients, createClient, updateClient, deleteClient }
}