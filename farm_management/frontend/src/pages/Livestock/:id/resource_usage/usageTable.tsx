import ReusableTable from "@/components/Table";
import { DataTableColumnHeader } from "@/components/ui/table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import TableRowActions from "@/components/TableRowActions";
import {
  useDeleteResourceUsageByID,
  useResourceUsageByLivestock,
} from "../../hooks/useResourceUsageData";
import { useParams } from "react-router-dom";
// import { DollarSignIcon } from "lucide-react";
// import { BsFillCircleFill } from "react-icons/bs";
import { format, parseISO } from "date-fns";

const ResourceUsageSchema = z.object({
  id: z.string(),
  resource: z.string(),
  details: z.string().optional(),
  usage_quantity: z.number(),
  expand: z.any(),
  usage_date: z.date(),
  quantity_unit: z.string(),
});

type ResourceUsageDef = z.infer<typeof ResourceUsageSchema>;
type LivestockId = {
  id: string;
};
function LivestockRUTable() {
  const { id } = useParams<LivestockId>();
  const { data = [] }: any = useResourceUsageByLivestock(id!);
  console.log(data);
  const deleteUsageData = useDeleteResourceUsageByID();
  const handleUsageDelete = (id: string) => {
    return deleteUsageData.mutate(id);
  };
  const columns: ColumnDef<ResourceUsageDef>[] = [
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
      id: "Resource",
      accessorKey: "expand.resource.input_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Resource" />
      ),

      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Resource")}</div>
      ),
    },
    {
      id: "Type",
      accessorKey: "resource_type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),

      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Type")}</div>
      ),
    },
    {
      id: "Quantity",
      accessorKey: "usage_quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantity" />
      ),
      cell: ({ row }) => (
        <>
          <div className="flex gap-2 items-center capitalize">
            <div>{row.getValue("Quantity")}</div>
            <div className="text-muted-foreground text-xs">
              {/* {row.original.expand.resource.quantity_unit} */}
              {row.original.quantity_unit}
            </div>
          </div>
        </>
      ),
    },

    {
      id: "Usage Date",
      // Accessor Key should be same as key of a dictionary
      // to get data inside of expand "expand.relationalfield.field inside another collection"
      accessorKey: "usage_date",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Usage Date" />
      ),
      cell: ({ row }) => (
        <div>{format(parseISO(row.getValue("Usage Date")), "yyyy LLL dd")}</div>
      ),
    },

    {
      id: "Action",
      header: "",
      cell: ({ row }) => (
        <div>
          <TableRowActions
            deletefn={() => handleUsageDelete(row.original.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <ReusableTable
        selection_option={false}
        columns={columns}
        table_data={data}
      />
    </div>
  );
}

export default LivestockRUTable;
