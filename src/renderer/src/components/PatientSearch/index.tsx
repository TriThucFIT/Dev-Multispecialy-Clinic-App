import { useEffect, useState } from 'react'
import { CardContent, Card } from '@renderer/components/ui/card'
import { useRecoilState } from 'recoil'
import { patientByPhone } from '@renderer/states/doctor'
import { useDebounce } from '@uidotdev/usehooks'
import { PatientService } from '@renderer/api/services/Patient/patient.service'
import { Avatar, AvatarFallback, AvatarImage } from '@renderer/components/ui/avatar'
import { ScrollArea } from '@renderer/components/ui/scroll-area'

export const PatientSearch = ({
  searchValue,
  onClickPatient,
  phoneOnly
}: {
  searchValue: string
  onClickPatient: (patient: any) => void
  phoneOnly?: boolean
}) => {
  const patientService = new PatientService()
  const [patients, setPatients] = useRecoilState(patientByPhone)
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchValue, 500)

  useEffect(() => {
    if (debouncedSearchTerm.length >= 1) {
      setIsSearching(true)
      if (debouncedSearchTerm.length >= 1) {
        patientService
          .getPatientsByInfo(debouncedSearchTerm, phoneOnly)
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
      <Card className="absolute z-10 w-full mt-2 shadow-lg">
        {isSearching && <div className="mb-5 loading loading-spinner text-primary" />}
        <CardContent className="p-0">
          <ScrollArea className="h-[300px]">
            {patients && patients.length > 0 ? (
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Thông tin bệnh nhân</h3>
                <div className="space-y-2">
                  {patients.map((patient, index) => (
                    <div
                      key={index}
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
                        <p className="text-sm text-muted-foreground">Ngày sinh: {patient.dob}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-1 justify-center items-center">
                <div className="italic text-muted-foreground">Không tìm thấy bệnh nhân</div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
