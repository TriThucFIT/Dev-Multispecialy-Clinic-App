import { EmergencyInfo } from '@renderer/types/Doctor'
import { Button, Form, Input, Radio } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { AppointmentService } from '@renderer/api/services/Appointment/appointment.service'
import { usePopup } from '@renderer/hooks/usePopup'

export default function Emergency() {
  const [form] = Form.useForm<EmergencyInfo>()

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      try {
        console.log("values:", values);
        
        const admissionService = new AppointmentService()
        const regis = await admissionService.registrationEmergency(values)
        if (regis && regis.data) {
          form.resetFields()
          usePopup('Đã tiếp nhận bệnh nhân cấp cứu', 'success')
        } else {
          console.error(regis)
          usePopup('Đã có lỗi xảy ra', 'error')
        }
      } catch (error) {
        console.error(error)
        usePopup('Đã có lỗi xảy ra', 'error')
      }
    })
  }
  return (
    <div className="">
      <Form
        form={form}
        name="appointment"
        layout="vertical"
        className="flex flex-1 flex-col justify-between px-5 col-span-2"
      >
        <h1 className="text-2xl font-bold mb-4">
          Tiếp nhận cấp cứu&nbsp;
          <span className="text-primary">DMC</span>
        </h1>
        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Họ và tên không được để trống'
              }
            ]}
          >
            <Input
              placeholder="Nhập họ và tên"
              onChange={(e: any) => form.setFieldsValue({ fullName: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            label="Tuổi"
            name="age"
            rules={[
              {
                required: true,
                message: 'Tuổi không được để trống'
              },
              {
                pattern: /^[0-9]*$/,
                message: 'Tuổi phải là số'
              }
            ]}
          >
            <Input id="age" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label="Giới tính"
            name="gender"
            layout="horizontal"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn giới tính'
              }
            ]}
            initialValue={true}
          >
            <Radio.Group
              defaultValue={true}
              onChange={(e) =>
                form.setFieldsValue({
                  gender: e.target.value
                })
              }
            >
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <Form.Item
          label="Mô tả sơ bộ tình trạng bệnh nhân cấp cứu"
          name="symptoms"
          rules={[{ required: true, message: 'Vui lòng mô tả tình trạng bệnh nhân' }]}
        >
          <TextArea
            showCount
            maxLength={200}
            placeholder="Mô tả sơ bộ tình trạng bệnh nhân cấp cứu"
            onChange={(e) => form.setFieldsValue({ symptoms: e.target.value })}
          />
        </Form.Item>
        <div className="flex justify-end mt-3">
          <Button type="primary" className="w-full my-5" onClick={handleSubmit}>
            Tiếp tục
          </Button>
        </div>
      </Form>
    </div>
  )
}
