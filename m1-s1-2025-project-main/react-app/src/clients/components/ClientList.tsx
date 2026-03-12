import { Button, Typography, Breadcrumb } from 'antd'
import { useState, useEffect } from 'react'
import { useClientProvider } from '../providers/useClientProvider'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'

export function ClientList() {
  const { clients, loadClients, createClient, deleteClient } = useClientProvider()
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    loadClients()
  }, [])

  return (
    <div style={{ padding: '24px' }}>
      <Breadcrumb items={[{ title: 'Clients' }]} style={{ marginBottom: 16 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography.Title level={2}>Clients</Typography.Title>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Ajouter un client
        </Button>
      </div>
      <ClientListItem clients={clients} onDelete={deleteClient} />
      <CreateClientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={createClient}
      />
    </div>
  )
}