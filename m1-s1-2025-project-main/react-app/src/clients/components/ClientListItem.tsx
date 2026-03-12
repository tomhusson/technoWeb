import { Button, Popconfirm, Space, Table } from 'antd'
import { useNavigate } from '@tanstack/react-router'
import type { ClientModel } from '../ClientModel'

interface ClientListItemProps {
  clients: ClientModel[]
  onDelete: (id: number) => void
}

export function ClientListItem({ clients, onDelete }: ClientListItemProps) {
  const navigate = useNavigate()

  return (
    <Table
      dataSource={clients}
      rowKey="id"
      onRow={(record) => ({
        onClick: () => navigate({ to: '/clients/$clientId', params: { clientId: String(record.id) } }),
        style: { cursor: 'pointer' },
      })}
      columns={[
                {
          title: 'Photo',
          key: 'photo',
          width: 60,
          render: (_: unknown, record: ClientModel) =>
            record.photoUrl ? (
              <img
                src={record.photoUrl}
                alt={`${record.firstName} ${record.lastName}`}
                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
              />
            ) : null,
        },
        { title: 'Prénom', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Nom', dataIndex: 'lastName', key: 'lastName' },
        { title: 'Livres achetés', dataIndex: 'purchaseCount', key: 'purchaseCount' },
        {
          title: 'Actions',
          key: 'actions',
          render: (_, record) => (
            <Space>
              <Popconfirm
                title="Supprimer ce client ?"
                onConfirm={(e) => {
                  e?.stopPropagation()
                  onDelete(record.id)
                }}
                onCancel={(e) => e?.stopPropagation()}
                okText="Oui"
                cancelText="Non"
              >
                <Button
                  danger
                  onClick={(e) => e.stopPropagation()}
                >
                  Supprimer
                </Button>
              </Popconfirm>
            </Space>
          ),
        },
      ]}
    />
  )
}