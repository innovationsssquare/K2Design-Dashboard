"use client"
import React, { useEffect, useMemo } from "react";
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
import { io } from "socket.io-client";
import { toast } from "sonner"
import { fetchorders } from "../lib/ReduxSlice/Orderslice";
import { useDispatch, useSelector } from "react-redux";

export function Dashboard() {
  const dispatch = useDispatch();

  const socket = useMemo(
    () =>
      io("http://localhost:8086",),
    []
  );

 useEffect(() => {
  const socket = io('https://k2design-backend.onrender.com'); // Replace with your backend URL

    socket.on("connect", () => {
      console.log("connected", socket.id);
      
    });

    socket.on('hello', (message) => {
      console.log('Server says:', message);
    });

    socket.on("test", (s) => {
      console.log(s);
    });

    socket.on("orderCreated", (data) => {    
      toast("Order has been created",{
        description: `You have received a new order with ID: ${data.order?._id || "No ID"}`,
        action: {
          label: "X",
          onClick: () => console.log("Dismissed"),
        },
      });  
      dispatch(fetchorders())
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <main className="flex-1 px-4">
     <DashboardAnalytics/>
    </main>
  );
}

export default Dashboard;
