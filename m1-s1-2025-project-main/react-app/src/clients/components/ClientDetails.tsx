import { Breadcrumb, Descriptions, Form, Input, Button, Table, Typography } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useClientDetailsProvider } from '../providers/useClientDetailsProvider'
import { useClientProvider } from '../providers/useClientProvider'
import type { UpdateClientModel, SaleModel } from '../ClientModel'

interface ClientDetailsProps {
  clientId: number
}

export function ClientDetails({ clientId }: ClientDetailsProps) {
  const { client, loadClient } = useClientDetailsProvider()
  const { updateClient } = useClientProvider()
  const [form] = Form.useForm<UpdateClientModel>()
  const navigate = useNavigate()

  useEffect(() => {
    loadClient(clientId)
  }, [clientId])

  useEffect(() => {
    if (client) {
      form.setFieldsValue({
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        photoUrl: client.photoUrl,
      })
    }
  }, [client])

  const handleSave = (): void => {
    form.validateFields().then((values) => {
      updateClient(clientId, values)
    })
  }

  return (
    <div style={{ padding: '24px' }}>
      <Breadcrumb
        items={[
          { title: <a onClick={() => navigate({ to: '/clients' })}>Clients</a> },
          { title: client ? `${client.firstName} ${client.lastName}` : '...' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <Typography.Title level={2}>Détails du client</Typography.Title>
        {client?.photoUrl && (
          <img
            src={client.photoUrl}
            alt={`${client.firstName} ${client.lastName}`}
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', marginBottom: 16 }}
          />
        )}
      <Form form={form} layout="vertical" style={{ maxWidth: 500, marginBottom: 32 }}>
        <Form.Item name="firstName" label="Prénom" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Nom" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="photoUrl" label="Photo URL">
          <Input />
        </Form.Item>
        <Button type="primary" onClick={handleSave}>
          Sauvegarder
        </Button>
      </Form>

      <Typography.Title level={4}>Livres achetés</Typography.Title>
      <Table
        dataSource={client?.sales ?? []}
        rowKey="id"
        onRow={(record: SaleModel) => ({
          onClick: () => navigate({ to: '/books/$bookId', params: { bookId: record.book.id } }),
          style: { cursor: 'pointer' },
        })}
        columns={[
          { title: 'Titre', dataIndex: ['book', 'title'], key: 'title' },
          {
            title: 'Auteur',
            key: 'author',
            render: (_, record: SaleModel) =>
              `${record.book.author.firstName} ${record.book.author.lastName}`,
          },
          { title: "Date d'achat", dataIndex: 'purchasedAt', key: 'purchasedAt' },
        ]}
      />
    </div>
  )
}