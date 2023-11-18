import ReusableTable from "@/components/Table";
import { DataTableColumnHeader } from "@/components/ui/table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import TableRowActions from "@/components/TableRowActions";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import {
  useMeasurementByLivestock,
  useDeleteMeasurementByID,
} from "../../hooks/useMeasurementData";

const MeasurementSchema = z.object({
  id: z.string(),
  height: z.string().optional(),
  weight: z.string().optional(),
  temperature: z.string().optional(),
  recorded_date: z.date(),
});

type MeasurementDef = z.infer<typeof MeasurementSchema>;
type LivestockId = {
  id: string;
};

function LivestockMeasurementTable() {
  const { id } = useParams<LivestockId>();
  const { data = [] }: any = useMeasurementByLivestock(id!);
  console.log(data);

  const deleteMeasurementData = useDeleteMeasurementByID();
  const handleMeasurementDelete = (id: string) => {
    return deleteMeasurementData.mutate(id);
  };
  const columns: ColumnDef<MeasurementDef>[] = [
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
      id: "Height",
      // Accessor Key should be same as key of a dictionary
      // to get data inside of expand "expand.relationalfield.field inside another collection"
      accessorKey: "height",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Height" />
      ),
      cell: ({ row }) => <div>{row.getValue("Height")}</div>,
    },
    {
      id: "Weight",
      // Accessor Key should be same as key of a dictionary
      // to get data inside of expand "expand.relationalfield.field inside another collection"
      accessorKey: "weight",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Weight" />
      ),
      cell: ({ row }) => <div>{row.getValue("Weight")}</div>,
    },
    {
      id: "Temperature",
      // Accessor Key should be same as key of a dictionary
      // to get data inside of expand "expand.relationalfield.field inside another collection"
      accessorKey: "temperature",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Temperature" />
      ),
      cell: ({ row }) => <div>{row.getValue("Temperature")}</div>,
    },
    {
      id: "Measurement Date",
      // Accessor Key should be same as key of a dictionary
      // to get data inside of expand "expand.relationalfield.field inside another collection"
      accessorKey: "recorded_date",
      //Header is Something you want to show in the header
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Measurement Date" />
      ),
      cell: ({ row }) => (
        <div>
          {format(parseISO(row.getValue("Measurement Date")), "yyyy LLL dd")}
        </div>
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
            deletefn={() => handleMeasurementDelete(row.original.id)}
            // view={`/livestock/${row.original.id}`}
            // edit={`/livestock/${row.original.id}/update`}
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
        // filter="Livestock Type" //supports currently only one need to modify it to array of [{filter:"Livestock Type",options:[{label:"Poultry",value:"poultyr"},{}]}]
        // filterOptions={FilterOptions} //remve this after supporting above
        table_data={data}
      />
    </div>
  );
}

export default LivestockMeasurementTable;
