import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { BookAudio, ArrowUp } from "lucide-react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Areacard from "@/components/Dashboardcomponet/Areacard";
import DashboardAnalytics from "@/components/Dashboardcomponet/Analytics";

export function Dashboard() {


  return (
    <main className="flex-1 px-4">
     <DashboardAnalytics/>
    </main>
  );
}

export default Dashboard;
