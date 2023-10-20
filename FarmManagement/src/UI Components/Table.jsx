import React, {useEffect,useState} from 'react'
import {getSortedRowModel,
        useReactTable, 
        getCoreRowModel, 
        flexRender, 
        getPaginationRowModel,
        getFilteredRowModel} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { MenuSquare,
        ChevronsLeft,ChevronLeft,
        ChevronsRight,ChevronRight,
        Search } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    } from "@/components/ui/select"
import { DataTablePagination } from '@/components/ui/table-pagination';

function ReusableTable(props) {
    const [sorting, setSorting] = useState([])
    const [current_columns]= useState(()=>[...props.columns])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] =useState({})
    const [columnFilters, setColumnFilters] = useState([
        {
          id: props.filter,
          value: ""
        }
      ]);

      const handleInputChange = (event) => {
        const { value } = event.target;
        setColumnFilters([{ id: props.filter, value }]);
      };
      const table= useReactTable({
        data:props.table_data,
        columns:current_columns,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state:{
            columnFilters,
            columnVisibility,
            sorting,
            rowSelection,
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel:getCoreRowModel(),
        getFilteredRowModel:getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),

    })
    const [selectedRow, setSelectedRow]= useState([])



   
  return (

    <div  className='pt-4' >
        <div  className='flex flex-row justify-between'>
            <div className='flex space-x-4'>
                <Input onChange={handleInputChange} type="text" placeholder="Search..." />
                {table.getFilteredSelectedRowModel().rows.length > 0 && props.selection_option ? 
                    props.selectionAction(table):
                    null 
                }
            </div>
            <div  >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                        <MenuSquare className='w-4 h-4 mr-3'/>
                            View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent >
                        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {table.getAllLeafColumns().map(column => {
                            return ( <DropdownMenuCheckboxItem key={column.id}
                                checked={column.getIsVisible()}
                                
                                onClick={column.getToggleVisibilityHandler()}
                                >
                                {column.id}
                            
                                </DropdownMenuCheckboxItem>)
                        })}


                    </DropdownMenuContent>
                </DropdownMenu>            
            </div>           
        </div>
        <div className="rounded-md border mt-4">
            <Table className="Table">
                <TableHeader className='THead'>
                    {table.getHeaderGroups().map(headerGroup => 
                        <TableRow className="TableHeaderRow" key={headerGroup.id}>
                            {headerGroup.headers.map(header => 
                                <TableHead className="TableHeader" key={header.id}>
                                    {flexRender(header.column.columnDef.header,header.getContext())}
                                </TableHead> )
                            }
                        </TableRow>)
                    }
                </TableHeader>
                <TableBody className='TBody'>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map(row => 
                        <TableRow className="TableRow" key={row.id}>
                            {row.getVisibleCells().map(cell => 
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell,cell.getContext())}
                                </TableCell> )
                            }
                        </TableRow>)
                    
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
  )
}

export default ReusableTable