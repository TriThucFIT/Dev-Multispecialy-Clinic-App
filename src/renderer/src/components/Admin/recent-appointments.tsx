import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

const appointments = [
  {
    patient: "John Doe",
    doctor: "Dr. Smith",
    date: "2023-06-01",
    time: "10:00 AM",
  },
  {
    patient: "Jane Smith",
    doctor: "Dr. Johnson",
    date: "2023-06-01",
    time: "11:30 AM",
  },
  {
    patient: "Bob Wilson",
    doctor: "Dr. Lee",
    date: "2023-06-01",
    time: "2:00 PM",
  },
  {
    patient: "Alice Brown",
    doctor: "Dr. Garcia",
    date: "2023-06-01",
    time: "3:30 PM",
  },
  {
    patient: "Charlie Davis",
    doctor: "Dr. Martinez",
    date: "2023-06-01",
    time: "4:45 PM",
  },
]

export function RecentAppointments() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.patient}>
            <TableCell className="font-medium">{appointment.patient}</TableCell>
            <TableCell>{appointment.doctor}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

