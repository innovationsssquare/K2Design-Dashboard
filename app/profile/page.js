import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
        <Card className="border-gray-300">
          <CardHeader className="text-[#1b181e] rounded-t-md ">
            <div className="flex items-center border-b border-gray-300 py-2 space-x-4">
              <Avatar className="h-20 w-20 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>K2 DESIGN</CardTitle>
                <CardDescription className="text-gray-500">K2Design@example.com</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-[#146eb4]" />
                <span className="text-sm">Kamshet, Pune</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#146eb4]" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#146eb4]" />
                <span className="text-sm">K2Design@example.com</span>
              </div>
              
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="bg-[#146eb4]/10">
              <TabsTrigger value="personal" className="data-[state=active]:bg-[#146eb4] data-[state=active]:text-white">Personal Info</TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-[#146eb4] data-[state=active]:text-white">Account Settings</TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-[#146eb4] data-[state=active]:text-white">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1b181e]">Personal Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself" />
                  </div>
                  <Button className="bg-[#146eb4] hover:bg-[#146eb4]/90">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1b181e]">Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <Button className="bg-[#146eb4] hover:bg-[#146eb4]/90">Update Account</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1b181e]">Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-notifications" className="rounded border-gray-300 text-[#146eb4] focus:ring-[#146eb4]" />
                      <Label htmlFor="email-notifications">Receive email notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms-notifications" className="rounded border-gray-300 text-[#146eb4] focus:ring-[#146eb4]" />
                      <Label htmlFor="sms-notifications">Receive SMS notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="push-notifications" className="rounded border-gray-300 text-[#146eb4] focus:ring-[#146eb4]" />
                      <Label htmlFor="push-notifications">Receive push notifications</Label>
                    </div>
                  </div>
                  <Button className="mt-4 bg-[#146eb4] hover:bg-[#146eb4]/90">Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}