"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"


const initialTickets = [
  {
    id: 1,
    title: "Cannot access dashboard",
    description: "I'm unable to log into the dashboard. It keeps showing an error message.",
    status: "open",
    createdAt: "2023-09-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Feature request: Dark mode",
    description: "It would be great if we could have a dark mode option for the application.",
    status: "in-progress",
    createdAt: "2023-09-14T14:45:00Z"
  },
  {
    id: 3,
    title: "Bug in reporting module",
    description: "The weekly report is not showing accurate data for the last month.",
    status: "resolved",
    createdAt: "2023-09-13T09:15:00Z"
  }
]

export default function SupportPage() {
  const [tickets, setTickets] = useState(initialTickets)
  const [newTicket, setNewTicket] = useState({})

  const handleInputChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value })
  }

  const handleSubmitTicket = (e) => {
    e.preventDefault()
    if (newTicket.title && newTicket.description) {
      const ticket= {
        id: tickets.length + 1,
        title: newTicket.title,
        description: newTicket.description,
        status: "open",
        createdAt: new Date().toISOString()
      }
      setTickets([ticket, ...tickets])
      setNewTicket({})
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-8 border-[#146eb4]">
        <CardHeader className="bg-[#146eb4] text-white">
          <CardTitle className="text-2xl font-bold">Support</CardTitle>
          <CardDescription className="text-blue-100">
            Submit a new support ticket or view your existing tickets
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Brief description of your issue"
                value={newTicket.title || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide more details about your issue"
                value={newTicket.description || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="bg-[#146eb4] hover:bg-[#146eb4]/90">
              Submit Ticket
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-[#146eb4]">
        <CardHeader className="bg-[#146eb4] text-white">
          <CardTitle>Your Tickets</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="mb-4 last:mb-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{ticket.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(ticket.status)}
                    <span className="text-sm capitalize">{ticket.status.replace("-", " ")}</span>
                  </div>
                </div>
                <CardDescription>
                  Submitted on {new Date(ticket.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{ticket.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}