import { Form, Input, Modal } from 'antd'
import type { CreateAuthorModel } from '../AuthorModel'

interface CreateAuthorModalProps {
  open: boolean
  onClose: () => void
  onCreate: (author: CreateAuthorModel) => void
}

export function CreateAuthorModal({ open, onClose, onCreate }: CreateAuthorModalProps) {
  const [form] = Form.useForm<CreateAuthorModel>()

  const handleOk = (): void => {
    form.validateFields().then((values) => {
      onCreate(values)
      form.resetFields()
      onClose()
    })
  }

  return (
    <Modal title="Nouvel auteur" open={open} onOk={handleOk} onCancel={onClose}>
      <Form form={form} layout="vertical">
        <Form.Item name="firstName" label="Prénom" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Nom" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="photoUrl" label="Photo URL">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}