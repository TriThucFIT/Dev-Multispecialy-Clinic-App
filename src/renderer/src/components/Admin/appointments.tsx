"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface Appointment {
  id: number
  patientName: string
  doctorName: string
  date: string
  time: string
}

const initialAppointments: Appointment[] = [
  { id: 1, patientName: "John Doe", doctorName: "Dr. Smith", date: "2023-06-01", time: "10:00 AM" },
  { id: 2, patientName: "Jane Smith", doctorName: "Dr. Johnson", date: "2023-06-01", time: "11:30 AM" },
  { id: 3, patientName: "Bob Wilson", doctorName: "Dr. Lee", date: "2023-06-01", time: "2:00 PM" },
]

export function AppointmentsDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, "id">>({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
  })

  const handleAddAppointment = () => {
    setAppointments([...appointments, { id: appointments.length + 1, ...newAppointment }])
    setNewAppointment({ patientName: "", doctorName: "", date: "", time: "" })
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add Appointment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patientName" className="text-right">
                Patient Name
              </Label>
              <Input
                id="patientName"
                value={newAppointment.patientName}
                onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctorName" className="text-right">
                Doctor Name
              </Label>
              <Input
                id="doctorName"
                value={newAppointment.doctorName}
                onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleAddAppointment}>Add Appointment</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.patientName}</TableCell>
              <TableCell>{appointment.doctorName}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

