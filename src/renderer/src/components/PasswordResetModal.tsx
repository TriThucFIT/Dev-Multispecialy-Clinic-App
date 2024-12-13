import React, { useEffect } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useResetRecoilState } from 'recoil'
import { resetPasswordData, ResetPasswordSelector, UserState } from '@renderer/state'

interface PasswordResetModalProps {
  isVisible: boolean
  onClose: () => void
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ isVisible, onClose }) => {
  const [form] = Form.useForm()
  const userState = useRecoilValue(UserState)
  const [resetPassword, setResetPassword] = useRecoilState(resetPasswordData)
  const loadable = useRecoilValueLoadable(ResetPasswordSelector)
  const resetData = useResetRecoilState(resetPasswordData)
  const handleResetPassword = async (old_password: string, new_password: string) => {
    setResetPassword({
      username: userState?.username || '',
      old_password,
      new_password,
      in_progress: true
    })
  }

  useEffect(() => {
    if (loadable.state === 'loading' && resetPassword.in_progress) {
      message.loading('Đang xử lý...')
    }

    if (loadable.state === 'hasValue' && resetPassword.in_progress) {
      const result = loadable.contents
      if (result) {
        message.success('Đặt lại mật khẩu thành công!')
        form.resetFields()
        resetData()
        onClose()
      } else {
        message.error('Không thể đặt lại mật khẩu. Vui lòng thử lại.')
      }
    }

    if (loadable.state === 'hasError' && resetPassword.in_progress) {
      const error = loadable.contents
      message.error(`Lỗi: ${error.message || 'Không thể đặt lại mật khẩu.'}`)
      resetData()
    }
  }, [loadable.state])

  const handleSubmit = async (values: {
    old_password: string
    password: string
    confirmPassword: string
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error('Mật khẩu mới không khớp')
      return
    }

    await handleResetPassword(values.old_password, values.password)
  }

  return (
    <Modal
      title="Đặt lại mật khẩu"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      className="max-w-md"
    >
      <Form
        form={form}
        name="resetPassword"
        onFinish={handleSubmit}
        layout="vertical"
        className="mt-4"
      >
        <Form.Item
          name="old_password"
          label="Mật khẩu cũ"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
        >
          <Input.Password className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu mới"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
            { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
          ]}
        >
          <Input.Password className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'))
              }
            })
          ]}
        >
          <Input.Password className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            {loadable.state === 'loading' ? (
              <span className="loading loading-spinner" />
            ) : (
              'Đặt lại mật khẩu'
            )}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default PasswordResetModal
