import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Search } from 'lucide-react'

export function AIAssistant() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          <Search className="mr-2 h-4 w-4" />
          Trợ lý chẩn đoán AI
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trợ lý chẩn đoán AI</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>Dựa trên triệu chứng và lịch sử y tế của bệnh nhân, AI đề xuất các chẩn đoán sau:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Hội chứng mạch vành cấp</li>
            <li>Thuyên tắc phổi</li>
            <li>Đau ngực do lo âu</li>
          </ul>
          <p className="mt-4">Các bước tiếp theo được đề xuất:</p>
          <ol className="list-decimal pl-5 mt-2">
            <li>Thực hiện điện tâm đồ (ECG)</li>
            <li>Đặt xét nghiệm enzyme tim</li>
            <li>Xem xét chụp X-quang ngực hoặc CT nếu nghi ngờ thuyên tắc phổi</li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  )
}
