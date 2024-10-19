import { FC } from 'react'

export const OldPatient: FC = () => {
  return (
    <div className="w-full p-12 rounded-xl bg-white justify-center items-center bg-opacity-40">
      <p className="text-center text-primary text-xl">
        Bệnh nhân đã từng khám tại phòng khám, vui lòng nhập số điện thoại hoặc mã bệnh nhân để tìm
        kiếm thông tin bệnh nhân
      </p>
    </div>
  )
}
