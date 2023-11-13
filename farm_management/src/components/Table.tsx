import { useState } from "react";
import {
  getSortedRowModel,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuSquare, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./ui/table-pagination";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table_data: TData[];
  filter?: string;
  selection_option: Boolean;
  selectionAction?: any;
  filterOptions?: any;
}

function ReusableTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [current_columns] = useState(() => [...props.columns]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
  //     {
  //       id: props.filter,
  //       value: ""
  //     }
  //   ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleGlobalSearch = (event: any) => {
    const { value } = event.target;
    setGlobalFilter(String(value));
  };
  const table = useReactTable({
    data: props.table_data,
    columns: current_columns,
    state: {
      globalFilter,
      columnFilters,
      columnVisibility,
      sorting,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const isFiltered = table.getState().columnFilters.length > 0;
  const [selectedRow, setSelectedRow] = useState([]);

  return (
    <div className="pt-4">
      <div className="flex flex-row justify-between">
        <div className="flex space-x-4">
          {/* ---------------- Global Search--------------- */}
          <Input
            placeholder="Search all columns..."
            value={globalFilter ?? ""}
            onChange={handleGlobalSearch}
          />
          {/* ---------------- Selection (Need to work on later)--------------- */}
          {table.getFilteredSelectedRowModel().rows.length > 0 &&
          props.selection_option
            ? props.selectionAction(table)
            : null}

          {/* ---------------- filter by  Type --------------- */}
          {props.filter
            ? table.getColumn(`${props.filter}`) && (
                <DataTableFacetedFilter
                  column={table.getColumn(`${props.filter}`)}
                  title={`${props.filter}`}
                  options={props.filterOptions}
                />
              )
            : null}

          {/* ---------------- Remove filter--------------- */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <XCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MenuSquare className="w-4 h-4 mr-3" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllLeafColumns()
                .filter((column) => typeof column.accessorFn !== "undefined")
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onClick={column.getToggleVisibilityHandler()}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border mt-4">
        <Table className="Table">
          <TableHeader className="THead">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="TableHeaderRow" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="TableHeader" key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="TBody">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="TableRow" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={props.table_data.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export default ReusableTable;
