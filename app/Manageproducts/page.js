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
  Tooltip
} from "@nextui-org/react";
import { Plus, Search, ChevronDown, EllipsisVertical } from "lucide-react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import Addproducts from "@/components/Manageproducts/Addproducts";
import { useDispatch, useSelector } from "react-redux";
import { Setopenproduct } from "@/lib/ReduxSlice/CategorySlice";
import {fetchproducts} from "@/lib/ReduxSlice/ProductSlice"
import { Eye,Pencil,Trash2 } from "lucide-react";


const INITIAL_VISIBLE_COLUMNS = ["name","description","subcategoryId","actions"];
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Name", uid: "name", sortable: true },
  { name: "Description", uid: "description"},
  { name: "Category", uid: "subcategoryId"},
  { name: "Action", uid: "actions"},
 
];



export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export default function Manageproducts() {
  const dispatch = useDispatch();
  const { openaproduct } = useSelector((state) => state.category);
  const { product } = useSelector((state) => state.product);
  const status = useSelector((state) => state.product.status); 
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

console.log(product)

  const openproducthandle = () => {
    dispatch(Setopenproduct(!openaproduct));
  };

useEffect(() => {
  dispatch(fetchproducts())
}, [])



  const pages = Math.ceil(product?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = Array.isArray(product) ? [...product] : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((product) =>
        Array.from(statusFilter).includes(product.status)
      );
    }

    return filteredUsers;
  }, [product, filterValue, statusFilter]);

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
          <p>{user?.name}</p>
        );
      case "subcategoryId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-500">
              {user?.subcategoryId?.name}
            </p>
          </div>
        );
     
      case "actions":
        return (
          <div className=" flex justify-center items-center gap-4">
          <Tooltip content="Details">
            <span className="text-xs text-default-400 cursor-pointer active:opacity-50">
              <Eye size={15} />
            </span>
          </Tooltip>
          {/* <Tooltip content="Edit">
            <span  className="text-xs text-[#205093] cursor-pointer active:opacity-50">
              <Pencil size={15}/>
            </span>
          </Tooltip> */}
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
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<Search className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button
              onPress={openproducthandle}
              className="bg-[#146eb4] text-background"
              endContent={<Plus />}
              size="sm"
            >
              Add New Product
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {product?.length} products
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
    product?.length,
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
      wrapper: ["max-h-screen", "w-full"],
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
        isCompact
        removeWrapper
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
        <TableBody emptyContent={"No Products found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>)}

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        isOpen={openaproduct}
        size="full"
        onOpenChange={openproducthandle}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Addproducts />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
