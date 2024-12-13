import React, { useState } from 'react'
import { Form, Input, message } from 'antd'
import { AuthService } from '@renderer/api/services/Auth/Login.service'

interface ForgotPasswordFormProps {
  onClose: () => void
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onClose }) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values: { usernameOrEmail: string }) => {
    setIsLoading(true)
    try {
      const result = await AuthService.forgotPassword(values.usernameOrEmail)
      if (result) {
        console.log('ForgotPasswordForm -> values', values)
        onClose()
        message.success('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.')
        form.resetFields()
      } else {
        message.error('Không thể gửi hướng dẫn đặt lại mật khẩu. Vui lòng thử lại.')
      }
    } catch (error: any) {
      console.log('ForgotPasswordForm -> error', error)
      if (error.response) {
        message.error(error.response.data.message)
      } else {
        message.error('Không thể gửi hướng dẫn đặt lại mật khẩu. Vui lòng thử lại.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full flex justify-center mt-20">
      <Form
        form={form}
        name="forgotPassword"
        onFinish={handleSubmit}
        layout="vertical"
        className="w-1/3 lg:h-[400px] bg-white bg-opacity-90 rounded-lg p-5"
      >
        <Form.Item
          name="usernameOrEmail"
          label="Tên đăng nhập hoặc Email"
          className="text-lg font-semibold text-[#299ec4]"
          rules={[
            { required: true, message: 'Vui lòng nhập tên đăng nhập hoặc email!' },
            { type: 'string', min: 3, message: 'Tên đăng nhập hoặc email phải có ít nhất 3 ký tự!' }
          ]}
        >
          <Input className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="w-full border border-[#299ec4] hover:text-white text-[#299ec4] font-semibold rounded-lg p-2 lg:mt-10 mt-2 hover:bg-[#299ec4] focus:outline-none focus:ring-2 focus:ring-[#299ec4] focus:border-transparent"
          >
            {isLoading ? <span className="loading loading-spinner" /> : 'Đặt lại mật khẩu'}
          </button>
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end lg:mt-10 mt-2">
            <button onClick={onClose} type="button" className="text-[#299ec4] italic">
              Quay lại đăng nhập
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgotPasswordForm
