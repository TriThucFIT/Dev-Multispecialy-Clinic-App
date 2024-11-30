import { Allergy } from '@renderer/types/Doctor'
import { Button, Form, Input, Modal, Select } from 'antd'
import clsx from 'clsx'
import { useRecoilState } from 'recoil'
import { allergiesState } from './stores'

export const ModalAllergies = ({
  isModalOpen,
  setIsModalOpen
}: {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}) => {
  const [allergies, _setAllergies] = useRecoilState<Allergy[]>(allergiesState)

  return (
    <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
      <div className="p-4 space-y-4">
        <div className="space-y-4">
          <div className="text-xl font-bold">Danh Sách Dị Ứng</div>
          {allergies?.length === 0 ? (
            <div className="italic text-gray-500">Không có dị ứng</div>
          ) : (
            <div className="max-h-96 overflow-y-hidden rounded-lg border">
              <div className="grid grid-cols-2 gap-4 py-4 bg-primary-500 text-center font-semibold text-white">
                <label className="col-span-1 border-white">Tên Dị Ứng</label>
                <label className="col-span-1">Mức Độ</label>
              </div>
              {allergies?.map((allergy, index) => (
                <div
                  key={allergy.id}
                  className={clsx('grid grid-cols-2 py-4 text-center font-semibold', {
                    'border-b': index !== allergies.length - 1
                  })}
                >
                  <div className="col-span-1">{allergy.name}</div>
                  <div className="col-span-1 flex justify-center ">
                    <div
                      className={clsx('rounded-full w-12 text-center', {
                        'text-red-500 bg-red-100': allergy.severity === 'Nặng',
                        'text-yellow-500 bg-yellow-100': allergy.severity === 'Vừa',
                        'text-green-500 bg-green-100': allergy.severity === 'Nhẹ'
                      })}
                    >
                      {allergy.severity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="text-xl font-bold">Thêm mới</div>
          <Form labelCol={{ span: 6 }}>
            <Form.Item label="Tên dị ứng">
              <Input />
            </Form.Item>
            <Form.Item label="Mức độ">
              <Select
                defaultValue="Nhẹ"
                options={[
                  { label: 'Nhẹ', value: 'Nhẹ' },
                  { label: 'Vừa', value: 'Vừa' },
                  { label: 'Nặng', value: 'Nặng' }
                ]}
              />
            </Form.Item>
            <div className="w-full flex justify-end">
              <Button type="primary">Thêm mới</Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
