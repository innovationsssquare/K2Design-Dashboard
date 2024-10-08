

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Printer, Search, FileText, Package, Eye, Edit, MoreHorizontal } from "lucide-react"
import Image from "next/image"

// Mock data for orders
const orders = [
  {
    id: "ORD001",
    customer: "John Doe",
    product: "Business Cards",
    quantity: 500,
    status: "Pending",
    total: "$49.99",
    date: "2023-05-15",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    product: "Flyers",
    quantity: 1000,
    status: "Printing",
    total: "$89.99",
    date: "2023-05-14",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    product: "Banners",
    quantity: 2,
    status: "Shipped",
    total: "$129.99",
    date: "2023-05-13",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    product: "Banners",
    quantity: 2,
    status: "Shipped",
    total: "$129.99",
    date: "2023-05-13",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    product: "Banners",
    quantity: 2,
    status: "Shipped",
    total: "$129.99",
    date: "2023-05-13",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    product: "Banners",
    quantity: 2,
    status: "Shipped",
    total: "$129.99",
    date: "2023-05-13",
  },
  // Add more mock orders as needed
]

export default function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(orders[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStatusChange = (newStatus) => {
    setSelectedOrder({ ...selectedOrder, status: newStatus })
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  return (
    <div className="w-full mx-auto px-4">
      <Card>
        <CardContent>
          <div className="py-4">
            <Input
              type="search"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[70vh]">
            <Table>
              <TableHeader className="bg-[#146eb4] text-white rounded-lg ">
                <TableRow className="bg-[#146eb4] text-white rounded-lg ">
                  <TableHead className="bg-[#146eb4] text-white rounded-l-lg ">Order ID</TableHead>
                  <TableHead className="bg-[#146eb4] text-white  ">Customer</TableHead>
                  <TableHead className="bg-[#146eb4] text-white ">Status</TableHead>
                  <TableHead className="bg-[#146eb4] text-white ">Invoice</TableHead>
                  <TableHead className="bg-[#146eb4] text-white rounded-r-lg ">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                  <TableCell className="flex items-center space-x-3">
                      <Image
                        src={order.image}
                        alt={order.product}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <div>
                        <div className="font-medium">#{order.id}</div>
                        <div className="text-sm text-gray-500">{order.product}</div>
                      </div>
                    </TableCell>                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge
                      className={
                          order.status === "Shipped"
                            ? "bg-[#146eb4] text-white"
                            : order.status === "Printing"
                            ? "bg-[#e6f0f9] text-[#146eb4]"
                            : "border-[#146eb4] text-[#146eb4]"
                        }
                        variant={
                          order.status === "Shipped"
                            ? "default"
                            : order.status === "Printing"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell><Badge className="bg-[#146eb4] hover:bg-[#146eb4]">Download Invoice</Badge></TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                          <Eye className="h-4 w-4 text-[#146eb4]" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4 text-[#146eb4]" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4 text-[#146eb4]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
            <DialogDescription>View and manage order details</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="invoice">Invoice</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Customer</Label>
                  <Input value={selectedOrder.customer} readOnly />
                </div>
                <div>
                  <Label>Product</Label>
                  <Input value={selectedOrder.product} readOnly />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input value={selectedOrder.quantity} readOnly />
                </div>
                <div>
                  <Label>Total</Label>
                  <Input value={selectedOrder.total} readOnly />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input value={selectedOrder.date} readOnly />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      {/* <SelectItem value="Printing">Printing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem> */}
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="invoice">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Invoice #{selectedOrder.id}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Bill To</Label>
                    <Input value={selectedOrder.customer} readOnly />
                  </div>
                  <div>
                    <Label>Invoice Date</Label>
                    <Input value={selectedOrder.date} readOnly />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{selectedOrder.product}</TableCell>
                      <TableCell>{selectedOrder.quantity}</TableCell>
                      <TableCell>
                        $
                        {(
                          parseFloat(selectedOrder.total.slice(1)) /
                          selectedOrder.quantity
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell>{selectedOrder.total}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="flex justify-end">
                  <Button className="text-white bg-[#146eb4] hover:bg-[#146eb4]">
                    <FileText className="mr-2 h-4 w-4 " /> Download Invoice
                  </Button>
                </div>
              </div>
            </TabsContent>
            {/* <TabsContent value="printing">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Printing Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Paper Type</Label>
                    <Input value="Glossy 100lb" readOnly />
                  </div>
                  <div>
                    <Label>Print Size</Label>
                    <Input value="3.5 x 2 inches" readOnly />
                  </div>
                  <div>
                    <Label>Color Mode</Label>
                    <Input value="Full Color (CMYK)" readOnly />
                  </div>
                  <div>
                    <Label>Finishing</Label>
                    <Input value="Matte Lamination" readOnly />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button>
                    <Printer className="mr-2 h-4 w-4" /> Print Preview
                  </Button>
                  <Button variant="outline">
                    <Package className="mr-2 h-4 w-4" /> Prepare for Shipping
                  </Button>
                </div>
              </div>
            </TabsContent> */}
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}















// "use client";
// import React from "react";
// import Lottie from "react-lottie";
// import animationData from "../../public/Lottie/Documetlottie.json";

// const Manageorders = () => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
//   return (
//     <>
//       <div className="flex flex-col gap-2 justify-center items-center w-full h-screen">
//         <Lottie options={defaultOptions} height={100} width={100}></Lottie>
//         <p className="text-[#1a181e] font-semibold ">Orders will appear here</p>
//       </div>
//     </>
//   );
// };

// export default Manageorders;
