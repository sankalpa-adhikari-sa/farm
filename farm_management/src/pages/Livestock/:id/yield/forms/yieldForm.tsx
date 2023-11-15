import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import { useWarehouse } from "@/pages/Warehouse/hooks/useWarehouseData";
import { useLivestockByID } from "@/pages/Livestock/hooks/useLivestockData";
import { useAddYieldData } from "@/pages/Livestock/hooks/useYieldData";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useYieldByID } from '@/pages/Livestock/hooks/useYieldData';

const formSchema = z.object({
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
type YieldFormProps = {
  isUpdate: Boolean;
  submitBtnText: string;
};

// @ts-ignore
type Yield_type = {
  label: string;
  value: string;
  unit: string;
};
function LivestockYieldForm(props: YieldFormProps) {
  const { id } = useParams();
  // const {data:yield_byid}= useYieldByID(id)
  // console.log(yield_byid)
  const type_query = useLivestockByID(id!);
  const YIELD_TYPE = type_query.data
    ? type_query.data?.expand?.livestock_type?.livestock_type_yield?.map(
        (item: any) => ({
          label: `${item.yield_name}, (${item.yield_unit})`,
          value: item.yield_name,
          unit: item.yield_unit,
        })
      ) ?? []
    : [];
  const { data: warehouse_query } = useWarehouse();
  const WAREHOUSE = warehouse_query
    ? warehouse_query.map((item) => ({
        label: `${item.warehouse_name}, ${item.warehouse_tag}`,
        value: item.id,
      }))
    : [];

  const form = useForm<z.infer<typeof formSchema>>(
    props.isUpdate
      ? {
          resolver: zodResolver(formSchema),
          defaultValues: {},
          // pass
        }
      : {
          resolver: zodResolver(formSchema),
          defaultValues: {
            yield_details: "",
            yield_loss_quantity: 0,
            net_yield_quantity: 0,
            expected_revenue: 0,
            is_yield_loss: "no",
          },
        }
  );
  const is_yield_loss = useWatch({
    control: form.control,
    name: "is_yield_loss",
    defaultValue: "no",
  });

  const { mutate: addYieldData } = useAddYieldData();

  const onSubmitForm = (data: z.infer<typeof formSchema>) => {
    const YieldWithId = {
      ...data,
      livestock: id,
    };
    console.log(YieldWithId);
    addYieldData(YieldWithId);
    form.reset();
    form.clearErrors();
  };

  const handleReset = (e: any) => {
    e.preventDefault();

    form.reset();
    form.clearErrors();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <FormField
          control={form.control}
          name="yield_type"
          rules={{
            required: "Type of Yield is required",
          }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Yield Type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? YIELD_TYPE.find(
                            (type: any) => type.value === field.value
                          )?.label
                        : "Select Yield type"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Yield Type..." />
                    <CommandEmpty>No Type found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-72 w-48">
                        {YIELD_TYPE.map((type: any) => (
                          <CommandItem
                            value={type.label}
                            key={type.value}
                            onSelect={() => {
                              form.setValue("yield_type", type.value),
                                form.setValue("yield_unit", type.unit);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                type.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {type.label}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormDescription>
                This is the Yield Type that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --------------------------------- */}
        <FormField
          control={form.control}
          rules={{
            required: "thid field is required",
          }}
          name="is_yield_loss"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Has Yield Loss Occured ?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --------------------------------- */}

        {is_yield_loss === "yes" && (
          <FormField
            control={form.control}
            name="yield_loss_quantity"
            shouldUnregister={true}
            rules={{
              required: "Yield Loss Quantity is required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yield Loss Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="15"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Yield loss quantity will be showed as option while adding
                  yield
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        )}

        {/* --------------------------------- */}
        <FormField
          control={form.control}
          name="expected_revenue"
          rules={{
            required: "Expected Revenue is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Revenue</FormLabel>
              <FormControl>
                <Input
                  placeholder="230"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Expected revenue
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {/* --------------------------------- */}
        <FormField
          control={form.control}
          name="net_yield_quantity"
          rules={{
            required: "Net yield quantity is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Net Yield Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder="20"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Net Yield quantity will be showed as option while adding yield
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storage_location"
          rules={{
            required: "Storage Location is required",
          }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Storage Location</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? WAREHOUSE.find(
                            (options) => options.value === field.value
                          )?.label
                        : "Select Warehouse"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Warehouse ..." />
                    <CommandEmpty>No Warehouse found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-72 w-48">
                        {WAREHOUSE.map((options) => (
                          <CommandItem
                            value={options.label}
                            key={options.value}
                            onSelect={() => {
                              form.setValue("storage_location", options.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                options.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {options.label}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormDescription>
                This is the Storage location that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yield_date"
          rules={{
            required: "Yield Date is required",
          }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Yield Date</FormLabel>
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
                Your yield date will be used in other .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --------------------------------- */}
        <FormField
          control={form.control}
          name="yield_details"
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
                Information about this yield type
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
  );
}

export default LivestockYieldForm;
