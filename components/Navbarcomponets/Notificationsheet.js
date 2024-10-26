"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchorders,markOrderRead } from "../../lib/ReduxSlice/Orderslice";
import { Badge } from "@/components/ui/badge"

export default function NotificationSheet() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Fetch orders from Redux state
  const order  = useSelector((state) => state.order.order);

  const socket = useMemo(
    () =>
      io("https://k2design-backend.onrender.com", {
        withCredentials: true,
      }),
    []
  );

  useEffect(() => {
    // Fetch initial orders when the component mounts
    dispatch(fetchorders());

    // Set up socket listeners for real-time updates
    socket.on("connect", () => {
      console.log("Connected to socket", socket.id);
    });

    socket.on("newOrder", (newOrder) => {
      console.log("New order received:", newOrder);
      toast.success(`New order received: ${newOrder.orderId}`);
      // Optionally, you can dispatch an action to update the Redux store with the new order
      dispatch(fetchorders());
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);

  const unreadOrders = order?.filter((order) => order.isRead === false);

  const handleMarkAsRead = (orderId) => {
    dispatch(markOrderRead(orderId));
  };


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
{ unreadOrders.length > 0 &&  <Badge className="absolute -top-2 -right-3 rounded-full px-2" variant="destructive">{unreadOrders.length}</Badge>
}          <span className="sr-only">Toggle notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)] mt-2 rounded-md border p-4">
          {unreadOrders && unreadOrders.length > 0 ? (
            unreadOrders.map((order) => (
              <div
               onClick={() => handleMarkAsRead(order._id)}
                key={order.orderId}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New order received: {order.orderId}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No notifications available
            </p>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
