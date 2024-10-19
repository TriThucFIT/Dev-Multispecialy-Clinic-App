import { useEffect, useState } from 'react'
import { CardContent, Card } from '@renderer/components/ui/card'
import { useRecoilState } from 'recoil'
import { useDebounce } from '@uidotdev/usehooks'
import { Avatar, AvatarFallback, AvatarImage } from '@renderer/components/ui/avatar'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { AppointmentService } from '@renderer/api/services/Appointment/appointment.service'
import {
  Appointment,
  appointmentByPatientState,
  AppointmentStatus
} from '../Receptionits/Admission/stores'

export const AppointmentSearch = ({ searchValue, onSelected }) => {
  const appointmentService = new AppointmentService()
  const [appointments, setAppointments] = useRecoilState(appointmentByPatientState)
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchValue, 500)
  const isShowSearch =
    !isSearching && (!appointments || appointments.length === 0) && searchValue.length >= 10

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 5) {
      setIsSearching(true)
      appointmentService
        .getAppointmentByPatient(debouncedSearchTerm)
        .then((res) => {
          setAppointments(res || [])
          setIsSearching(false)
        })
        .catch((err) => {
          console.error(err)
          setAppointments([])
          setIsSearching(false)
        })
    } else {
      setAppointments([])
    }
  }, [debouncedSearchTerm])

  return (
    <div className="relative w-full">
      {isSearching ? (
        <div className="mb-5 loading loading-spinner text-primary"></div>
      ) : (
        <>
          {appointments && appointments.length > 0 && (
            <Card className="absolute z-10 w-full mt-2 shadow-lg">
              <CardContent className="p-0">
                <ScrollArea className="h-[60vh]">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Thông tin cuộc hẹn</h3>
                    <div className="space-y-2">
                      {appointments.map((appointment: Appointment, index: any) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-2 hover:bg-accent rounded-lg cursor-pointer"
                          onClick={() => onSelected(appointment)}
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
                          <div className="flex-1">
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
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </>
      )}
      {isShowSearch && (
        <div className="text-muted-foreground italic">
          Không tìm thấy lịch hẹn - kiểm tra lại thông tin hoặc đăng ký một lịch hẹn mới
        </div>
      )}
    </div>
  )
}
