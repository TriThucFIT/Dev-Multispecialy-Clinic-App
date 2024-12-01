'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface Bill {
  id: number
  patientName: string
  date: string
  amount: number
  status: string
}

const initialBills: Bill[] = [
  { id: 1, patientName: 'John Doe', date: '2023-06-01', amount: 500, status: 'Paid' },
  { id: 2, patientName: 'Jane Smith', date: '2023-06-02', amount: 750, status: 'Pending' },
  { id: 3, patientName: 'Bob Wilson', date: '2023-06-03', amount: 1000, status: 'Overdue' }
]

export function InvoiceDashboard() {
  const [bills, setBills] = useState<Bill[]>(initialBills)
  const [newBill, setNewBill] = useState<Omit<Bill, 'id'>>({
    patientName: '',
    date: '',
    amount: 0,
    status: ''
  })

  const handleAddBill = () => {
    setBills([...bills, { id: bills.length + 1, ...newBill }])
    setNewBill({ patientName: '', date: '', amount: 0, status: '' })
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add Bill</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Bill</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patientName" className="text-right">
                Patient Name
              </Label>
              <Input
                id="patientName"
                value={newBill.patientName}
                onChange={(e) => setNewBill({ ...newBill, patientName: e.target.value })}
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
                value={newBill.date}
                onChange={(e) => setNewBill({ ...newBill, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={newBill.amount}
                onChange={(e) => setNewBill({ ...newBill, amount: parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Input
                id="status"
                value={newBill.status}
                onChange={(e) => setNewBill({ ...newBill, status: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleAddBill}>Add Bill</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell>{bill.patientName}</TableCell>
              <TableCell>{bill.date}</TableCell>
              <TableCell>${bill.amount.toFixed(2)}</TableCell>
              <TableCell>{bill.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
