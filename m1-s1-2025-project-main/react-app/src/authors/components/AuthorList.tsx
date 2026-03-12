import { Button, Popconfirm, Table, Typography, Breadcrumb } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthorProvider } from '../providers/useAuthorProvider'
import { CreateAuthorModal } from './CreateAuthorModal'
import type { AuthorModel } from '../AuthorModel'

export function AuthorList() {
  const { authors, loadAuthors, createAuthor, deleteAuthor } = useAuthorProvider()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadAuthors()
  }, [])

  return (
    <div style={{ padding: '24px' }}>
      <Breadcrumb items={[{ title: 'Authors' }]} style={{ marginBottom: 16 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography.Title level={2}>Auteurs</Typography.Title>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Ajouter un auteur
        </Button>
      </div>
      <Table
        dataSource={authors}
        rowKey="id"
        onRow={(record: AuthorModel) => ({
          onClick: () => navigate({ to: '/authors/$authorId', params: { authorId: record.id } }),
          style: { cursor: 'pointer' },
        })}
        columns={[
          {
            title: 'Photo',
            key: 'photo',
            width: 60,
            render: (_: unknown, record: AuthorModel) =>
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
          { title: 'Livres écrits', dataIndex: 'bookCount', key: 'bookCount' },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record: AuthorModel) => (
              <Popconfirm
                title="Supprimer cet auteur ?"
                onConfirm={(e) => {
                  e?.stopPropagation()
                  deleteAuthor(record.id)
                }}
                onCancel={(e) => e?.stopPropagation()}
                okText="Oui"
                cancelText="Non"
              >
                <Button danger onClick={(e) => e.stopPropagation()}>
                  Supprimer
                </Button>
              </Popconfirm>
            ),
          },
        ]}
      />
      <CreateAuthorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={createAuthor}
      />
    </div>
  )
}