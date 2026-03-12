import { Breadcrumb, Button, Form, Input, Skeleton, Space, Table, Typography } from 'antd'
import { useEffect } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuthorDetailsProvider } from '../providers/useAuthorDetailsProvider'
import { useAuthorProvider } from '../providers/useAuthorProvider'
import type { UpdateAuthorModel, AuthorBookModel } from '../AuthorModel'

interface AuthorDetailsProps {
  authorId: string
}

export function AuthorDetails({ authorId }: AuthorDetailsProps) {
  const { author, loadAuthor } = useAuthorDetailsProvider()
  const { updateAuthor } = useAuthorProvider()
  const [form] = Form.useForm<UpdateAuthorModel>()
  const navigate = useNavigate()

  useEffect(() => {
    loadAuthor(authorId)
  }, [authorId])

  useEffect(() => {
    if (author) {
      form.setFieldsValue({
        firstName: author.firstName,
        lastName: author.lastName,
        photoUrl: author.photoUrl,
      })
    }
  }, [author])

  const handleSave = (): void => {
    form.validateFields().then((values) => {
      updateAuthor(authorId, values)
    })
  }

  if (!author) return <Skeleton active />

  return (
    <Space direction="vertical" style={{ width: '95%', padding: '24px' }}>
      <Breadcrumb
        items={[
          { title: <Link to="/authors">Authors</Link> },
          { title: `${author.firstName} ${author.lastName}` },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Typography.Title level={1}>
        {author.firstName} {author.lastName}
      </Typography.Title>
        {author?.photoUrl && (
          <img
            src={author.photoUrl}
            alt={`${author.firstName} ${author.lastName}`}
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
          />
        )}
      <Form form={form} layout="vertical" style={{ maxWidth: 500 }}>
        <Form.Item name="firstName" label="Prénom" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Nom" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="photoUrl" label="Photo URL">
          <Input />
        </Form.Item>
        <Button type="primary" onClick={handleSave}>
          Sauvegarder
        </Button>
      </Form>

      <Typography.Title level={4} style={{ marginTop: 32 }}>
        Livres écrits ({author.bookCount ?? 0}) — Moyenne de ventes : {author.averageSales?.toFixed(1) ?? 0}
      </Typography.Title>

      <Table
        dataSource={author.books ?? []}
        rowKey="id"
        onRow={(record: AuthorBookModel) => ({
          onClick: () => navigate({ to: '/books/$bookId', params: { bookId: record.id } }),
          style: { cursor: 'pointer' },
        })}
        columns={[
          { title: 'Titre', dataIndex: 'title', key: 'title' },
          { title: 'Année', dataIndex: 'yearPublished', key: 'yearPublished' },
        ]}
      />
    </Space>
  )
}