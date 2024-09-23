import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Clock, Calendar, Users } from 'lucide-react'
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5'
import { FaRegCircleUser } from 'react-icons/fa6'

type ReceptionistInfoProps = {
  name: string
  email: string
  avatarUrl?: string
  userType: string
  onLogout: () => void
}

export function CardInfo({ name, email, avatarUrl, onLogout, userType }: ReceptionistInfoProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const getAvatarFallback = () => {
    if (name && name.length > 0) {
      return name.charAt(0).toUpperCase()
    }
    return 'R'
  }

  return (
    <div className="lg:w-fit flex lg:flex-col *:w-full">
      <Card className="mr-3 lg:mb-5">
        <CardHeader>
          <CardTitle>Thông Tin {userType === 'receptionist' ? 'Lễ Tân' : 'Bác Sĩ'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={avatarUrl} alt={name || 'Receptionist'} />
              <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{name || 'Chưa có tên'}</p>
              <p className="text-sm opacity-75">{email || 'Chưa có email'}</p>
            </div>
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="ml-auto">
                  Tùy chọn
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FaRegCircleUser className="mr-2" />
                  Thông tin cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IoSettingsOutline className="mr-2" />
                  Cài đặt
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500" onClick={onLogout}>
                  <IoLogOutOutline className="mr-2" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tổng Quan Ca Làm Việc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-hospital" />
              <span>Ca làm việc: 8:00 - 16:00</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-hospital" />
              <span>Ngày: {new Date().toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-hospital" />
              <span>
                Số bệnh nhân đã {userType === 'receptionist' ? 'đăng ký' : 'khám bệnh'} : 15
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
