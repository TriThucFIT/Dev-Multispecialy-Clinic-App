import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
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
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import {
  additionalNotesState,
  diagnosisState,
  followUpDateState,
  isCreatePrescriptionState,
  prescriptionState,
  submitExaminationSelector,
  treatmentPlanState
} from './stores'
import { LabTestExamination } from './LabTest'
import { PatientExaminationProps } from './stores/type'
import MedicalRecordView from './MedicalRecordView'
import { Medication } from './Medication'
import { useEffect } from 'react'

export function PatientExamination({
  patient,
  onSubmitExamination,
  aiAssistEnabled
}: PatientExaminationProps) {
  const [diagnosis, setDiagnosis] = useRecoilState(diagnosisState)
  const [treatmentPlan, setTreatmentPlan] = useRecoilState(treatmentPlanState)
  const prescription = useRecoilValue(prescriptionState)
  const [followUpDate, setFollowUpDate] = useRecoilState(followUpDateState)
  const [additionalNotes, setAdditionalNotes] = useRecoilState(additionalNotesState)

  const setIsSubmit = useSetRecoilState(isCreatePrescriptionState)
  const submitResult = useRecoilValueLoadable(submitExaminationSelector)

  const handleSubmit = () => {
    setIsSubmit(true)
  }
  useEffect(() => {
    if (submitResult.state === 'hasError' || !submitResult.contents) {
      setIsSubmit(false)
    }
    if (submitResult.state === 'hasValue' && submitResult.contents) {
      setIsSubmit(false)
      onSubmitExamination('done')
    }
  }, [submitResult.state])

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
            <div className="flex flex-col gap-3">
              <Textarea
                className="mt-4"
                placeholder="Nhập chẩn đoán..."
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
              <Textarea
                className="mt-4"
                placeholder="Phác đồ điều trị..."
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
              />

              {aiAssistEnabled && <AIAssistant />}
            </div>
          </TabsContent>
          <TabsContent value="labTests">
            <LabTestExamination onSubmitExamination={onSubmitExamination} />
          </TabsContent>
          <TabsContent value="prescription">
            <Medication />
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
                    <p className="font-semibold">Chẩn đoán:</p>
                    <p>{diagnosis}</p>
                    <p className="font-semibold">Phác đồ điều trị:</p>
                    <p>{treatmentPlan}</p>
                    <p className="font-semibold">Đơn thuốc:</p>
                    <ul className="list-disc pl-5">
                      {prescription.map((med) => (
                        <li key={med.id}>
                          {med.name} - {med.dosage} - {med.quantity} {med.unitStock}
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
