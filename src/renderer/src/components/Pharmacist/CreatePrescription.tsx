import { Medication } from '@renderer/types/Doctor'
import { AutoComplete, DatePicker, Form, Input, Modal, Select } from 'antd'
import { useRecoilState } from 'recoil'
import { medicationsState } from '../Doctors/stores'
import { useState } from 'react'
import { Button } from '../ui/button'

export const CreatePrescription = ({
  isModalOpen,
  setIsModalOpen
}: {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}) => {
  const [medications, _setMedications] = useRecoilState<Medication[]>(medicationsState)
  const [prescription, setPrescription] = useState<Medication[]>([])

  const handleAddMedication = (medicationId: number) => {
    const medicationToAdd = medications.find((med) => med.id === medicationId)
    if (medicationToAdd) {
      setPrescription((prev) => [...prev, medicationToAdd])
    }
  }
  const handleRemoveMedication = (medicationId: number) => {
    setPrescription((prev) => prev.filter((med) => med.id !== medicationId))
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} footer={false}>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Tạo Đơn Thuốc Mới</h2>
        <Form>
          <Form.Item label="Mã bệnh nhân/Số điện thoại">
            <AutoComplete placeholder="Nhập mã bệnh nhân hoặc số điện thoại" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Form.Item label="Tên Bệnh Nhân">
              <Input placeholder="Tên bệnh nhân" disabled />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input placeholder="Số điện thoại" disabled />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Form.Item label="Ngày sinh">
              <DatePicker disabled className="w-full" placeholder="Ngày sinh" />
            </Form.Item>
            <Form.Item label="Địa chỉ">
              <Input placeholder="Địa chỉ" disabled />
            </Form.Item>
          </div>
        </Form>

        <Select
          options={
            medications?.map((med) => ({
              label: `${med?.name} - ${med?.dosage}`,
              value: med?.id
            })) || []
          }
          placeholder="Chọn thuốc"
          onChange={(value) => handleAddMedication(Number(value))}
          className="w-full"
        />

        <div className="space-y-2 mt-4">
          <h4 className="font-semibold mb-2">Thuốc đã kê:</h4>
          <div className="grid grid-cols-10 font-semibold pl-5">
            <div className="col-span-2 text-center">Tên, hàm lượng thuốc</div>
            <div className="col-span-1 text-center">ĐVT</div>
            <div className="col-span-1 text-center">Cách dùng</div>
            <div className="col-span-1 text-center">Số lượng</div>
            <div className="col-span-4 text-center">Ghi chú</div>
          </div>
          <ul className="list-disc pl-5">
            {prescription?.map((med) => (
              <li key={med?.id} className="grid grid-cols-10 items-center py-2">
                <span className="col-span-2">
                  {med?.name} - {med?.dosage}
                </span>
                <span className="col-span-1 text-center">{med?.UOM}</span>
                <span className="col-span-1 text-center">
                  {med?.directions || 'Uống sau khi ăn, 2v/ngày'}
                </span>
                <div className="col-span-1 flex justify-center">
                  <Input type="text" className="w-1/2" />
                </div>
                <div className="col-span-4 flex justify-center">
                  <Input type="text" />
                </div>
                <div className="col-span-1 flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMedication(med?.id)}
                    className="w-1/2"
                  >
                    Xóa
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex justify-end mt-4">
          <button className="btn btn-primary">Tạo đơn thuốc</button>
        </div>
      </div>
    </Modal>
  )
}
