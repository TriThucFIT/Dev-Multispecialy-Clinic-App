import { Form } from 'antd'
import { Step1, Step2 } from './components'
import { useRecoilValue } from 'recoil'
import { Suspense } from 'react'
import { stepState } from './stores'

export default function Appointment() {
  const step = useRecoilValue(stepState)
  const [form] = Form.useForm()
  return (
    <div className="">
      <Form
        form={form}
        name="appointment"
        layout="vertical"
        className="flex flex-1 flex-col justify-between px-5 col-span-2"
      >
        <h1 className="text-2xl font-bold mb-4">
          Đặt lịch thăm khám tại&nbsp;
          <span className="text-primary">DMC</span>
        </h1>
        <Suspense fallback={<div className="loading loading-bars text-primary"></div>}>
          {
            {
              1: <Step1 form={form} />,
              2: <Step2 form={form} />
            }[step]
          }
        </Suspense>
      </Form>
    </div>
  )
}
