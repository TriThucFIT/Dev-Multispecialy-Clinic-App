'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface Patient {
  id: number
  name: string
  age: number
  gender: string
  phone: string
}

const initialPatients: Patient[] = [
  { id: 1, name: 'John Doe', age: 35, gender: 'Male', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', phone: '987-654-3210' },
  { id: 3, name: 'Bob Johnson', age: 42, gender: 'Male', phone: '555-555-5555' }
]

export function PatientsDashboard() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id'>>({
    name: '',
    age: 0,
    gender: '',
    phone: ''
  })

  const handleAddPatient = () => {
    setPatients([...patients, { id: patients.length + 1, ...newPatient }])
    setNewPatient({ name: '', age: 0, gender: '', phone: '' })
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add Patient</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={newPatient.age}
                onChange={(e) => setNewPatient({ ...newPatient, age: parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Input
                id="gender"
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleAddPatient}>Add Patient</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
