import { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { patientListState } from '@renderer/states/doctor'
import { Patient } from '@renderer/types/Patient/patient'
import { createPatient, PatientQueue } from '@renderer/utils/PriorityQueueCustomize'

export const PatientList: FC = () => {
  const [patientsList, setPatientsList] = useRecoilState<Patient[]>(patientListState)
  const patientQueue = PatientQueue

  let messageIndex: number = 0
  useEffect(() => {
    ;(window.api as any).onMessage((message: Patient) => {
      console.log('Received message', message)
      message.status = (messageIndex++).toString()
      patientQueue.enqueue(createPatient(message))
      setPatientsList(patientQueue.toArray())
    })
  }, [])

  return (
    <div className="mx-5 overflow-hidden bg-red-300">
      <div className="flex justify-center mb-3">
        <h1 className="text-2xl font-bold text-[#07b7f8] md:mt-16 md:text-3xl sm:mt-20 lg:mt-10 lg:text-4xl ">
          Danh Sách Bệnh Nhân
        </h1>
      </div>
      <div className="overflow-hidden bg-white bg-opacity-90 border-x-2 rounded-lg lg:h-[70vh] sm:h-[50vh] h-[20vh]">
        <div className="overflow-y-auto h-full">
          <table className="table w-full h-full">
            <thead className="text-center block w-full">
              <tr>
                <th className="w-[5%]">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th className="font-bold text-lg border w-[30%]">Họ Tên</th>
                <th className="font-bold text-lg border w-[30%]">Tuổi</th>
                <th className="font-bold text-lg border w-[30%]">Ưu Tiên</th>
                <th className="font-bold text-lg border w-[30%]">Tổng ({patientsList.length})</th>
              </tr>
            </thead>
            <tbody className="block w-full overflow-auto h-[83%] lg:h-[90%]">
              {patientsList.length > 0 ? (
                patientsList.map((message) => (
                  <tr key={message.id} className="text-center">
                    <th className="w-[5%]">
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td className="w-[30%]">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Patient"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{message.fullName}</div>
                          <div className="text-sm opacity-50">Trạng thái: {message.status}</div>
                        </div>
                      </div>
                    </td>
                    <td className="w-[30%]">
                      <br />
                      <span
                        className={`font-semibold ${message.age >= 80 ? 'border rounded-full py-1 px-3 bg-orange-300 text-white' : ''}`}
                      >
                        {message.age}
                      </span>
                    </td>
                    <td className="w-[30%]">{message.priority}</td>
                    <th className="w-[30%]">
                      <button className="btn btn-outline hover:bg-[#07b7f8] hover:text-white hover:scale-125 hover:border-none">
                        {patientQueue.toArray()[0].id === message.id ? 'Khám' : 'Xem Trước'}
                      </button>
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-sm italic">
                    Chưa có bệnh nhân trong hàng đợi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
