"use client";

import { useState } from "react";
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

const notifications = [
  {
    id: 1,
    title: "New order received",
    description: "You have a new order #1234 for 100 pages",
    time: "2 minutes ago",
  },
  {
    id: 2,
    title: "Low ink warning",
    description: "Printer #2 is running low on cyan ink",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Maintenance required",
    description: "Printer #1 needs routine maintenance",
    time: "3 hours ago",
  },
  {
    id: 4,
    title: "Paper jam resolved",
    description: "The paper jam in Printer #3 has been cleared",
    time: "Yesterday",
  },
  {
    id: 5,
    title: "New feature available",
    description: "Check out our new double-sided printing option",
    time: "2 days ago",
  },
  {
    id: 6,
    title: "New feature available",
    description: "Check out our new double-sided printing option",
    time: "2 days ago",
  },
  {
    id: 7,
    title: "New feature available",
    description: "Check out our new double-sided printing option",
    time: "2 days ago",
  },
];

export default function NotificationSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button> */}
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)] mt-2 rounded-md border p-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
