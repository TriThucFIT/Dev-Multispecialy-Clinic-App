import { Suspense, useEffect, useState } from 'react'
import { Radio } from 'antd'
import { CardContent } from '../ui/card'
import { FaUserDoctor } from 'react-icons/fa6'
import { GrCertificate } from 'react-icons/gr'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Calendar } from '../ui/calendar'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { appointmentStep, createAppointmentState, phoneInputPatientState } from './states/appointmentStep'
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
  const handleNestStep = () => {
    setCreateAppointment({
      service: type,
      date: formatDate(date!),
      time,
      symptoms,
      doctor: doctorSelected
        ? {
            name: doctorSelected?.fullName || '',
            specialization: doctorSelected?.specialization || ''
          }
        : undefined
    })
    setStep(2)
  }

  return (
    <CardContent>
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
        {phoneNumber && <PatientSearch phoneNumber={phoneNumber} onClickPatient={handleNestStep} />}

        <Button className="w-full" onClick={handleNestStep}>
          Tiếp Tục
        </Button>
      </div>
    </CardContent>
  )
}

const PatientSearch = ({ phoneNumber, onClickPatient }) => {
  const patientService = new PatientService()
  const [patient, setPatients] = useRecoilState(patientByPhone)
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(phoneNumber, 300)

  useEffect(() => {
    if (debouncedSearchTerm.length > 5) {
      setIsSearching(true)
      if (debouncedSearchTerm.length >= 10) {
        console.log('debouncedSearchTerm', debouncedSearchTerm)

        patientService
          .getPatientByPhone(debouncedSearchTerm)
          .then((res) => {
            setPatients(res)
            setIsSearching(false)
          })
          .catch((err) => {
            console.log(err)
            setIsSearching(false)
          })
      }
    } else {
      setPatients(null)
    }
  }, [debouncedSearchTerm])

  return (
    <div className="flex">
      <h1>
        {isSearching ? (
          <div className="loading loading-bars text-primary"></div>
        ) : (
          <>
            {patient && patient.fullName ? (
              <>
                <Label>Thông tin bệnh nhân</Label>
                <div
                  onClick={onClickPatient}
                  className="mt-3 grid grid-cols-2 gap-5 w-96 border rounded-xl p-5 cursor-pointer"
                >
                  <div className="flex">
                    <FaUserDoctor color="#07b7f8" size={18} />
                    <span className="ml-2">{patient.fullName}</span>
                  </div>
                  <div className="flex">
                    <GrCertificate color="#07b7f8" size={18} />
                    <span className="ml-2">{patient.dob}</span>
                  </div>
                </div>
              </>
            ) : (
              <Label className="text-gray-500 italic">
                Không tìm thấy bệnh nhân - mặc định sẽ đăng ký như một bệnh nhân mới
              </Label>
            )}
          </>
        )}
      </h1>
    </div>
  )
}

const DoctorSelect = ({ setDoctorSelected }) => {
  const doctorList = useRecoilValue(doctorSelector)
  const doctorSelected = useRecoilValue(doctorSelectedState)
  const [doctorRender, setDoctorRender] = useState<Doctor[]>([])
  const setDoctorList = useSetRecoilState(DoctorListState)
  const setSpecializationSelected = useSetRecoilState(specializationSelectedState)
  const specializationSelected = useRecoilValue(specializationSelectedState)

  useEffect(() => {
    if (specializationSelected) {
      setDoctorRender(
        doctorList?.filter((doctor) => doctor.specialization == specializationSelected) || []
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
        setSpecializationSelected(
          doctorRender?.find((doctor) => doctor.employeeId.toString() === value)?.specialization ||
            ''
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
            className="hover:bg-primary hover:text-white hover:text-lg"
            key={doctor.id}
            value={doctor.employeeId.toString()}
          >
            <div className="grid grid-cols-2 gap-5 w-96">
              <div className="flex">
                <FaUserDoctor color="#07b7f8" size={18} />
                <span className="ml-2">{doctor.fullName}</span>
              </div>
              <div className="flex">
                <GrCertificate color="#07b7f8" size={18} />
                <span className="ml-2">{doctor.specialization}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const SpecializationSelect = ({ setSpecializationSelected }) => {
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
      value={doctorSelected?.specialization}
    >
      <SelectTrigger>
        <SelectValue placeholder="Chọn Chuyên Khoa" />
      </SelectTrigger>
      <SelectContent>
        {specializations?.map((specialization) => (
          <SelectItem key={specialization} value={specialization}>
            <div className="flex">
              <GrCertificate color="#07b7f8" size={18} />
              <span className="ml-2">{specialization}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
