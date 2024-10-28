import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Patient } from '@renderer/types/Patient/patient'
import { useEffect, useState } from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  currentPatientState,
  emergencyPatientList,
  isProcessingEmergencyState,
  patientListState
} from '@renderer/states/doctor'
import { Users } from 'lucide-react'
import { EmergencyInfo } from '@renderer/types/Doctor'
import { AdmissionSattus } from '../Receptionits/Admission/enums'
import { UserState } from '@renderer/state'
import { DoctorService } from '@renderer/api/services/Doctor/doctor.service'
import { usePopup } from '@renderer/hooks/usePopup'
const renderPriorityBadge = (priority: number, age?: number) => {
  const color =
    priority < 1
      ? 'bg-red-500'
      : priority <= 2 || (age ?? 0) >= 80
        ? 'bg-yellow-500'
        : 'bg-green-500'
  return <Badge className={`${color} text-white`}>{priority}</Badge>
}
const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes} m : ${seconds} s`
}

export function PatientList() {
  const [waitingTimes, setWaitingTimes] = useState<number[]>([])
  const patients = useRecoilValue<Patient[]>(patientListState)
  const currentPatient = useRecoilValue<Patient | null>(currentPatientState)
  const emergencyPatients = useRecoilValue<EmergencyInfo[]>(emergencyPatientList)
  const resetEmergencyList = useResetRecoilState(emergencyPatientList)
  const setIsProcessingEmergency = useSetRecoilState(isProcessingEmergencyState)
  const userCurent = useRecoilValue(UserState)

  useEffect(() => {
    const calculateInitialWaitingTimes = () => {
      return patients.map((patient) => {
        return Math.floor((new Date().getTime() - (patient.arrivalOrder ?? 0)) / 1000)
      })
    }

    setWaitingTimes(calculateInitialWaitingTimes())

    const interval = setInterval(() => {
      setWaitingTimes((prevTimes) => prevTimes.map((time) => time + 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [patients])

  const handleAcceptEmergency = async (emergency_id: number, status: AdmissionSattus) => {
    console.log('Emergency id:', status)
    if (status === AdmissionSattus.EMERGENCY) {
      const doctorService = new DoctorService()
      try {
        const accept = await doctorService.acceptEmergency({
          doctor_id: userCurent?.employeeId ?? '',
          registration_id: emergency_id
        })

        if (accept) {
          usePopup('Tiếp nhận bệnh nhân cấp cứu thành công', 'success')
          setIsProcessingEmergency(true)
        }
      } catch (error) {
        console.error('Error on accept emergency', error)
        usePopup('Lỗi tiếp nhận bệnh nhân cấp cứu', 'error')
      }
    } else {
      console.log('Emergency is already accepted')
      setIsProcessingEmergency(false)
      resetEmergencyList()
    }
  }
  return (
    <Card className="md:col-span-1 bg-opacity-50 bg-white">
      <CardHeader>
        <div className="xl:grid xl:grid-cols-2">
          <CardTitle className="lg:col-span-1">Danh sách bệnh nhân ({patients.length})</CardTitle>
        </div>
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4 text-hospital" />
          <span>Số bệnh nhân đã khám: 15</span>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Tuổi</TableHead>
                <TableHead>Mức ưu tiên</TableHead>
                <TableHead>Thời gian chờ</TableHead>
              </TableRow>
            </TableHeader>
            {emergencyPatients.length > 0 && (
              <TableBody className="border border-red-600 rounded-3xl relative">
                <Badge className="bg-red-600 text-white absolute -top-3 left-1 p-1">
                  Cấp cứu : {emergencyPatients.length}
                </Badge>

                {emergencyPatients.map((emergency: EmergencyInfo, index: any) => (
                  <TableRow key={index} className="bg-red-50 p-2  ">
                    <TableCell>{emergency.fullName}</TableCell>
                    <TableCell colSpan={2} className="truncate max-w-xs">
                      {emergency.symptoms}
                    </TableCell>
                    <TableCell>
                      {emergency.status === AdmissionSattus.EMERGENCY ? (
                        <button
                          onClick={() => handleAcceptEmergency(emergency.id, emergency.status)}
                          className="btn btn-error btn-outline"
                        >
                          Tiếp nhận
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAcceptEmergency(emergency.id, emergency.status)}
                          className="btn btn-success btn-outline"
                        >
                          Hoàn thành
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
            <TableBody>
              {currentPatient && (
                <TableRow key={currentPatient.id} className="bg-primary bg-opacity-15">
                  <TableCell>{currentPatient.fullName}</TableCell>
                  <TableCell>{currentPatient.age}</TableCell>
                  <TableCell>
                    {renderPriorityBadge(currentPatient?.priority ?? 0, currentPatient.age ?? 0)}
                  </TableCell>
                  <TableCell>Đang khám</TableCell>
                </TableRow>
              )}
              {patients.map(
                (patient, index) =>
                  patient.id !== currentPatient?.id && (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.fullName}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>
                        {renderPriorityBadge(patient.priority ?? 0, patient.age ?? 0)}
                      </TableCell>
                      <TableCell>
                        {currentPatient?.id === patient.id && emergencyPatients.length < 0
                          ? 'Đang khám'
                          : formatTime(waitingTimes[index])}
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
