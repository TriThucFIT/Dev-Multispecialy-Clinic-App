import { Suspense, useEffect, useState } from 'react'
import { Radio } from 'antd'
import { CardContent, Card } from '../ui/card'
import { FaUserDoctor } from 'react-icons/fa6'
import { GrCertificate } from 'react-icons/gr'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Calendar } from '../ui/calendar'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  appointmentStep,
  createAppointmentState,
  phoneInputPatientState
} from './states/appointmentStep'
import {
  DoctorListState,
  doctorSelectedState,
  doctorSelector,
  patientByPhone,
  specializationSelectedState,
  specializationSelector,
  specializationsState
} from '@renderer/states/doctor'
import { Doctor } from '@renderer/types/doctor'
import { useDebounce } from '@uidotdev/usehooks'
import { PatientService } from '@renderer/api/services/Patient/patient.service'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ScrollArea } from '../ui/scroll-area'
import { PatientCreationDTO } from '@renderer/types/Patient/patient'

export const ScheduleForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState<string>('09:00')
  const [symptoms, setSymptoms] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneInputPatientState)
  const [type, setType] = useState<'inHour' | 'outOfHour'>('inHour')
  const setStep = useSetRecoilState(appointmentStep)

  const today = new Date()
  const datePlus15Days = new Date(today.setDate(today.getDate() + 15))

  const [doctorSelected, setDoctorSelected] = useRecoilState(doctorSelectedState)
  const setSpecializationSelected = useSetRecoilState(specializationSelectedState)

  const setCreateAppointment = useSetRecoilState(createAppointmentState)

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
  const handleNextStep = (patient?: PatientCreationDTO) => {
    setCreateAppointment({
      service: type,
      date: formatDate(date!),
      time,
      symptoms,
      doctor: doctorSelected
        ? {
            name: doctorSelected?.fullName || '',
            specialization: doctorSelected?.specialization.specialization_id || ''
          }
        : undefined,
      patient: patient || {}
    })
    setStep(2)
  }

  return (
    <CardContent className="overflow-auto">
      <div className="space-y-4">
        <div>
          <div className="grid grid-cols-2 mb-6">
            <Radio.Group
              value={type}
              onChange={(e) => setType(e.target.value)}
              defaultValue={'inHour'}
              buttonStyle="solid"
              className="col-span-1"
            >
              <Radio.Button value="inHour">Khám trong giờ</Radio.Button>
              <Radio.Button value="outOfHour">Khám ngoài giờ</Radio.Button>
            </Radio.Group>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col w-full col-span-1">
              <Label className="mb-2">Chuyên khoa</Label>
              <Suspense fallback={<div className="loading loading-spinner text-primary"></div>}>
                <SpecializationSelect setSpecializationSelected={setSpecializationSelected} />
              </Suspense>
            </div>
            <div className="flex flex-col w-full col-span-1 mr-2">
              <Label className="mb-2">Bác Sĩ</Label>
              <Suspense fallback={<div className="loading loading-spinner text-primary"></div>}>
                <DoctorSelect setDoctorSelected={setDoctorSelected} />
              </Suspense>
            </div>
          </div>
        </div>

        <div>
          <Label>Ngày</Label>
          <Calendar
            mode="single"
            fromDate={new Date()}
            toDate={datePlus15Days}
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>

        <div>
          <Label>Thời Gian</Label>
          <Select onValueChange={(value) => setTime(value)} value={time}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn Thời Gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">09:00</SelectItem>
              <SelectItem value="10:00">10:00</SelectItem>
              <SelectItem value="11:00">11:00</SelectItem>
              <SelectItem value="14:00">14:00</SelectItem>
              <SelectItem value="15:00">15:00</SelectItem>
              <SelectItem value="16:00">16:00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Nhập triệu chứng của bệnh nhân"
        />

        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Số điện thoại hoặc Tên"
        />
        {phoneNumber && <PatientSearch phoneNumber={phoneNumber} onClickPatient={handleNextStep} />}

        <Button className="w-full" onClick={() => handleNextStep()}>
          Tiếp Tục
        </Button>
      </div>
    </CardContent>
  )
}

