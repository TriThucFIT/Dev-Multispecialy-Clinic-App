"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Medicine {
  id: number
  name: string
  quantity: number
  price: number
}

const initialMedicines: Medicine[] = [
  { id: 1, name: "Aspirin", quantity: 100, price: 5.99 },
  { id: 2, name: "Ibuprofen", quantity: 50, price: 7.99 },
  { id: 3, name: "Amoxicillin", quantity: 30, price: 15.99 },
]

export function Pharmacy() {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines)
  const [newMedicine, setNewMedicine] = useState<Omit<Medicine, "id">>({
    name: "",
    quantity: 0,
    price: 0,
  })

  const handleAddMedicine = () => {
    setMedicines([...medicines, { id: medicines.length + 1, ...newMedicine }])
    setNewMedicine({ name: "", quantity: 0, price: 0 })
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add Medicine</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Medicine</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newMedicine.name}
                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={newMedicine.quantity}
                onChange={(e) => setNewMedicine({ ...newMedicine, quantity: parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={newMedicine.price}
                onChange={(e) => setNewMedicine({ ...newMedicine, price: parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleAddMedicine}>Add Medicine</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.map((medicine) => (
            <TableRow key={medicine.id}>
              <TableCell>{medicine.name}</TableCell>
              <TableCell>{medicine.quantity}</TableCell>
              <TableCell>${medicine.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

