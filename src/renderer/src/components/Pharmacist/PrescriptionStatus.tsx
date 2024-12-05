import { IoSyncCircle, IoCloseCircle, IoCheckmarkCircle } from 'react-icons/io5'
import { PrescriptionStatus } from './store'

export const PrescriptionStatusRender = ({
  statusPresciption
}: {
  statusPresciption: PrescriptionStatus
}) => {
  const iconClsx = 'flex items-center justify-center'

  const PrescriptionNew = () => (
    <>
      <div className={iconClsx}>
        <IoCloseCircle color="var(--error)" size={18} />
      </div>
    </>
  )
  const PrescriptionProcessing = () => (
    <>
      <div className={iconClsx}>
        <IoSyncCircle color="var(--warning)" size={20} />
      </div>
    </>
  )
  const PrescriptionDone = () => (
    <>
      <div className={iconClsx}>
        <IoCheckmarkCircle color="var(--success)" size={20} />
      </div>
    </>
  )
  return (
    <div className="flex justify-center">
      {statusPresciption === PrescriptionStatus.PENDING && <PrescriptionNew />}
      {statusPresciption === PrescriptionStatus.IN_PROGRESS && <PrescriptionProcessing />}
      {statusPresciption === PrescriptionStatus.COMPLETED && <PrescriptionDone />}
    </div>
  )
}
