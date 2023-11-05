import { Button } from '@/components/ui/button'
import {useForm} from 'react-hook-form'
import { cn } from "@/lib/utils";
import {ChevronsUpDown,Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
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
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useParams } from 'react-router-dom';
import { useResource } from '@/pages/Inventory/hooks/useInventoryData';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"

type LivestockRUFormProps = {
    isUpdate:Boolean
    submitBtnText: string

}
const formSchema = z.object({
    resource:z.string(),
    usage_quantity: z.number(),
    details: z.string(),
    usage_date: z.date(),
})


function LivestockRUForm(props:LivestockRUFormProps) {
  const {id}= useParams()
  const form= useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usage_quantity: 0,
      details: ''
    },
  })
  const {data: resource_data}= useResource()
  const RESOURCES= resource_data?resource_data.map(item => ({
    label:`${item.input_name} | ${item.inventory_type} > ${item.current_quantity} ${item.quantity_unit} @ ${item.expand?item.expand.storage_location.warehouse_name:""}`,
    value: item.id
  })):[]

  const onSubmitForm =(data:z.infer<typeof formSchema>) =>{
    const UsageWithId = {
      ...data,
      livestock: id,
    };
    console.log(UsageWithId)
    form.reset();
    form.clearErrors();
  }

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    form.reset();
    form.clearErrors();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        {/* --------------------------------- */}
        <FormField
          control={form.control}
          name="resource"
          rules={{
            required:"Resource is required"            
         }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Resource</FormLabel>
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
                        ? RESOURCES.find(
                            (type) => type.value === field.value
                          )?.label
                        : "Select Resource"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Resource..." />
                    <CommandEmpty>No Resource found.</CommandEmpty>
                    <CommandGroup>
                    <ScrollArea className="h-72 w-48">
                      {RESOURCES.map((type) => (
                        <CommandItem
                          value={type.label}
                          key={type.value}
                          onSelect={() => {
                            form.setValue("resource", type.value)
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
                This is the Resource that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --------------------------------- */}
        <FormField  control={form.control}
          name="usage_quantity"
          rules={{
            required:"Resource Usage Quantity is required"
          }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Resource Usage Quantity</FormLabel>
              <FormControl >
                <Input placeholder="20" type="number"
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                />
              </FormControl>
              <FormDescription className="text-xs">
              Resource Usage Quantity will be showed as option while adding yield
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/>   

        <FormField
          control={form.control}
          name="usage_date"
          rules={{
            required:"Usage Date is required"
          }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Usage Date</FormLabel>
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
                Your usage date will be used in other .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* --------------------------------- */}
        <FormField control={form.control}
          name="details"
          render={({field}) =>(
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
              <Textarea placeholder="Details..."
                className="resize-none"
                {...field} 
               
              />
              </FormControl>
              <FormDescription className="text-xs">
                Information about this yield type
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/>
        <Button type="submit">
          {props.submitBtnText}
        </Button>
        <Button variant="destructive" onClick={handleReset}>
          clear
        </Button>
      </form>
    </Form>
  )
}

export default LivestockRUForm