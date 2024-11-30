import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { FileText, Stethoscope, TestTube, Pill, ClipboardList, CircleCheck } from 'lucide-react'
import { AIAssistant } from './AIAssistant'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  additionalNotesState,
  diagnosisState,
  followUpDateState,
  labTestsState,
  prescriptionState,
  selectedLabTestsState
} from './stores'
import { LabTestExamination } from './LabTest'
import { LabTest } from '@renderer/types/Doctor'
import { PatientExaminationProps } from './stores/type'
import MedicalRecordView from './MedicalRecordView'
import { TestSelectionTab } from './TestSelectionTab'

export function PatientExamination({
  patient,
  medications,
  onSubmitExamination,
  aiAssistEnabled
}: PatientExaminationProps) {
  const [diagnosis, setDiagnosis] = useRecoilState(diagnosisState)
  const [prescription, setPrescription] = useRecoilState(prescriptionState)
  const [followUpDate, setFollowUpDate] = useRecoilState(followUpDateState)
  const [additionalNotes, setAdditionalNotes] = useRecoilState(additionalNotesState)
  const selectedLabTests = useRecoilValue(selectedLabTestsState)
  const labTests = useRecoilValue<LabTest[]>(labTestsState)

  const handleAddMedication = (medicationId: number) => {
    const medicationToAdd = medications.find((med) => med.id === medicationId)
    if (medicationToAdd) {
      setPrescription((prev) => [...prev, medicationToAdd])
    }
  }

  const handleRemoveMedication = (medicationId: number) => {
    setPrescription((prev) => prev.filter((med) => med.id !== medicationId))
  }

  const handleSubmit = () => {
    onSubmitExamination({
      diagnosis,
      selectedLabTests,
      prescription,
      followUpDate,
      additionalNotes
    })
  }

  return (
    <Card className="bg-opacity-50 bg-white max-h-[60vh] overflow-auto">
      <CardHeader>
        <CardTitle>Khám Bệnh</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto ">
        <Tabs defaultValue="history">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="history">
              <FileText className="mr-2 h-4 w-4" />
              Lịch sử
            </TabsTrigger>
            <TabsTrigger value="diagnosis">
              <Stethoscope className="mr-2 h-4 w-4" />
              Chẩn đoán
            </TabsTrigger>
            <TabsTrigger value="labTests">
              <TestTube className="mr-2 h-4 w-4" />
              Xét nghiệm
            </TabsTrigger>
            <TabsTrigger value="prescription">
              <Pill className="mr-2 h-4 w-4" />
              Đơn thuốc
            </TabsTrigger>
            <TabsTrigger value="summary">
              <ClipboardList className="mr-2 h-4 w-4" />
              Tóm tắt
            </TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="h-[46vh] overflow-auto">
            <MedicalRecordView />
          </TabsContent>
          <TabsContent value="diagnosis">
            <Textarea
              className="mt-4"
              placeholder="Nhập chẩn đoán..."
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
            {aiAssistEnabled && <AIAssistant />}
          </TabsContent>
          <TabsContent value="labTests">
            <div className="mt-4 space-y-4">
              {labTests?.map((test) => (
                <div className='space-y-3'>
                  <div key={test.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`test-${test?.id}`}
                      checked={selectedLabTests?.includes(test?.id)}
                      // onChange={() => handleLabTestSelect(test?.id)}
                    />
                    <label htmlFor={`test-${test.id}`}>{test.name}</label>
                  </div>
                  <TestSelectionTab test={test} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="prescription">
            <div className="mt-4 space-y-4">
              <Select onValueChange={(value) => handleAddMedication(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thuốc" />
                </SelectTrigger>
                <SelectContent>
                  {medications?.map((med) => (
                    <SelectItem key={med?.id} value={med?.id?.toString()}>
                      {med?.name} - {med?.dosage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div>
                <h4 className="font-semibold mb-2">Thuốc đã kê:</h4>
                <ul className="list-disc pl-5">
                  {prescription?.map((med) => (
                    <li key={med?.id} className="flex justify-between items-center">
                      <span>
                        {med?.name} - {med?.dosage}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMedication(med?.id)}
                      >
                        Xóa
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="summary">
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="followUpDate">Ngày tái khám</Label>
                <Input
                  id="followUpDate"
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </div>
              <Textarea
                placeholder="Ghi chú hoặc hướng dẫn thêm cho bệnh nhân..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4 bg-primary text-white">Gửi chẩn đoán</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Chẩn đoán của bệnh nhân {patient?.fullName}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <p className="font-semibold">Lịch sử y tế:</p>
                    {/* <p>{medicalHistory}</p> */}
                    <p className="font-semibold">Chẩn đoán:</p>
                    <p>{diagnosis}</p>
                    <p className="font-semibold">Xét nghiệm:</p>
                    <ul className="list-disc pl-5">
                      {selectedLabTests.map((testId) => (
                        <li key={testId}>{labTests.find((test) => test.id === testId)?.name}</li>
                      ))}
                    </ul>
                    <p className="font-semibold">Đơn thuốc:</p>
                    <ul className="list-disc pl-5">
                      {prescription.map((med) => (
                        <li key={med.id}>
                          {med.name} - {med.dosage}
                        </li>
                      ))}
                    </ul>
                    <p className="font-semibold">
                      Ngày tái khám: <span className="font-normal italic">{followUpDate}</span>
                    </p>
                    <p className="font-semibold">Ghi chú:</p>
                    <p className="italic">{additionalNotes}</p>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button onClick={handleSubmit}>
                        <CircleCheck className="mr-2 h-5 w-5" />
                        Xác nhận
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
