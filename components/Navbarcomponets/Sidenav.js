"use client";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
SquareChevronDown,
LogOut,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
 LayoutDashboard
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Tabs, Tab,Button } from "@nextui-org/react";
// import { IoPeople } from "react-icons/io5";
// import { MdMeetingRoom } from "react-icons/md";
// import { FaIndianRupeeSign } from "react-icons/fa6";
// import { GiExpense } from "react-icons/gi";
// import { FaBell } from "react-icons/fa";
// import { RiHeartAddFill } from "react-icons/ri";
// import { FiLogIn } from "react-icons/fi";
// import { IoIosPeople } from "react-icons/io";
// import { FaBuildingColumns } from "react-icons/fa6";

const Sidenav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    switch (pathname) {
      case "/":
        setSelected("Dashboard");
        break;
      case "/Tenants":
        setSelected("Tenants");
        break;
      case "/Rooms":
        setSelected("Rooms");
        break;
      case "/Payments":
        setSelected("Payments");
        break;
      case "/Expense":
        setSelected("Expense");
        break;
      case "/Maintenance":
        setSelected("Maintenance");
        break;
      case "/Ourstaff":
        setSelected("Staff");
        break;
      case "/Notifications":
        setSelected("Notifications");
        break;
      case "/Guestmanagement":
        setSelected("Guest Management");
        break;

      case "/Branches":
        setSelected("Branches");
        break;
      default:
        setSelected("Dashboard");
    }
  }, [pathname]);

  const handleTabChange = (key) => {
    setSelected(key);
    switch (key) {
      case "Dashboard":
        router.push("/");
        break;
      case "Tenants":
        router.push("/Tenants");
        break;
      case "Rooms":
        router.push("/Rooms");
        break;
      case "Payments":
        router.push("/Payments");
        break;
      case "Expense":
        router.push("/Expense");
        break;
      case "Maintenance":
        router.push("/Maintenance");
        break;
      case "Staff":
        router.push("/Ourstaff");
        break;
      case "Notifications":
        router.push("/Notifications");
        break;
      case "Guest Management":
        router.push("/Guestmanagement");
        break;

      case "Branches":
        router.push("/Branches");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <aside className=" sticky top-0 left-0 z-10 hidden w-60 h-screen flex-col border-r bg-[#1b181e] sm:flex">
      <nav className="flex flex-col items-start gap-4 px-2 sm:py-5">
        <Tabs
          aria-label="Options"
          isVertical={true}
          classNames={{
            tabList:
              " w-52 relative rounded-none p-0 bg-transparent text-white  ",
            cursor: "w-full bg-[#323035] border-l-4 ",
            tab: "w-full px-0 lg:h-9 md:h-8 sm:h-6 h-4  ",
            tabContent:
              "group-data-[selected=true]:text-white font-bold text-[#cccccc]",
          }}
          selectedKey={selected}
          onSelectionChange={handleTabChange}
        >
          <Tab
            onprss
            key="Dashboard"
            title={
              <div className="flex items-center  w-44  gap-4">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </div>
            }
          ></Tab>
          <Tab
            key="Orders"
            title={
              <div className="flex items-center  w-44  gap-4">
                <ShoppingCart size={20} />
                <span>Manage Orders</span>
              </div>
            }
          ></Tab>
          <Tab
            key="Manage Category"
            title={
              <div className="flex items-center  w-44  gap-4">
                <SquareChevronDown size={20} />
                <span className="text-sm">Manage Category</span>
              </div>
            }
          ></Tab>
        </Tabs>
      </nav>
      <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-5">
      <Button
            // onPress={onOpen}
            className="flex items-center  w-full justify-start bg-transparent  gap-4 text-white font-semibold"
          >
            <LogOut size={24} />
            <span>Logout</span>
          </Button>
      </nav>
    </aside>
  );
};

export default Sidenav;
