"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
  Divider,
} from "@nextui-org/react";
import { Plus, Search, ChevronDown, Eye,Pencil,Trash2 } from "lucide-react";
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchorders } from "../../lib/ReduxSlice/Orderslice";
import Image from "next/image";
import Link from "next/link";
import { markAllOrdersAsRead } from "@/lib/API/Order";



const INITIAL_VISIBLE_COLUMNS = ["orderId", "user", "status","invoiceUrl" ,"actions"];
const columns = [
  { name: "OrderId", uid: "orderId", },
  { name: "Customer", uid: "user", },
  { name: "Status", uid: "status" },
  { name: "Invoice", uid: "invoiceUrl" },
  { name: "Actions", uid: "actions" },
];




export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export default function Manageorders() {
  const dispatch = useDispatch();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const order  = useSelector((state) => state.order.order);
  const status = useSelector((state) => state.order.status); 
  const error = useSelector((state) => state.order.error);

  useEffect(() => {
    const markAllRead = async () => {
      const response = await markAllOrdersAsRead();
      if (response?.status) {
        // Optionally, fetch the orders again to refresh the state
        dispatch(fetchorders());
      }
    };
  
    markAllRead();
  }, [dispatch]);
  
  

  const pages = Math.ceil(order?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = Array.isArray(order) ? [...order] : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((Category) =>
        Category.orderId.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((Category) =>
        Array.from(statusFilter).includes(Category.status)
      );
    }

    return filteredUsers;
  }, [order, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex justify-start items-center gap-2">
            <div className="bg-slate-200 p-1 rounded-md">

             <Image height={12} width={24} src={user?.image} className="h-12 w-28 object-fill rounded-sm" alt="imagecat"/>
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <p className="text-sm font-semibold">{cellValue}</p>
              <p className="text-xs font-medium text-default-500">{user?.description}</p>
            </div>
          </div>
       
        );
      case "user":
        return (
          <div className="flex flex-col">
            <p className="text-bold  capitalize text-black ">
            {user?.user?.UserName}
            </p>
          </div>
        );
      case "invoiceUrl":
        return (
          <div >
          <Link download={user.invoiceUrl} href={user.invoiceUrl}>

            <Button size="sm" className="text-white bg-[#146eb4]">
              Download Invoice
            </Button>
          </Link>
       
          </div>
        );
      case "actions":
        return (
          <div className=" flex justify-center items-center gap-4">
          <Tooltip content="Edit">
            <span  className="text-xs text-[#205093] cursor-pointer active:opacity-50">
              <Pencil size={15}/>
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete">
            <span className="text-xs text-red-500 cursor-pointer active:opacity-50">
              <Trash2 size={15}/>
            </span>
          </Tooltip>
        </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1 focus:border-[#146eb4] ",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<Search className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
        </div>
        <Divider className="bg-gray-200"/>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {order?.length} Orders
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    order?.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-[#146eb4] text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
       
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-screen", "w-full", "bg-transparent", "rounded-md"],
      th: ["bg-[#146eb4]", "text-white", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        "border-b",
        "p-2",
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <>
     {status=== "loading" ? (
        <div className="w-full h-full col-span-3 flex justify-center items-center">
          <span className="loader2"></span>
        </div>
      ) : (
      <Table
        className="p-4"
        removeWrapper
        isCompact
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={classNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No categories found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
     )}
     
    </>
  );
}
