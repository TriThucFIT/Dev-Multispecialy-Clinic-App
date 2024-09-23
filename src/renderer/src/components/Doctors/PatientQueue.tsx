import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Patient } from '@renderer/types/Patient/patient'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentPatientState, patientListState } from '@renderer/states/doctor'
const renderPriorityBadge = (priority: number, age: number) => {
  const color =
    priority < 1 ? 'bg-red-500' : priority <= 2 || age >= 80 ? 'bg-yellow-500' : 'bg-green-500'
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

  useEffect(() => {
    const calculateInitialWaitingTimes = () => {
      return patients.map((patient) => {
        return Math.floor((new Date().getTime() - patient.arrivalOrder) / 1000) // tính bằng giây
      })
    }

    setWaitingTimes(calculateInitialWaitingTimes())

    const interval = setInterval(() => {
      setWaitingTimes((prevTimes) => prevTimes.map((time) => time + 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [patients])
  return (
    <Card className="md:col-span-1 bg-opacity-70 bg-white">
      <CardHeader>
        <CardTitle>Danh sách bệnh nhân ({patients.length})</CardTitle>
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
            <TableBody>
              {currentPatient && (
                <TableRow key={currentPatient.id} className="bg-primary bg-opacity-15">
                  <TableCell>{currentPatient.name}</TableCell>
                  <TableCell>{currentPatient.age}</TableCell>
                  <TableCell>
                    {renderPriorityBadge(currentPatient.priority, currentPatient.age)}
                  </TableCell>
                  <TableCell>Đang khám</TableCell>
                </TableRow>
              )}
              {patients.map(
                (patient, index) =>
                  patient.id !== currentPatient?.id && (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{renderPriorityBadge(patient.priority, patient.age)}</TableCell>
                      <TableCell>
                        {currentPatient?.id === patient.id
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
