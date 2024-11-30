import { ePrescriptionStatus } from '@renderer/types/Prescription'
import { IoSyncCircle, IoCloseCircle, IoCheckmarkCircle } from 'react-icons/io5'

export const PrescriptionStatus = ({ statusPayment }: { statusPayment: ePrescriptionStatus }) => {
  const statusTextClsx = 'col-span-2 text-blueSecondary font-semibold text-start cursor-pointer'
  const iconClsx = 'flex items-center justify-center'

  const PrescriptionNew = () => (
    <>
      <div className={iconClsx}>
        <IoCloseCircle color="var(--error)" size={18} />
      </div>
      {/* <span className={statusTextClsx}>Chưa xử lý</span> */}
    </>
  )
  const PrescriptionProcessing = () => (
    <>
      <div className={iconClsx}>
        <IoSyncCircle color="var(--warning)" size={20} />
      </div>
      {/* <div className={statusTextClsx}>Đang xử lý</div> */}
    </>
  )
  const PrescriptionDone = () => (
    <>
      <div className={iconClsx}>
        <IoCheckmarkCircle color="var(--success)" size={20} />
      </div>
      {/* <div className={statusTextClsx}>Đã xử lý</div> */}
    </>
  )
  return (
    <div className="flex justify-center">
      {statusPayment === ePrescriptionStatus.new && <PrescriptionNew />}
      {statusPayment === ePrescriptionStatus.processing && <PrescriptionProcessing />}
      {statusPayment === ePrescriptionStatus.done && <PrescriptionDone />}
    </div>
  )
}
