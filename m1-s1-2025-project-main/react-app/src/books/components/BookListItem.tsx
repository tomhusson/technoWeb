import { useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Button, Col, Popconfirm, Row } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface BookListItemProps {
  book: BookModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const [title, setTitle] = useState<string>(book.title)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const onCancelEdit = (): void => {
    setIsEditing(false)
    setTitle(book.title)
  }

  const onValidateEdit = (): void => {
    onUpdate(book.id, { title })
    setIsEditing(false)
  }

  return (
  <Row
    style={{
      width: '100%',
      height: '50px',
      borderRadius: '10px',
      backgroundColor: '#EEEEEE',
      margin: '1rem 0',
      padding: '.25rem',
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <Col span={1} style={{ margin: 'auto 0' }}>
      {book.photoUrl && (
        <img
          src={book.photoUrl}
          alt={book.title}
          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
        />
      )}
    </Col>
    <Col span={9} style={{ margin: 'auto 0' }}>
      {isEditing ? (
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <Link
          to="/books/$bookId"
          params={{ bookId: book.id }}
          style={{ margin: 'auto 0', textAlign: 'left' }}
        >
          <span style={{ fontWeight: 'bold' }}>{book.title}</span> -{' '}
          {book.yearPublished}
        </Link>
      )}
    </Col>
    <Col span={7} style={{ margin: 'auto 0' }}>
      by <span style={{ fontWeight: 'bold' }}>{book.author.firstName}</span>{' '}
      <span style={{ fontWeight: 'bold' }}>{book.author.lastName}</span>
    </Col>
    <Col span={3} style={{ margin: 'auto 0' }}>
      {book.purchaseCount ?? 0} achat(s)
    </Col>
    <Col
      span={4}
      style={{ alignItems: 'right', display: 'flex', gap: '.25rem', margin: 'auto 0' }}
    >
      {isEditing ? (
        <>
          <Button type="primary" onClick={onValidateEdit}>
            <CheckOutlined />
          </Button>
          <Button onClick={onCancelEdit}>
            <CloseOutlined />
          </Button>
        </>
      ) : (
        <Button type="primary" onClick={() => setIsEditing(true)}>
          <EditOutlined />
        </Button>
      )}
      <Popconfirm
        title="Supprimer ce livre ?"
        onConfirm={() => onDelete(book.id)}
        okText="Oui"
        cancelText="Non"
      >
        <Button type="primary" danger>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </Col>
  </Row>
)
}