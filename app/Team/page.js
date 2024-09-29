"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Plus } from "lucide-react"
import { Divider } from "@nextui-org/react"



const initialTeamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Project Manager",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    avatar: "/placeholder.svg?height=50&width=50"
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Senior Developer",
    email: "bob@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, USA",
    avatar: "/placeholder.svg?height=50&width=50"
  },
  {
    id: 3,
    name: "Carol Davis",
    role: "UX Designer",
    email: "carol@example.com",
    phone: "+1 (555) 345-6789",
    location: "London, UK",
    avatar: "/placeholder.svg?height=50&width=50"
  }
]

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [newMember, setNewMember] = useState({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value })
  }

  const handleAddMember = () => {
    if (newMember.name && newMember.role && newMember.email) {
      setTeamMembers([
        ...teamMembers,
        {
          id: teamMembers.length + 1,
          name: newMember.name,
          role: newMember.role,
          email: newMember.email,
          phone: newMember.phone || "",
          location: newMember.location || "",
          avatar: "/placeholder.svg?height=50&width=50"
        }
      ])
      setNewMember({})
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6 border-gray-300">
        <CardHeader className="border-b border-gray-300 rounded-t-md text-[#1b181e]">
          <CardTitle className="text-2xl font-bold">Team Members</CardTitle>
          <CardDescription className="text-gray-600">View and manage your team members</CardDescription>
        </CardHeader>
        <CardContent className="mt-4 p-4">
          <div className="flex justify-between items-center">
            <Input className="max-w-sm" placeholder="Search team members..." />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#146eb4] hover:bg-[#146eb4]/90">
                  <Plus className="mr-2 h-4 w-4" /> Add Team Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                  <DialogDescription>
                    {`Fill in the details of the new team member here. Click save when you're done.`}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid w-full gap-4 py-4">
                  <div className="grid grid-cols-4 justify-items-start items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newMember.name || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 justify-items-start items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      value={newMember.role || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 justify-items-start items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newMember.email || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 justify-items-start items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={newMember.phone || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 justify-items-start items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={newMember.location || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddMember} className="bg-[#146eb4] hover:bg-[#146eb4]/90">
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id} className="border-gray-300">
            <CardHeader className="border-b border-gray-300 rounded-t-md text-[#1b181e]">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-gray-600">{member.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#146eb4]" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#146eb4]" />
                  <span className="text-sm">{member.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-[#146eb4]" />
                  <span className="text-sm">{member.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}