import ReusableTable from "@/components/Table";
import { Trash, PlusSquare, Group } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/table-header";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { useDeleteLivestockByID, useLivestock } from "./hooks/useLivestockData";
import { z } from "zod";
import TableRowActions from "@/components/TableRowActions";
import { useLivestockType } from "./hooks/useLivestockTypeData";
const LivestockSchema = z.object({
  id: z.string(),
  livestock_tag_no: z.string(),
  livestock_breed: z.string(),
  type: z.string(),
  priority: z.string(),
});

type LivestockDef = z.infer<typeof LivestockSchema>;
function LivestockTable() {
  const { data = [] }: any = useLivestock();

  const deleteLivestockData = useDeleteLivestockByID();
  const handleLivestockDelete = (id: string) => {
    console.log(id);
    return deleteLivestockData.mutate(id);
  };

  const columns: ColumnDef<LivestockDef>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),

      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "Tag No",
      accessorKey: "livestock_tag_no",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tag No" />
      ),

      cell: ({ row }) => (
        <div className="TableData">{row.getValue("Tag No")}</div>
      ),
    },
    {
      id: "Breed",
      // Accessor Key should be same as key of a dictionary
      accessorKey: "livestock_breed",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Breed" />
      ),
      //     enableSorting: false,
      // enableHiding: false,
      cell: ({ row }) => (
        <div className="TableData">{row.getValue("Breed")}</div>
      ),
    },
    {
      id: "Livestock Type",
      // Accessor Key should be same as key of a dictionary
      // to get data inside of expand "expand.relationalfield.field inside another collection"
      accessorKey: "expand.livestock_type.type",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Livestock Type" />
      ),
      cell: ({ row }) => (
        <div className="TableData">{row.getValue("Livestock Type")}</div>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },

    // {
    //     accessorKey: "Status",
    //     header: "Status",
    //     cell:(props) =>
    //         <div className='TableData'>{props.getValue() == "Work"? <div> <MdCircle fontSize={16} color='green'/> {props.getValue()}</div>:<div> <MdCircle fontSize={16} color='red'/> {props.getValue()} </div> }</div>
    // },
    {
      id: "Action",
      header: "",
      cell: ({ row }) => (
        <div>
          <TableRowActions
            deletefn={() => handleLivestockDelete(row.original.id)}
            view={`/livestock/${row.original.id}`}
            edit={`/livestock/${row.original.id}/update`}
          />
        </div>
      ),
    },
  ];
  // const handleSelection= (table)=>{
  //   const sel = table.getSelectedRowModel().flatRows.map(row => row.original.livestock_id)
  //   console.log(sel)

  // }

  const DropdownMenuTriggerCSS =
    "w-10 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const selectionAction = (table: any) => {
    console.log(table);
    const handleDeleteSelection = () => {
      const sel = table
        .getSelectedRowModel()
        .flatRows.map((row: any) => row.original.id);
      console.log(sel);
      console.log(table);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={DropdownMenuTriggerCSS}>
          <PlusSquare className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleDeleteSelection(table)}
            className="h-10 text-destructive"
          >
            <Trash className="w-4 h-4 mr-3 text-destructive" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="h-10">
            <Group className="w-4 h-4 mr-3" />
            Add to Group
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  const l_type_Query = useLivestockType();
  const FilterOptions = l_type_Query.data
    ? l_type_Query.data.map((item) => ({
        label: item.type,
        value: item.type,
      }))
    : [];
  // const FilterOptions = [
  //   {
  //     value: "goat",
  //     label: "Goat",
  //   },
  //   {
  //       value: "poultry",
  //       label: "Poultry",
  //     },
  // ]
  return (
    <div>
      <ReusableTable
        selection_option={true}
        selectionAction={selectionAction}
        columns={columns}
        filter="Livestock Type" //supports currently only one need to modify it to array of [{filter:"Livestock Type",options:[{label:"Poultry",value:"poultyr"},{}]}]
        filterOptions={FilterOptions} //remve this after supporting above
        table_data={data}
      />
    </div>
  );
}

export default LivestockTable;
