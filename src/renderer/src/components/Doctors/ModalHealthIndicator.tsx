import { vitalSignsState } from '@renderer/states/doctor'
import { VitalSigns } from '@renderer/types/Doctor'
import { Button, Form, Input, Modal, Select } from 'antd'
import clsx from 'clsx'
import { useRecoilState } from 'recoil'

export const ModalHealthIndicator = ({
  isModalOpen,
  setIsModalOpen
}: {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}) => {
  const [vitalSigns, _setVitalSigns] = useRecoilState<VitalSigns>(vitalSignsState)

  return (
    <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
      <div className="p-4 space-y-4">
        <div className="text-xl font-bold">Chỉ số sức khỏe</div>
        <Form layout="vertical">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Chiều cao">
              <Input
                value={vitalSigns?.height}
                suffix={<span className="text-gray-500">m</span>}
              />
            </Form.Item>
            <Form.Item label="Cân nặng">
              <Input
                value={vitalSigns?.weight}
                suffix={<span className="text-gray-500">kg</span>}
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Nhịp tim">
              <Input
                value={vitalSigns?.heartRate}
                suffix={<span className="text-gray-500">bpm</span>}
              />
            </Form.Item>
            <Form.Item label="Huyết áp">
              <Input
                value={vitalSigns?.bloodPressure}
                suffix={<span className="text-gray-500">mmHg</span>}
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Nhiệt độ">
              <Input
                value={vitalSigns?.temperature}
                suffix={<span className="text-gray-500">°C</span>}
              />
            </Form.Item>
            <Form.Item label="Độ bão hòa O2">
              <Input
                value={vitalSigns?.oxygenSaturation}
                suffix={<span className="text-gray-500">%</span>}
              />
            </Form.Item>
          </div>
          <div>
            <Button type="primary" className="w-full">
              Lưu
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}
