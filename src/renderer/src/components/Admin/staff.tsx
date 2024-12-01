'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface Address {
  city: string
  state: string
  address: string
}

interface StaffMemberCreate {
  username: string
  password?: string // Có thể không cần thiết trong giao diện chỉnh sửa
  email: string
  roles: string[]
  department: string
  entity: {
    fullName: string
    email: string
    phone: string
    gender: number // 0 hoặc 1
    dob: string // YYYY-MM-DD
    employeeId: string
    specialization: string
    address: Address
  }
}

interface StaffMemberData {
  email: string
  employeeId: string
  phone: string
  username: string
  fullName: string
  address: {
    city: string
    state: string
    address: string
  }
  gender: number
  dob: string
  roles: string[]
  department: string
  entity: {
    fullName: string
    email: string
    phone: string
    gender: number // 0 hoặc 1
    dob: string // YYYY-MM-DD
    employeeId: string
    specialization: string
    address: Address
  }
}

const initialStaff: StaffMemberData[] = [
  // ... (dữ liệu nhân viên từ response)
  {
    email: 'thuyquynh@gmail.com',
    employeeId: 'REP_2404',
    phone: '0388355344',
    username: 'thuyquynh',
    fullName: 'Châu Thúy Quỳnh',
    address: {
      city: '', //
      state: '', //
      address: '' //
    },
    gender: 0, // Giả sử 0 là false
    dob: '1999-04-24',
    roles: ['RECEPTIONIST'],
    department: 'RECEPTION', // Giả sử dựa trên vai trò
    entity: {
      fullName: 'Châu Thúy Quỳnh',
      email: 'thuyquynh@gmail.com',
      phone: '0388355344',
      gender: 0,
      dob: '1999-04-24',
      employeeId: 'REP_2404',
      specialization: '', // Không có trong response, có thể thêm trường này
      address: {
        city: '', //
        state: '', //
        address: '' //
      }
    }
  }
]

export function EmployeeDashboard() {
  const [staff, setStaff] = useState<StaffMemberData[]>(initialStaff)
  const [newStaff, setNewStaff] = useState<StaffMemberCreate>({
    username: '',
    password: '',
    email: '',
    roles: [],
    department: '',
    entity: {
      fullName: '',
      email: '',
      phone: '',
      gender: 0,
      dob: '',
      employeeId: '',
      specialization: '',
      address: {
        city: '',
        state: '',
        address: ''
      }
    }
  })

  const handleAddStaff = () => {}

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Thêm Nhân Viên</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm Nhân Viên Mới</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Tên đăng nhập
              </Label>
              <Input
                id="username"
                value={newStaff.username}
                onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                value={newStaff.password}
                onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newStaff.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewStaff({ ...newStaff, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roles" className="text-right">
                Vai trò
              </Label>
              <div className="col-span-3">
                <Select
                  value={newStaff.roles[0]}
                  onValueChange={(value) =>
                    setNewStaff({
                      ...newStaff,
                      roles: [value as string]
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DOCTOR">Bác sĩ</SelectItem>
                    <SelectItem value="RECEPTIONIST">Lễ tân</SelectItem>
                    <SelectItem value="Casher">Thu ngân</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Phòng ban
              </Label>
              <Input
                id="department"
                value={newStaff.department}
                onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Họ và tên
              </Label>
              <Input
                id="fullName"
                value={newStaff.entity.fullName}
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,
                    entity: { ...newStaff.entity, fullName: e.target.value }
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                type="tel"
                value={newStaff.entity.phone}
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,
                    entity: { ...newStaff.entity, phone: e.target.value }
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Giới tính
              </Label>
              <Select
                value={newStaff.entity.gender.toString()}
                onValueChange={(value) =>
                  setNewStaff({
                    ...newStaff,
                    entity: { ...newStaff.entity, gender: parseInt(value as string) }
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Nữ</SelectItem>
                  <SelectItem value="1">Nam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Ngày sinh */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">
                Ngày sinh
              </Label>
              <Input
                id="dob"
                type="date"
                value={newStaff.entity.dob}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, entity: { ...newStaff.entity, dob: e.target.value } })
                }
                className="col-span-3"
              />
            </div>
            {/* Mã nhân viên */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employeeId" className="text-right">
                Mã nhân viên
              </Label>
              <Input
                id="employeeId"
                value={newStaff.entity.employeeId}
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,
                    entity: { ...newStaff.entity, employeeId: e.target.value }
                  })
                }
                className="col-span-3"
              />
            </div>
            {/* Chuyên môn */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialization" className="text-right">
                Chuyên môn
              </Label>
              <Input
                id="specialization"
                value={newStaff.entity.specialization}
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,
                    entity: { ...newStaff.entity, specialization: e.target.value }
                  })
                }
                className="col-span-3"
              />
            </div>
            {/* Thành phố */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Thành phố
              </Label>
              <Input
                id="city"
                value={newStaff.entity.address.city}
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,
                    entity: {
                      ...newStaff.entity,
                      address: { ...newStaff.entity.address, city: e.target.value }
                    }
                  })
                }
                className="col-span-3"
              />
            </div>
            {/* Quận/Huyện */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">
                Quận/Huyện
              </Label>
              <Input
                id="state"
                value={newStaff.entity.address.state}
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,
                    entity: {
                      ...newStaff.entity,
                      address: { ...newStaff.entity.address, state: e.target.value }
                    }
                  })
                }
                className="col-span-3"
              />
            </div>
            {/* Địa chỉ */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Địa chỉ
              </Label>
              <Input
                id="address"
                value={newStaff.entity.address.address}
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,
                    entity: {
                      ...newStaff.entity,
                      address: { ...newStaff.entity.address, address: e.target.value }
                    }
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleAddStaff}>Thêm Nhân Viên</Button>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Họ và Tên</TableHead>
            <TableHead>Chức Vụ</TableHead>
            <TableHead>Phòng Ban</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Số Điện Thoại</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map((staffMember) => (
            <TableRow key={staffMember.employeeId}>
              <TableCell>{staffMember.entity.fullName}</TableCell>
              <TableCell>{staffMember.roles.join(', ')}</TableCell>{' '}
              {/* Hiển thị danh sách vai trò */}
              <TableCell>{staffMember.department}</TableCell>
              <TableCell>{staffMember.email}</TableCell>
              <TableCell>{staffMember.entity.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
