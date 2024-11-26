import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Patient } from '@renderer/types/Patient/patient'
import { ModalAllergies } from './ModalAllergies'
import { ModalHealthIndicator } from './ModalHealthIndicator'
import clsx from 'clsx'

type Allergy = {
  id: number
  name: string
  severity: 'Nhẹ' | 'Vừa' | 'Nặng'
}

type VitalSigns = {
  bloodPressure: string
  heartRate: number
  temperature: number
  oxygenSaturation: number
  height: number
  weight: number
}

type CurrentPatientDetailsProps = {
  patient: Patient | null
  allergies: Allergy[]
  vitalSigns: VitalSigns
}

const RowGrid = ({ label, value }: { label: string; value: string | number }) => (
  <div className="col-span-1">
    <div className="flex gap-2">
      <div className="font-semibold">{label}</div>
      <div>{value}</div>
    </div>
  </div>
)

const RowHealthIndicator = (props: { label: string; value: any; unit?: string }) => (
  <div>
    <span>{props.label}: </span>
    {props.value ? (
      <span>
        {props.value}
        {props.unit}
      </span>
    ) : (
      <span className="italic text-gray-500">Chưa khám</span>
    )}
  </div>
)

export function CurrentPatientDetails({
  patient,
  allergies,
  vitalSigns
}: CurrentPatientDetailsProps) {
  const [isModalAllergies, setIsModalAllergies] = useState(false)
  const [isModalHealthIndicator, setIsModalHealthIndicator] = useState(false)

  return (
    <Card className="bg-opacity-50 bg-white mb-5">
      <CardHeader>
        <div className="grid grid-cols-4">
          <CardTitle>Bệnh nhân hiện tại: {patient?.fullName}</CardTitle>
          <RowGrid label="Tuổi:" value={patient?.age?.toString() || 'Chưa có bệnh nhân'} />
          <RowGrid
            label="Giới tính:"
            value={
              patient?.gender !== undefined
                ? typeof patient?.gender === 'string'
                  ? patient.gender
                  : patient?.gender
                    ? 'Nam'
                    : 'Nữ'
                : 'Chưa có bệnh nhân'
            }
          />
          <RowGrid label="Số điện thoại:" value={patient?.phone || 'Chưa có bệnh nhân'} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <Label className="font-semibold text-lg">Triệu chứng</Label>
            <Textarea
              disabled={patient === null}
              value={patient?.symptoms || 'Chưa có bệnh nhân'}
              readOnly
              className="h-24"
            />
          </div>
          <div className="col-span-1">
            <Label className="font-semibold text-lg">Dị ứng</Label>
            <div className="border rounded-md bg-white" onClick={() => setIsModalAllergies(true)}>
              {/* {patient ? ( */}
              <ul className="list-none flex flex-col gap-3 h-24 overflow-y-scroll p-5">
                {allergies.length > 0 ? (
                  allergies.map((allergy) => (
                    <li key={allergy.id} className="flex justify-between">
                      <div> {allergy.name}</div>
                      <div
                        className={clsx('rounded-full w-12 text-center', {
                          'text-red-500 bg-red-100': allergy.severity === 'Nặng',
                          'text-yellow-500 bg-yellow-100': allergy.severity === 'Vừa',
                          'text-green-500 bg-green-100': allergy.severity === 'Nhẹ'
                        })}
                      >
                        {allergy.severity}
                      </div>
                    </li>
                  ))
                ) : (
                  <span className="italic text-gray-500">Không có dị ứng</span>
                )}
              </ul>
              {/* ) : (
              )} */}
            </div>
            <ModalAllergies isModalOpen={isModalAllergies} setIsModalOpen={setIsModalAllergies} />
          </div>
          <div className="col-span-2">
            <Label className="font-semibold text-lg">Chỉ số sức khỏe</Label>
            <div
              className="border rounded-md p-5 h-24 overflow-y-hidden bg-white"
              onClick={() => setIsModalHealthIndicator(true)}
            >
              <div className="grid grid-cols-3 gap-1 ">
                <RowHealthIndicator label="Chiều cao" value={vitalSigns.height} unit="m" />
                <RowHealthIndicator label="Nhịp tim" value={vitalSigns.heartRate} unit="bpm" />
                <RowHealthIndicator label="Huyết áp" value={vitalSigns.bloodPressure} unit="mmHg" />
                <RowHealthIndicator label="Cân nặng" value={vitalSigns.weight} unit="kg" />
                <RowHealthIndicator label="Nhiệt độ" value={vitalSigns.temperature} unit="°C" />
                <RowHealthIndicator
                  label="Độ bão hòa O2"
                  value={vitalSigns.oxygenSaturation}
                  unit="%"
                />
              </div>
            </div>
            <ModalHealthIndicator
              isModalOpen={isModalHealthIndicator}
              setIsModalOpen={setIsModalHealthIndicator}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
