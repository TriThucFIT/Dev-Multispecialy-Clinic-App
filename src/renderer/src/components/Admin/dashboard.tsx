import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Overview } from './overview'
import { RecentAppointments } from './recent-appointments'

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Bảng Điều Khiển</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Số Bệnh Nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Số Nhân Viên</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lịch Hẹn Hôm Nay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh Thu Tháng Này</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,500$</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Tổng Quan</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Lịch Hẹn Gần Đây</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentAppointments />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
