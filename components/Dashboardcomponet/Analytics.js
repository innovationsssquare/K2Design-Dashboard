"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardDescription,
  CardTitle 
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  BarChart as BarChartIcon, 
  IndianRupee, 
  Users 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import Areacard from "./Areacard"
// Mock data
const recentOrders = [
  { id: "ORD001", customer: "John Doe", product: "Business Cards", amount: 49.99, status: "Completed" },
  { id: "ORD002", customer: "Jane Smith", product: "Flyers", amount: 89.99, status: "Processing" },
  { id: "ORD003", customer: "Bob Johnson", product: "Banners", amount: 129.99, status: "Pending" },
]

const recentTransactions = [
  { id: "TRX001", date: "2023-06-15", amount: 49.99, type: "Credit Card" },
  { id: "TRX002", date: "2023-06-14", amount: 89.99, type: "PayPal" },
  { id: "TRX003", date: "2023-06-13", amount: 129.99, type: "Bank Transfer" },
]

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ]
  
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  }

const topProducts = [
  { product: 'Business Cards', sales: 300 },
  { product: 'Flyers', sales: 250 },
  { product: 'Banners', sales: 200 },
  { product: 'Brochures', sales: 150 },
  { product: 'Posters', sales: 100 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="w-full mx-auto ">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <IndianRupee  className="h-4 w-4 text-[#146eb4]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center "><IndianRupee/>45,231.89</div>
              <p className="text-xs text-[#146eb4]">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-[#146eb4]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-[#146eb4]">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <BarChartIcon className="h-4 w-4 text-[#146eb4]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-[#146eb4]">+19% from last month</p>
            </CardContent>
          </Card> */}
          <Areacard/>
          <Areacard/>
          <Areacard/>
          <Areacard/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
        <CardDescription>
          Showing total Revenue for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="#146eb4"
              fillOpacity={0.4}
              stroke="#146eb4"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
     
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Top Products Sales</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="#146eb4" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell className="flex items-center gap-1"><IndianRupee/>{order.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-semibold",
                          {
                            "bg-green-100 text-green-800": order.status === "Completed",
                            "bg-yellow-100 text-yellow-800": order.status === "Processing",
                            "bg-red-100 text-red-800": order.status === "Pending"
                          }
                        )}>
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

        
        </div>
      </main>
    </div>
  )
}