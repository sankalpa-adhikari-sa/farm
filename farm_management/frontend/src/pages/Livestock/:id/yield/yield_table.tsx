import ReusableTable from "@/components/Table";
import { DataTableColumnHeader } from "@/components/ui/table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import TableRowActions from "@/components/TableRowActions";
import {
  useDeleteYieldByID,
  useYieldByLivestock,
} from "../../hooks/useYieldData";
import { useParams } from "react-router-dom";
import { DollarSignIcon } from "lucide-react";
import { BsFillCircleFill } from "react-icons/bs";
import { format, parseISO } from "date-fns";
import YieldChart from "@/charts/YieldChart";
const YieldSchema = z.object({
  id: z.string(),
  yield_details: z.string().optional(),
  yield_type: z.string(),
  is_yield_loss: z.string(),
  expected_revenue: z.number(),
  yield_unit: z.string(),
  yield_loss_quantity: z.number(),
  net_yield_quantity: z.number(),
  storage_location: z.string(),
  yield_date: z.date(),
});

type YieldDef = z.infer<typeof YieldSchema>;
type LivestockId = {
  id: string;
};
function LivestockYieldTable() {
  const { id } = useParams<LivestockId>();
  const { data = [] }: any = useYieldByLivestock(id!);
  console.log(data);

  const deleteYieldData = useDeleteYieldByID();
  const handleYieldDelete = (id: string) => {
    return deleteYieldData.mutate(id);
  };
  const columns: ColumnDef<YieldDef>[] = [
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
      id: "Yield Type",
      accessorKey: "yield_type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Yield Type" />
      ),

      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Yield Type")}</div>
      ),
    },
    {
      id: "Net Yield",
      // Accessor Key should be same as key of a dictionary
      accessorKey: "net_yield_quantity",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Net Yield" />
      ),
      //     enableSorting: false,
      // enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-2 items-center capitalize">
          <div>{row.getValue("Net Yield")}</div>
          <div className="text-muted-foreground text-xs">
            {row.original.yield_unit}
          </div>
        </div>
      ),
    },
    {
      id: "Yield Loss",
      // Accessor Key should be same as key of a dictionary
      accessorKey: "yield_loss_quantity",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Yield Loss" />
      ),
      //     enableSorting: false,
      // enableHiding: false,
      cell: ({ row }: { row: any }) => (
        <div>
          {row.getValue("Yield Loss") <= 0 ? (
            <div className="text-success">No</div>
          ) : (
            <div className="flex gap-2 items-center  capitalize">
              <BsFillCircleFill className="text-destructive w-2 h-2" />
              <div className="text-destructive">
                {row.getValue("Yield Loss")}
              </div>
              <div className="text-destructive text-xs">
                {row.original.yield_unit}
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "Expected Revenue",
      // Accessor Key should be same as key of a dictionary
      // to get data inside of expand "expand.relationalfield.field inside another collection"
      accessorKey: "expected_revenue",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Expected Revenue" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <DollarSignIcon className="w-2.5 h-2.5 text-muted-foreground " />
          <div>{row.getValue("Expected Revenue")}</div>
        </div>
      ),
    },
    {
      id: "Storage Location",
      // Accessor Key should be same as key of a dictionary
      // to get data inside of expand "expand.relationalfield.field inside another collection"
      accessorKey: "expand.storage_location.warehouse_name",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Storage Location" />
      ),
      cell: ({ row }) => <div>{row.getValue("Storage Location")}</div>,
    },
    {
      id: "Yield Date",
      // Accessor Key should be same as key of a dictionary
      // to get data inside of expand "expand.relationalfield.field inside another collection"
      accessorKey: "yield_date",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Yield Date" />
      ),
      cell: ({ row }) => (
        <div>{format(parseISO(row.getValue("Yield Date")), "yyyy LLL dd")}</div>
      ),
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
            deletefn={() => handleYieldDelete(row.original.id)}
            // view={`/livestock/${row.original.id}`}
            // edit={`/livestock/${row.original.id}/update`}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <YieldChart type="Milk" data={data} />
      <ReusableTable
        selection_option={false}
        columns={columns}
        // filter="Livestock Type" //supports currently only one need to modify it to array of [{filter:"Livestock Type",options:[{label:"Poultry",value:"poultyr"},{}]}]
        // filterOptions={FilterOptions} //remve this after supporting above
        table_data={data}
      />
    </div>
  );
}
export default LivestockYieldTable;
