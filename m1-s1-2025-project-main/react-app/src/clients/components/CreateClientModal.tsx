import { Form, Input, Modal } from 'antd'
import type { CreateClientModel } from '../ClientModel'

interface CreateClientModalProps {
  open: boolean
  onClose: () => void
  onCreate: (client: CreateClientModel) => void
}

export function CreateClientModal({ open, onClose, onCreate }: CreateClientModalProps) {
  const [form] = Form.useForm<CreateClientModel>()

  const handleOk = (): void => {
    form.validateFields().then((values) => {
      onCreate(values)
      form.resetFields()
      onClose()
    })
  }

  return (
    <Modal title="Nouveau client" open={open} onOk={handleOk} onCancel={onClose}>
      <Form form={form} layout="vertical">
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
      </Form>
    </Modal>
  )
}