export const PatientSearch = ({ phoneNumber, onClickPatient }) => {
  const patientService = new PatientService()
  const [patients, setPatients] = useRecoilState(patientByPhone)
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(phoneNumber, 300)

  useEffect(() => {
    if (debouncedSearchTerm.length > 5) {
      setIsSearching(true)
      if (debouncedSearchTerm.length >= 5) {
        patientService
          .getPatientByPhone(debouncedSearchTerm)
          .then((res) => {
            setPatients(res)
            setIsSearching(false)
          })
          .catch((err) => {
            console.error(err)
            setPatients(null)
            setIsSearching(false)
          })
      }
    } else {
      setPatients(null)
    }
  }, [debouncedSearchTerm])

  return (
    <div className="relative w-full">
      {isSearching ? (
        <div className="mb-5 loading loading-spinner text-primary"></div>
      ) : (
        <>
          {patients && patients.length > 0 && (
            <Card className="absolute z-10 w-full mt-2 shadow-lg">
              <CardContent className="p-0">
                <ScrollArea className="h-[300px]">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Thông tin bệnh nhân</h3>
                    <div className="space-y-2">
                      {patients.map((patient) => (
                        <div
                          key={patient.id}
                          className="flex items-center space-x-4 p-2 hover:bg-accent rounded-lg cursor-pointer"
                          onClick={() => onClickPatient(patient)}
                        >
                          <Avatar>
                            <AvatarImage
                              src={`https://picsum.photos/seed/${patient.id}/150/150`}
                              alt={patient.fullName}
                            />
                            <AvatarFallback>{patient.fullName?.charAt(0) || 'P'}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{patient.fullName}</p>
                            <p className="text-sm text-muted-foreground">
                              Ngày sinh: {patient.dob}
                            </p>
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
      {!isSearching && (!patients || patients.length === 0) && phoneNumber.length >= 10 && (
        <div className="text-muted-foreground italic">
          Không tìm thấy bệnh nhân - mặc định sẽ đăng ký như một bệnh nhân mới
        </div>
      )}
    </div>
  )
}

const DoctorSelect = ({ setDoctorSelected }) => {
  const doctorList = useRecoilValue(doctorSelector)
  const doctorSelected = useRecoilValue(doctorSelectedState)
  const [doctorRender, setDoctorRender] = useState<Doctor[]>([])
  const setDoctorList = useSetRecoilState(DoctorListState)
  const specializationSelected = useRecoilValue(specializationSelectedState)

  useEffect(() => {
    if (specializationSelected) {
      setDoctorRender(
        doctorList?.filter(
          (doctor) => doctor.specialization.specialization_id == specializationSelected
        ) || []
      )
    } else {
      setDoctorRender(doctorList)
    }
  }, [specializationSelected])

  useEffect(() => {
    setDoctorList(doctorList)
  }, [])
  return (
    <Select
      onValueChange={(value) => {
        setDoctorSelected(
          doctorRender?.find((doctor) => doctor.employeeId.toString() === value) || null
        )
      }}
      value={doctorSelected?.employeeId.toString()}
    >
      <SelectTrigger>
        <SelectValue placeholder="Chọn Bác Sĩ" />
      </SelectTrigger>
      <SelectContent>
        {doctorRender?.map((doctor) => (
          <SelectItem
            className="hover:bg-primary hover:text-white w-full"
            key={doctor.id}
            value={doctor.employeeId.toString()}
          >
            <div className="grid grid-cols-5 w-96">
              <div className="flex items-center col-span-2">
                <FaUserDoctor color="#07b7f8" size={18} />
                <span className="ml-2">{doctor.fullName}</span>
              </div>
              <div className="flex items-center w-52 col-span-3">
                <GrCertificate color="#07b7f8" size={18} />
                <span className="ml-2">Khoa {doctor.specialization?.name}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const SpecializationSelect = ({ setSpecializationSelected }) => {
  const specializations = useRecoilValue(specializationSelector)
  const setSpecializationsState = useSetRecoilState(specializationsState)
  const [doctorSelected, setDoctorSelected] = useRecoilState(doctorSelectedState)

  useEffect(() => {
    if (specializations.length === 0) {
      setSpecializationsState(specializations)
    }
  }, [specializations])

  return (
    <Select
      onValueChange={(value) => {
        setSpecializationSelected(value)
        setDoctorSelected(null)
      }}
      value={doctorSelected?.specialization.specialization_id}
    >
      <SelectTrigger>
        <SelectValue placeholder="Chọn Chuyên Khoa" />
      </SelectTrigger>
      <SelectContent>
        {specializations?.map((specialization) => (
          <SelectItem
            key={specialization.specialization_id}
            value={specialization.specialization_id}
          >
            <div className="grid grid-cols-5 w-96">
              <div className="text-start col-span-2 flex">
                <GrCertificate color="#07b7f8" size={18} className="col-span-1 mr-3" />
                {specialization.specialization_id}
              </div>
              <div className="text-start col-span-3"> - Khoa {specialization?.name}</div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
