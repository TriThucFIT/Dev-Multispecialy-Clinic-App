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
import { Card } from './ui/card'
import { Clock, Calendar } from 'lucide-react'
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { LoginRequestState, TokenState, UserState } from '@renderer/state'

export enum eUserType {
  doctor = 'doctor',
  cashier = 'cashier',
  receptionist = 'receptionist',
  pharmacist = 'pharmacist'
}

export function CardInfo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const userState = useRecoilValue(UserState)
  const clearLogin = useResetRecoilState(LoginRequestState)
  const clearUser = useResetRecoilState(UserState)
  const clearToken = useResetRecoilState(TokenState)

  const handleLogout = () => {
    localStorage.removeItem('user_login')
    localStorage.removeItem('access_token')
    clearLogin()
    clearUser()
    clearToken()
  }

  const getAvatarFallback = () => {
    if (userState?.fullName) {
      return userState.fullName.charAt(0).toUpperCase()
    }
    return 'R'
  }

  return (
    <div className="flex items-center justify-end w-full">
      <Card className="mr-3">
        <div className="flex items-center px-3 py-2">
          <Avatar>
            <AvatarImage src={userState?.avatar} alt={userState?.fullName || 'Receptionist'} />
            <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{userState?.fullName || 'Chưa có tên'}</p>
            <p className="text-sm opacity-75">{userState?.email || 'Chưa có email'}</p>
          </div>
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="ml-2">
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
              <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                <IoLogOutOutline className="mr-2" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
      <Card className="mr-3">
        <div className="px-3 py-1">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-hospital" />
            <span>Ca làm việc: 8:00 - 16:00</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-hospital" />
            <span>Ngày: {new Date().toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
