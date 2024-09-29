import { Form, Modal } from 'antd'

export const CreatePrescription = ({
  isModalOpen,
  setIsModalOpen
}: {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}) => {
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal title="Tạo đơn thuốc mới" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form>
        <Form.Item></Form.Item>
      </Form>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Tạo Đơn Thuốc Mới</h2>

        {/* Thông tin bệnh nhân */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-semibold">Số điện thoại:</label>
            <input type="text" className="border p-2 w-full" placeholder="Nhập mã bệnh nhân" />
          </div>
          <div>
            <label className="font-semibold">Tên Bệnh Nhân:</label>
            <input type="text" className="border p-2 w-full" placeholder="Tên bệnh nhân" disabled />
          </div>
        </div>

        {/* Danh sách thuốc */}
        <div className="mb-4">
          <h3 className="font-bold mb-2">Danh Sách Thuốc</h3>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2">
              <label className="font-semibold">Tên Thuốc:</label>
              <input type="text" className="border p-2 w-full" placeholder="Nhập tên thuốc" />
            </div>
            <div>
              <label className="font-semibold">Liều Lượng:</label>
              <input type="text" className="border p-2 w-full" placeholder="500mg" />
            </div>
            <div>
              <label className="font-semibold">Số Lượng:</label>
              <input type="text" className="border p-2 w-full" placeholder="10" />
            </div>
            <div>
              <label className="font-semibold">Cách Dùng:</label>
              <input type="text" className="border p-2 w-full" placeholder="2 lần/ngày" />
            </div>
            <div>
              <label className="font-semibold">Thời Gian Dùng:</label>
              <input type="text" className="border p-2 w-full" placeholder="7 ngày" />
            </div>
          </div>
        </div>

        {/* Nút thêm thuốc */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Thêm Thuốc</button>

        {/* Nút lưu và hủy */}
        <div className="flex justify-end gap-4">
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Hủy</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Lưu Đơn Thuốc</button>
        </div>
      </div>
    </Modal>
  )
}
