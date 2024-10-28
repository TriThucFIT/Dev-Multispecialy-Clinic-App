import { Card, DatePicker, Form } from 'antd'
import dayjs from 'dayjs'
import { FC, useEffect } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from 'recoil'
import {
  Appointment,
  appointmentsByDateSelector,
  AppointmentStatus,
  dateToGetAppointment
} from '../../stores'
import { CardContent } from '@renderer/components/ui/card'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@renderer/components/ui/avatar'

import { IoMdCheckboxOutline } from 'react-icons/io'
import { MdOutlineCancel } from 'react-icons/md'
import { AppointmentService } from '@renderer/api/services/Appointment/appointment.service'
import { usePopup } from '@renderer/hooks/usePopup'
import { checkDate } from '@renderer/utils/formatDate'

interface AppointmentPatientProps {
  onSelected: (appointment: Appointment) => void
}

export const AppointmentPatient: FC<AppointmentPatientProps> = ({ onSelected }) => {
  const appointments = useRecoilValueLoadable(appointmentsByDateSelector)
  const refreshAppointments = useRecoilRefresher_UNSTABLE(appointmentsByDateSelector)
  const [date, setDate] = useRecoilState(dateToGetAppointment)

  const handleSelectDate = (date: any) => {
    setDate(date.format())
  }

  useEffect(() => {
    refreshAppointments()
    setDate(dayjs().startOf('day').format())
  }, [])

  const handleCancel = (id: number) => {
    const appointmentService = new AppointmentService()
    appointmentService
      .cancelAppointment(id)
      .then((res) => {
        if (res.data) {
          usePopup(res.data.message_VN, 'success')
          refreshAppointments()
        }
      })
      .catch((err) => {
        console.log(err)
        if (err.response) {
          usePopup(err.response.data?.message_VN, 'error')
        } else usePopup(err.message, 'error')
      })
  }

  return (
    <div className="bg-white bg-opacity-65 shadow-2xl rounded-2xl p-3 h-[66vh]">
      <div>
        <Form.Item label="Tìm theo ngày" name="date">
          <DatePicker
            format={'YYYY-MM-DD'}
            defaultPickerValue={dayjs().startOf('day')}
            defaultValue={dayjs().startOf('day')}
            defaultOpenValue={dayjs().startOf('day')}
            className="w-36"
            onChange={handleSelectDate}
            allowClear={false}
          />
        </Form.Item>
        <h2 className="text-xl font-semibold text-primary">
          Danh sách lịch hẹn ngày :{' '}
          {date === dayjs().startOf('day').format() ? 'Hôm nay' : dayjs(date).format('DD/MM/YYYY')}
        </h2>
      </div>
      <div className="flex-1 flex justify-center items-center">
        {appointments.contents && appointments.contents.length > 0 ? (
          <Card className="w-full mt-2 shadow-lg">
            <CardContent className="p-0">
              <ScrollArea className="h-[48vh]">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Thông tin cuộc hẹn</h3>
                  <div className="space-y-2">
                    {appointments.contents.map((appointment: Appointment, index: any) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-2 hover:bg-accent rounded-lg"
                      >
                        <Avatar>
                          <AvatarImage
                            src={`https://picsum.photos/seed/${appointment?.patient?.id}/150/150`}
                            alt={appointment?.patient?.fullName || 'Patient'}
                          />
                          <AvatarFallback>
                            {appointment?.patient?.fullName?.charAt(0) || 'P'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid grid-cols-8 gap-3 flex-1">
                          <div className="col-span-6 flex-1 ">
                            <p className="text-lg font-medium text-primary"></p>
                            <div className="grid grid-cols-2 space-y-1">
                              <div className="col-span-1 font-semibold text-lg text-primary">
                                {appointment?.patient?.fullName || 'Không có tên'}
                              </div>
                              <div className="col-span-1 text-sm text-primary italic">
                                {appointment?.isWalkIn
                                  ? 'Đặt lịch trực tiếp'
                                  : 'Đặt lịch qua Website'}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 space-y-1">
                              <div className="col-span-1 text-sm text-muted-foreground ">
                                <span className="font-semibold">Ngày hẹn:</span>{' '}
                                {appointment?.date || 'Không có ngày'}
                              </div>
                              <div className="col-span-1 text-sm text-muted-foreground ">
                                <span className="font-semibold">Giờ hẹn:</span>{' '}
                                {appointment?.time || 'Không có giờ'}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 space-y-1">
                              <div className="col-span-1 text-sm text-muted-foreground">
                                <span className="font-semibold">Bác sĩ:</span>{' '}
                                {appointment?.doctor?.fullName || 'Không có bác sĩ'}
                              </div>
                              <div className="col-span-1 text-sm text-muted-foreground">
                                <span className="font-semibold">Trạng thái:</span>{' '}
                                <span
                                  className={
                                    appointment?.status === AppointmentStatus.CANCELLED
                                      ? 'text-error'
                                      : appointment?.status === AppointmentStatus.COMPLETED ||
                                          appointment?.status === AppointmentStatus.CHECKED_IN
                                        ? 'text-success'
                                        : 'text-primary'
                                  }
                                >
                                  {appointment?.status || 'Chưa xác định'}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 space-y-1">
                              <div className="text-sm text-muted-foreground truncate max-w-xs">
                                <span className="font-semibold">Triệu chứng:</span>{' '}
                                {appointment?.symptoms || 'Không có thông tin'}
                              </div>
                              <div className="col-span-1 text-sm text-muted-foreground">
                                <span className="font-semibold">Dịch vụ :</span>{' '}
                                {appointment?.service
                                  ? appointment?.service?.name === 'InHour'
                                    ? 'Khám thường'
                                    : 'Khám ngoài giờ'
                                  : 'Không có dịch vụ'}
                              </div>
                            </div>
                          </div>
                          {checkDate(appointment.date) ? (
                            <div className="col-span-2 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full">
                              <div className="flex justify-center items-center w-full sm:w-full flex-grow">
                                <button
                                  disabled={
                                    appointment.status === AppointmentStatus.COMPLETED ||
                                    appointment.status === AppointmentStatus.CHECKED_IN ||
                                    appointment.status === AppointmentStatus.CANCELLED
                                  }
                                  className={`btn ${
                                    appointment.status === AppointmentStatus.COMPLETED ||
                                    appointment.status === AppointmentStatus.CHECKED_IN
                                      ? 'disabled:btn-success disabled:cursor-not-allowed disabled:text-white'
                                      : appointment.status === AppointmentStatus.CANCELLED
                                        ? 'disabled:btn-error '
                                        : 'btn-primary '
                                  } btn-outline rounded-xl w-full`}
                                  onClick={() => onSelected(appointment)}
                                >
                                  <IoMdCheckboxOutline size={18} />{' '}
                                  <span className="hidden lg:flex">
                                    {appointment.status === AppointmentStatus.COMPLETED
                                      ? 'Hoàn thành'
                                      : 'Check-in'}
                                  </span>
                                </button>
                              </div>
                              <div className="flex justify-center items-center w-full sm:w-full flex-grow">
                                <button
                                  disabled={
                                    appointment.status === AppointmentStatus.CANCELLED ||
                                    appointment.status === AppointmentStatus.COMPLETED ||
                                    appointment.status === AppointmentStatus.CHECKED_IN
                                  }
                                  onClick={() => handleCancel(appointment.id)}
                                  className="btn btn-outline btn-error rounded-xl w-full"
                                >
                                  <MdOutlineCancel size={18} />
                                  <span className="hidden lg:flex">
                                    {appointment.status === AppointmentStatus.CANCELLED
                                      ? 'Đã hủy'
                                      : 'Hủy'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex-1">
                              <span className="text-muted-foreground italic w-full">
                                Lịch hẹn đã quá hạn, đã tự động hủy
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ) : appointments.state === 'loading' ? (
          <div className="flex-1 justify-center items-center">
            <div className="loading loading-bars loading-lg text-primary" />
          </div>
        ) : (
          <div className="h-[50vh] justify-center items-center flex">
            <div className="text-muted-foreground italic text-lg">
              Không có lịch hẹn nào trong ngày này !
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
