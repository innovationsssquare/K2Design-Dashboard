"use client";
import React, { useEffect, useState } from "react";
import {
  SquareChevronDown,
  LogOut,
  ShoppingCart,
  LayoutDashboard,
  PackageSearch,
  Hotel,
  Users,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Tabs, Tab, Button } from "@nextui-org/react";
import Image from "next/image";
import LOGO from "../../public/LOGO.png";
import { Tooltip } from "@nextui-org/react";

const Sidenav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState("Dashboard");
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    switch (pathname) {
      case "/":
        setSelected("Dashboard");
        break;
      case "/Manageorders":
        setSelected("Manage Orders");
        break;
      case "/Managecategory":
        setSelected("Manage Category");
        break;
      case "/Manageproducts":
        setSelected("Manage Products");
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
      case "/Managecustomer":
        setSelected("Manage Customer");
        break;
      case "/Branches":
        setSelected("Manage Branch");
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
      case "Manage Orders":
        router.push("/Manageorders");
        break;
      case "Manage Category":
        router.push("/Managecategory");
        break;
      case "Manage Products":
        router.push("/Manageproducts");
        break;
      case "Staff":
        router.push("/Ourstaff");
        break;
      case "Notifications":
        router.push("/Notifications");
        break;
      case "Manage Customer":
        router.push("/Managecustomer");
        break;
      case "Manage Branch":
        router.push("/Branches");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <aside
      className={`sticky top-0 left-0 z-10 h-screen flex flex-col items-center bg-[#1b181e] transition-all duration-700 ease-in-out ${
        isMinimized ? "w-20" : "w-60"
      }`}
    >
      <div className="relative w-full flex items-center justify-center h-28">
        {!isMinimized && <Image className="h-20 w-20" src={LOGO} alt="logo" />}
        <Button
          className="absolute top-2 right-0 bg-transparent text-white"
          onPress={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </Button>
      </div>

      <nav className="flex flex-col items-start gap-4 px-2 sm:py-5">
        <Tabs
          aria-label="Options"
          isVertical={true}
          classNames={
            isMinimized
              ? {
                  tabList:
                    "relative rounded-none p-0 bg-transparent text-white w-12 transition-all duration-700 ease-in-out",
                  cursor: "w-full bg-[#323035] border-l-4 border-[#146eb4]",
                  tab: "w-full px-0 lg:h-9 md:h-8 sm:h-6 h-4",
                  tabContent:
                    "group-data-[selected=true]:text-white font-bold text-[#cccccc]",
                }
              : {
                  tabList:
                    "relative rounded-none p-0 bg-transparent text-white w-52 transition-all duration-700 ease-in-out",
                  cursor: "w-full bg-[#323035] border-l-4 border-[#146eb4]",
                  tab: "w-full px-0 lg:h-9 md:h-8 sm:h-6 h-4",
                  tabContent:
                    "group-data-[selected=true]:text-white font-bold text-[#cccccc]",
                }
          }
          selectedKey={selected}
          onSelectionChange={handleTabChange}
        >
          <Tab
            key="Dashboard"
            title={
              <div
                className={`flex items-center gap-4 ${
                  isMinimized ? "justify-center" : "w-44"
                }`}
              >
                {!isMinimized ? (
                  <LayoutDashboard size={20} />
                ) : (
                  <Tooltip
                    classNames={{
                      base: ["before:bg-[#146eb4]"],
                      content: [
                        "py-2 px-4 rounded-md",
                        "text-white bg-[#146eb4]",
                      ],
                    }}
                    showArrow={true}
                    content="Dashboard"
                    placement="right"
                  >
                    <LayoutDashboard size={20} />
                  </Tooltip>
                )}
                {!isMinimized && (
                  <span className="transition-all duration-700 ease-in-out">
                    Dashboard
                  </span>
                )}
              </div>
            }
          />
          <Tab
            key="Manage Branch"
            title={
              <div
                className={`flex items-center gap-4 ${
                  isMinimized ? "justify-center" : "w-44"
                }`}
              >
                {!isMinimized ? (
                  <Hotel size={20} />
                ) : (
                  <Tooltip
                    classNames={{
                      base: ["before:bg-[#146eb4]"],
                      content: [
                        "py-2 px-4 rounded-md",
                        "text-white bg-[#146eb4]",
                      ],
                    }}
                    showArrow={true}
                    content="Manage Branch"
                    placement="right"
                  >
                    <Hotel size={20} />
                  </Tooltip>
                )}
                {!isMinimized && <span>Manage Branch</span>}
              </div>
            }
          />
          <Tab
            key="Manage Orders"
            title={
              <div
                className={`flex items-center gap-4 ${
                  isMinimized ? "justify-center" : "w-44"
                }`}
              >
                {!isMinimized ? (
                  <ShoppingCart size={20} />
                ) : (
                  <Tooltip
                    classNames={{
                      base: ["before:bg-[#146eb4]"],
                      content: [
                        "py-2 px-4 rounded-md",
                        "text-white bg-[#146eb4]",
                      ],
                    }}
                    showArrow={true}
                    content="Manage Orders"
                    placement="right"
                  >
                    <ShoppingCart size={20} />
                  </Tooltip>
                )}
                {!isMinimized && <span>Manage Orders</span>}
              </div>
            }
          />
          <Tab
            key="Manage Category"
            title={
              <div
                className={`flex items-center gap-4 ${
                  isMinimized ? "justify-center" : "w-44"
                }`}
              >
                {!isMinimized ? (
                  <SquareChevronDown size={20} />
                ) : (
                  <Tooltip
                    classNames={{
                      base: ["before:bg-[#146eb4]"],
                      content: [
                        "py-2 px-4 rounded-md",
                        "text-white bg-[#146eb4]",
                      ],
                    }}
                    showArrow={true}
                    content="Manage Category"
                    placement="right"
                  >
                    <SquareChevronDown size={20} />
                  </Tooltip>
                )}
                {!isMinimized && (
                  <span className="text-sm">Manage Category</span>
                )}
              </div>
            }
          />
          <Tab
            key="Manage Products"
            title={
              <div
                className={`flex items-center gap-4 ${
                  isMinimized ? "justify-center" : "w-44"
                }`}
              >
                {!isMinimized ? (
                  <PackageSearch size={20} />
                ) : (
                  <Tooltip
                    classNames={{
                      base: ["before:bg-[#146eb4]"],
                      content: [
                        "py-2 px-4 rounded-md",
                        "text-white bg-[#146eb4]",
                      ],
                    }}
                    showArrow={true}
                    content="Manage Products"
                    placement="right"
                  >
                    <PackageSearch size={20} />
                  </Tooltip>
                )}
                {!isMinimized && (
                  <span className="text-sm">Manage Products</span>
                )}
              </div>
            }
          />
          <Tab
            key="Manage Customer"
            title={
              <div
                className={`flex items-center gap-4 ${
                  isMinimized ? "justify-center" : "w-44"
                }`}
              >
                {!isMinimized ? (
                  <Users size={20} />
                ) : (
                  <Tooltip
                    classNames={{
                      base: ["before:bg-[#146eb4]"],
                      content: [
                        "py-2 px-4 rounded-md",
                        "text-white bg-[#146eb4]",
                      ],
                    }}
                    showArrow={true}
                    content="Manage Customer"
                    placement="right"
                  >
                    <Users size={20} />
                  </Tooltip>
                )}
                {!isMinimized && (
                  <span className="text-sm">Manage Customer</span>
                )}
              </div>
            }
          />
        </Tabs>
      </nav>

      <nav
        className={
          !isMinimized
            ? "mt-auto flex w-52 justify-start items-start gap-4 px-2 sm:py-5 transition-all duration-700 ease-in-out"
            : "mt-auto flex w-20 justify-start items-start gap-4 px-2 sm:py-5 transition-all duration-700 ease-in-out"
        }
      >
        <Button className="flex items-center w-full justify-start bg-transparent gap-4 text-white font-semibold transition-all duration-700 ease-in-out">
          {!isMinimized ? (
            <LogOut size={20} />
          ) : (
            <Tooltip
              classNames={{
                base: ["before:bg-[#146eb4]"],
                content: ["py-2 px-4 rounded-md", "text-white bg-[#146eb4]"],
              }}
              showArrow={true}
              content="Logout"
              placement="right"
            >
              <LogOut size={20} />
            </Tooltip>
          )}
          {!isMinimized && <span>Logout</span>}
        </Button>
      </nav>
    </aside>
  );
};

export default Sidenav;
