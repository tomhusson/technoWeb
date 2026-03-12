import { createFileRoute } from '@tanstack/react-router'
import { Table, Typography, Button, Modal, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const Route = createFileRoute('/customers')({
  component: CustomersPage,
})

function CustomersPage() {
  const [data, setData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const loadCustomers = () => {
    axios.get('http://localhost:3000/customers')
      .then(res => setData(res.data))
      .catch(() => message.error("Erreur de chargement"))
  }

  useEffect(() => { loadCustomers() }, [])

  const onFinish = (values: any) => {
    axios.post('http://localhost:3000/customers', values)
      .then(() => {
        message.success("Client ajouté !")
        setIsModalVisible(false)
        form.resetFields()
        loadCustomers() // On rafraîchit la liste
      })
      .catch(() => message.error("Erreur lors de l'ajout"))
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Typography.Title level={2}>Liste des Clients</Typography.Title>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Ajouter un client
        </Button>
      </div>

      <Table 
        dataSource={data} 
        columns={[
          { title: 'Prénom', dataIndex: 'firstName', key: 'firstName' },
          { title: 'Nom', dataIndex: 'lastName', key: 'lastName' },
          { title: 'Email', dataIndex: 'email', key: 'email' },
        ]} 
        rowKey="id" 
      />

      <Modal 
        title="Nouveau Client" 
        open={isModalVisible} 
        onOk={() => form.submit()} 
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="firstName" label="Prénom" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Nom" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}