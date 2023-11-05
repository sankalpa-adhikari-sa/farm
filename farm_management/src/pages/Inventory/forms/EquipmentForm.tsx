import { Button } from '@/components/ui/button'
import {useForm, useWatch} from 'react-hook-form'
import { cn } from "@/lib/utils";
import {ChevronsUpDown,Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useParams } from 'react-router-dom';
import { useWarehouse } from '@/pages/Warehouse/hooks/useWarehouseData';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
type EquipmentFormProps = {
  isUpdate:boolean
  submitBtnText: string
}
const formSchema = z.object({
  details: z.string().optional(),
  equipment_name: z.string(),
  quantity:z.number(),
  vendor:z.string(),
  company:z.string(),
  model:z.string(),
  number_plate:z.string().optional(),
  cost_price: z.number(),
  acquired_date:z.date(),
  operation_type: z.enum(["diesel","electric","petrol","manual","others"]),
  storage_location: z.string(),
  equipment_status:z.enum(["active","inactive","maintainance"]),
  currency: z.enum(["nrs","inr","usd"]),
  ownership:z.enum(["purchased","leased"]), // pruchased and leased have subfields
  lease_deadline:z.date(),//>>leased
  charged_by: z.enum(["hr","day","month","year"]),//>>leased
  lease_status:z.enum(["using","returned"]),//>>leased
  purchase_condition:z.enum(["old","new"]),//>>>purchased
  servicing_interval:z.number(),//>>purchased
  subsidy:z.enum(["yes","no"]),//>>purchased
  insurance:z.enum(["yes","no"]),//>>purchased
  subsidy_amount:z.number(), //>>purchased>>subsidy
  insurance_amount: z.number(),//>>purchased>>subsidy
  insurance_number:z.number(),//>>purchased>>subsidy

});
type formSchemaType= z.infer<typeof formSchema>
function EquipmentForm(props:EquipmentFormProps) {
    const form= useForm<formSchemaType>({
      resolver: zodResolver(formSchema),
        defaultValues: {
          equipment_name:"",
          quantity:0,
          vendor:"",
          company:"",
          model:"",
          number_plate:'',
          cost_price:0,
          servicing_interval:0,
          subsidy_amount:0,
          insurance_amount:0,
          insurance_number:0,
          details:"",
          ownership:"purchased",
          subsidy:"no",
          insurance:"no"


    
        },
      })
    const {id}= useParams()
    const {data:warehouse_query}= useWarehouse()
    const WAREHOUSE= warehouse_query?warehouse_query.map((item =>({
        label: `${item.warehouse_name}, ${item.warehouse_tag}`,
        value: item.id
      }))):[]

    const ownership = useWatch({ control:form.control, name: 'ownership', defaultValue: 'purchased' });
    const subsidy = useWatch({ control:form.control, name: 'subsidy', defaultValue: 'no' });
    const insurance = useWatch({ control:form.control, name: 'insurance', defaultValue: 'no' });
    // const {mutate:addResourceData}= useAddResourceData()
    const onSubmitForm =(data: z.infer<typeof formSchema>) =>{
        // addResourceData(data)
        console.log(data)
        form.reset();
        form.clearErrors();
    }
    const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        form.reset();
        form.clearErrors();
    }
  return (
    <>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <FormField  control={form.control}
        name="equipment_name"
        rules={{
          required:"Equipment Nameis required"
          }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Equipment Name
            </FormLabel>
            <FormControl >
              <Input placeholder="Equipment Name"
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-xs">
            Equipment Name will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>   
        <FormField
          control={form.control}
          name="operation_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operation Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Operation Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>                 
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage Operation Type addresses in your{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />  

        <FormField  control={form.control}
          name="quantity"
          rules={{
            required:" Quantity is required"
        }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Quantity</FormLabel>
              <FormControl >
                <Input placeholder="15" type="number"
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                />
              </FormControl>
              <FormDescription className="text-xs">
              quantity will be showed as option while adding yield
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/> 
        <FormField  control={form.control}
          name="vendor"
          rules={{
            required:" Vendor is required"
        }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Vendor</FormLabel>
              <FormControl >
                <Input placeholder="15" 
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-xs">
              Vendor will be showed as option while adding yield
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/> 
        <FormField  control={form.control}
          name="company"
          rules={{
            required:" company is required"
        }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Company</FormLabel>
              <FormControl >
                <Input placeholder="15" 
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-xs">
              company will be showed as option while adding yield
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/> 
        <FormField  control={form.control}
          name="model"
          rules={{
            required:" model is required"
          }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Model</FormLabel>
              <FormControl >
                <Input placeholder="15" 
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-xs">
              model will be showed as option while adding yield
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/> 
        <FormField  control={form.control}
          name="number_plate"
          rules={{
            required:"Number Plate is required"
          }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Number Plate</FormLabel>
              <FormControl >
                <Input placeholder="15" 
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-xs">
              Number Plate will be showed as option while adding yield
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/> 

        <FormField
          control={form.control}
          name="acquired_date"
          rules={{
            required:"Acquired Date is required"
         }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Acquired Date</FormLabel>
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
                Your Acquired date will be used in other .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField  control={form.control}
          name="cost_price"
          rules={{
            required:" Cost Price is required"
        }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Cost Price</FormLabel>
              <FormControl >
                <Input placeholder="15" type="number"
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                />
              </FormControl>
              <FormDescription className="text-xs">
              Cost Price will be showed as option while adding yield
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/> 

          <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>                 
                  <SelectItem value="nrs">NRS</SelectItem>
                  <SelectItem value="inr">INR</SelectItem>
                  <SelectItem value="usd">USD</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage Currency addresses in your{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          rules={{
            required:"thid field is required",   
         }}
          name="ownership"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Ownership</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="purchased" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Purchased
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="leased" />
                    </FormControl>
                    <FormLabel className="font-normal">
                     Leased
                    </FormLabel>
                  </FormItem>
                  
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 

        {ownership ==="leased" && 
        <>

          <FormField
          control={form.control}
          shouldUnregister={true}
          name="lease_deadline"
          rules={{
            required:"Lease Deadline is required"
          }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Lease Deadline</FormLabel>
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
                    disabled={(date) => date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your Lease Deadline will be used in other .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


          <FormField
          control={form.control}
          shouldUnregister={true}
          name="charged_by"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Charged by</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Lease is charged by" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>                 
                  <SelectItem value="hr">Hr</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage Currency addresses in your{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
            )}
          />
          <FormField
          control={form.control}
          shouldUnregister={true}
          name="lease_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lease Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Lease Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>                 
                  <SelectItem value="using">Using</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
               This is lease status
              </FormDescription>
              <FormMessage />
            </FormItem>
            )}
          />
        
        </>
        }
        {ownership ==="purchased" &&
        <>
          <FormField
          control={form.control}
          shouldUnregister={true}
          name="purchase_condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Condition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Purchase Condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>                 
                  <SelectItem value="old">Old</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
               This is Purchase Condition
              </FormDescription>
              <FormMessage />
            </FormItem>
            )}
          />

          <FormField  control={form.control}
          name="servicing_interval"
          shouldUnregister={true}
          rules={{
            required:"Servicing Interval is required"
          }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Servicing Interval</FormLabel>
              <FormControl >
                <Input placeholder="15" type="number"
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                />
              </FormControl>
              <FormDescription className="text-xs">
              Servicing Interval in days
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/> 
          <FormField
          control={form.control}
          shouldUnregister={true}
          rules={{
            required:"Subsidy field is required",   
          }}
          name="subsidy"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Subsidy</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                     Yes
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 

        {subsidy ==="yes" && 
        <>
        <FormField  control={form.control}
        shouldUnregister={true}
        name="subsidy_amount"
        rules={{
          required:"Subsidy Amount is required"
         }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Subsidy Amount</FormLabel>
            <FormControl >
              <Input placeholder="15000" type="number"
                {...field} 
                onChange={(e) => field.onChange(parseFloat(e.target.value))} 
              />
            </FormControl>
            <FormDescription className="text-xs">
            Subsidy Amount will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/> 
        </>
        }

        <FormField
          control={form.control}
          shouldUnregister={true}
          rules={{
            required:"Insurance field is required",   
          }}
          name="insurance"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Insurance</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                     Yes
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        {insurance ==="yes" && 
        <>
        <FormField  control={form.control}
        shouldUnregister={true}
        name="insurance_amount"
        rules={{
          required:"Insurance Amount is required"
         }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Insurance Amount</FormLabel>
            <FormControl >
              <Input placeholder="15000" type="number"
                {...field} 
                onChange={(e) => field.onChange(parseFloat(e.target.value))} 
              />
            </FormControl>
            <FormDescription className="text-xs">
            Insurance Amount will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/> 
        <FormField  control={form.control}
        shouldUnregister={true}
        name="insurance_number"
        rules={{
          required:"Insurance Number is required"
         }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Insurance Number</FormLabel>
            <FormControl >
              <Input placeholder="15000" 
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-xs">
            Insurance Number will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/> 
        </>
        }

        </>
        }

        <FormField
          control={form.control}
          name="storage_location"
          rules={{
            required:"Storage Location is required"            
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
                            form.setValue("storage_location", options.value)
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
          name="equipment_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Equipment status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>                 
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintainance">Maintainance</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Status of your Equipment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />  
        
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
                Information about this resource type
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
    </>
  )
}

export default EquipmentForm