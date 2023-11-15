import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useAddWarehouseData } from "../hooks/useWarehouseData";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type WarehouseFormProps = {
  isUpdate: Boolean;
  submitBtnText: string;
};
const formSchema = z.object({
  warehouse_details: z.string().optional(),
  warehouse_name: z
    .string()
    .min(5, { message: "Warehouse Name must be minimum 5 characters long" }),
  warehouse_tag: z.string().min(3),
  warehouse_location: z.string().min(5),
  warehouse_establishment: z.date(),
});

function WarehouseForm(props: WarehouseFormProps) {
  //React-Hook-Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warehouse_details: "",
      warehouse_name: "",
      warehouse_tag: "",
      warehouse_location: "",
    },
  });
  const { mutate: AddWarehouseData } = useAddWarehouseData();
  const onSubmitForm = (data: z.infer<typeof formSchema>) => {
    AddWarehouseData(data);
    form.reset();
    form.clearErrors();
  };
  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    form.reset();
    form.clearErrors();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <FormField
            control={form.control}
            name="warehouse_name"
            rules={{
              required: "Warehouse Name is required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Warehouse Name</FormLabel>
                <FormControl>
                  <Input placeholder="Green container" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter Warehouse Name
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="warehouse_tag"
            rules={{
              required: "Warehouse Tag is required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Warehouse Tag</FormLabel>
                <FormControl>
                  <Input placeholder="W105" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter Warehouse Tag
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="warehouse_location"
            rules={{
              required: "Warehouse Location is required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Warehouse Address</FormLabel>
                <FormControl>
                  <Input placeholder="Butwal-12, Devinagar" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter Warehouse Tag
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="warehouse_establishment"
            rules={{
              required: "Warehouse Establishment Date is required",
            }}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Establishment</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your Warehouse Establishment date will be used in other .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="warehouse_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Details..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Additional Information about Warehouse
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button type="submit">{props.submitBtnText}</Button>
          <Button variant="destructive" onClick={handleReset}>
            clear
          </Button>
        </form>
      </Form>
    </>
  );
}

export default WarehouseForm;
