import { Breadcrumb, Button, DatePicker, Form, Input, InputNumber, Modal, Select, Skeleton, Space, Table, Typography } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import type { UpdateBookModel, SaleModel } from '../BookModel'
import axios from 'axios'

interface BookDetailsProps {
  id: string
}

type PurchaseFormModel = {
  customerId: number
  purchasedAt: string
}

type CustomerOption = {
  id: number
  firstName: string
  lastName: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)
  const [form] = Form.useForm<UpdateBookModel>()
  const [purchaseForm] = Form.useForm<PurchaseFormModel>()
  const [purchaseModalOpen, setPurchaseModalOpen] = useState<boolean>(false)
  const [customers, setCustomers] = useState<CustomerOption[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [id])

  useEffect(() => {
    if (book) {
      form.setFieldsValue({
        title: book.title,
        yearPublished: book.yearPublished,
        photoUrl: book.photoUrl,
      })
    }
  }, [book])

  const handleSave = (): void => {
    form.validateFields().then((values) => {
      axios.patch(`http://localhost:3000/books/${id}`, values).then(() => loadBook())
    })
  }

  const handleOpenPurchaseModal = (): void => {
    axios.get<CustomerOption[]>('http://localhost:3000/customers').then((res) => {
      setCustomers(res.data)
      setPurchaseModalOpen(true)
    })
  }

  const handlePurchase = (): void => {
    purchaseForm.validateFields().then((values) => {
      axios
        .post('http://localhost:3000/sales', { ...values, bookId: id })
        .then(() => {
          setPurchaseModalOpen(false)
          purchaseForm.resetFields()
          loadBook()
        })
    })
  }

  if (isLoading) return <Skeleton active />

  return (
    <Space direction="vertical" style={{ width: '95%', padding: '24px' }}>
      <Breadcrumb
        items={[
          { title: <Link to="/books">Books</Link> },
          { title: book?.title ?? '...' },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Typography.Title level={1}>{book?.title}</Typography.Title>
        {book?.photoUrl && (
          <img
            src={book.photoUrl}
            alt={book.title}
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
          />
        )}
      <Form form={form} layout="vertical" style={{ maxWidth: 500 }}>
        <Form.Item name="title" label="Titre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="yearPublished" label="Année de publication">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="photoUrl" label="Photo URL">
          <Input />
        </Form.Item>
        <Button type="primary" onClick={handleSave}>
          Sauvegarder
        </Button>
      </Form>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
        <Typography.Title level={3}>
          Clients ayant acheté ce livre ({book?.purchaseCount ?? 0})
        </Typography.Title>
        <Button type="primary" onClick={handleOpenPurchaseModal}>
          Enregistrer un achat
        </Button>
      </div>

      <Table
        dataSource={book?.sales ?? []}
        rowKey="id"
        onRow={(record: SaleModel) => ({
          onClick: () => navigate({ to: '/clients/$clientId', params: { clientId: String(record.customer.id) } }),
          style: { cursor: 'pointer' },
        })}
        columns={[
          {
            title: 'Client',
            key: 'customer',
            render: (_, record: SaleModel) =>
              `${record.customer.firstName} ${record.customer.lastName}`,
          },
          { title: "Date d'achat", dataIndex: 'purchasedAt', key: 'purchasedAt' },
        ]}
      />

      <Modal
        title="Enregistrer un achat"
        open={purchaseModalOpen}
        onOk={handlePurchase}
        onCancel={() => setPurchaseModalOpen(false)}
      >
        <Form form={purchaseForm} layout="vertical">
          <Form.Item name="customerId" label="Client" rules={[{ required: true }]}>
            <Select
              options={customers.map((c) => ({
                value: c.id,
                label: `${c.firstName} ${c.lastName}`,
              }))}
            />
          </Form.Item>
          <Form.Item name="purchasedAt" label="Date d'achat" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  )
}