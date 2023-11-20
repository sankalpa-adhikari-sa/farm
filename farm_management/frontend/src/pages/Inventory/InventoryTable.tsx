import ReusableTable from "@/components/Table";
import { DataTableColumnHeader } from "@/components/ui/table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useDeleteResourceByID, useResource } from "./hooks/useInventoryData";
import { z } from "zod";
import TableRowActions from "@/components/TableRowActions";
import { Badge } from "@/components/ui/badge";
const ResourceSchema = z.object({
  id: z.string(),
  current_quantity: z.number(),
  input_name: z.string(),
  expand: z.any(),
  inventory_type: z.string(),
  quantity_unit: z.string(),
  alert_level: z.number(),
});

type ResourceDef = z.infer<typeof ResourceSchema>;

function InventoryTable() {
  const { data = [] }: any = useResource();
  console.log(data);
  const deleteResourceData = useDeleteResourceByID();
  const handleResourceDelete = (id: string) => {
    console.log(id);
    return deleteResourceData.mutate(id);
  };
  const FilterOptions = [
    { label: "Feed", value: "feed" },
    { label: "Chemical", value: "chemical" },
    { label: "Input", value: "input" },
    { label: "Medical", value: "medical" },
    { label: "Others", value: "others" },
  ];
  const columns: ColumnDef<ResourceDef>[] = [
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
      id: "Input Name",
      // Accessor Key should be same as key of a dictionary
      accessorKey: "input_name",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Input Name" />
      ),
      //     enableSorting: false,
      // enableHiding: false,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Input Name")}</div>
      ),
    },
    {
      id: "Current Quantity",
      accessorKey: "current_quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Current Quantity" />
      ),

      cell: ({ row }) => (
        <>
          <div className="flex gap-2 items-baseline capitalize">
            <div>{row.getValue("Current Quantity")}</div>
            <div className="text-muted-foreground text-xs">
              {row.original.quantity_unit}
            </div>
          </div>
        </>
        // <div className="TableData">{row.getValue("Current Quantity")}</div>
      ),
    },
    {
      id: "Status",
      accessorKey: "Status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.current_quantity === 0 ? (
            <Badge
              variant="destructive"
              className="px-1 gap-1 font-normal rounded-sm"
            >
              Empty
            </Badge>
          ) : row.original.current_quantity <= row.original.alert_level ? (
            <Badge
              className="px-1 gap-1 font-normal rounded-sm"
              variant="alert"
            >
              Low Stock
            </Badge>
          ) : (
            <Badge className="px-1 gap-1 font-normal rounded-sm">Instock</Badge>
          )}
        </div>
      ),
    },
    {
      id: "Resource Type",
      // Accessor Key should be same as key of a dictionary
      // to get data inside of expand "expand.relationalfield.field inside another collection"
      accessorKey: "inventory_type",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Resource Type" />
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Resource Type")}</div>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "Storage Location",
      // Accessor Key should be same as key of a dictionary
      accessorKey: "expand.storage_location.warehouse_name",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Storage Location" />
      ),
      //     enableSorting: false,
      // enableHiding: false,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Storage Location")}</div>
      ),
    },

    {
      id: "Action",
      header: "",
      cell: ({ row }) => (
        <div>
          <TableRowActions
            deletefn={() => handleResourceDelete(row.original.id)}
            view={`/inventory/${row.original.id}`}
            edit={`/inventory/${row.original.id}/update`}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <ReusableTable
        selection_option={false}
        columns={columns}
        filter="Resource Type" //supports currently only one need to modify it to array of [{filter:"Livestock Type",options:[{label:"Poultry",value:"poultyr"},{}]}]
        filterOptions={FilterOptions} //remve this after supporting above
        table_data={data}
      />
    </div>
  );
}

export default InventoryTable;
