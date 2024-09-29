import { ePrescriptionStatus } from '@renderer/types/Prescription'
import { IoSyncCircle } from 'react-icons/io5'

export const PrescriptionStatus = ({ statusPayment }: { statusPayment: ePrescriptionStatus }) => {
  const statusTextClsx = 'col-span-2 text-blueSecondary font-semibold text-start cursor-pointer'
  const iconClsx = 'flex items-center justify-center'

  const PrescriptionNew = () => (
    <>
      <span className={iconClsx}>
        <img
          src="https://media.tenor.com/yjOrdcOkLPUAAAAi/green-dot.gif"
          alt="cancel"
          width="20"
          height="20"
        />
      </span>
      <span className={statusTextClsx}>Mới</span>
    </>
  )
  const PrescriptionProcessing = () => (
    <>
      <span className={iconClsx}>
        <IoSyncCircle color="var(--warning)" size={20} />
      </span>
      <span className={statusTextClsx}>Đang xử lý</span>
    </>
  )
  return (
    <div className="grid grid-cols-3">
      {statusPayment === ePrescriptionStatus.new && <PrescriptionNew />}
      {statusPayment === ePrescriptionStatus.processing && <PrescriptionProcessing />}
    </div>
  )
}
