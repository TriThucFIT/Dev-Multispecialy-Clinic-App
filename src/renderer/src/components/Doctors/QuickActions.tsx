import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { AlertTriangle } from 'lucide-react'

type QuickActionsProps = {
  aiAssistEnabled: boolean
  onAIAssistToggle: (enabled: boolean) => void
}

export function QuickActions({ aiAssistEnabled, onAIAssistToggle }: QuickActionsProps) {
  return (
    <Card className="md:col-span-3 bg-opacity-90 bg-white">
      <CardHeader>
        <CardTitle>Hành động nhanh</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Gọi khẩn cấp
          </Button>
          <Button variant="outline">Yêu cầu tư vấn chuyên gia</Button>
          <div className="flex items-center space-x-2">
            <Switch id="ai-assist" checked={aiAssistEnabled} onCheckedChange={onAIAssistToggle} />
            <Label htmlFor="ai-assist">Trợ lý chẩn đoán AI</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
