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

interface Service {
  id: number
  name: string
  description: string
  price: number
}

const initialServices: Service[] = [
  { id: 1, name: "General Checkup", description: "Routine health examination", price: 100 },
  { id: 2, name: "X-Ray", description: "Diagnostic imaging", price: 250 },
  { id: 3, name: "Blood Test", description: "Comprehensive blood analysis", price: 150 },
]

export function ServicesDashboard() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [newService, setNewService] = useState<Omit<Service, "id">>({
    name: "",
    description: "",
    price: 0,
  })

  const handleAddService = () => {
    setServices([...services, { id: services.length + 1, ...newService }])
    setNewService({ name: "", description: "", price: 0 })
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add Service</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
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
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleAddService}>Add Service</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>${service.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

