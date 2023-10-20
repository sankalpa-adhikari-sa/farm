
import React from 'react'
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

import { useWarehouse } from '@/hooks/useWarehouseData';
import { useAddResourceData, useUpdateResourceData } from '@/hooks/useResourceData';



function ResourceInventoryForm(props) {


  const type= [{label:"Feed",value:"feed" },
                {label:"chemical",value:"chemical" },
                {label:"input",value:"input" },
                {label:"medical",value:"medical" },
                {label:"others",value:"others" },
  ]
  const CHEM_TYPE= [{label:"Fertilizer",value:"fertilizer" },
                {label:"Pesticide",value:"pesticide" },
                {label:"Herbicide",value:"herbicide" },
                {label:"others",value:"others" },
  ]
  const UNIT= [{label:"Kg",value:"kg" },
                {label:"gm",value:"gm" },
                {label:"lit",value:"lit" },
                {label:"num",value:"num" },
  ]
  const form= useForm({
    defaultValues: {
      details:"",
      vendor:"",
      alert_level:"",
      per_unit_price:"",
      manufacturer:"",
      quantity:'',
      input_name:"",
      current_quantity:""

    },
  })
  const {id}= useParams()
  const {data:warehouse_query}= useWarehouse()
  const WAREHOUSE= warehouse_query?warehouse_query.map((item =>({
    label: `${item.warehouse_name}, ${item.warehouse_tag}`,
    value: item.id
  }))):[]
  const inv_type = useWatch({ control:form.control, name: 'inventory_type', defaultValue: 'feed' });

  const {mutate:addResourceData}= useAddResourceData()
  const onSubmitForm =(data) =>{
    const ResourceWithId = {
      ...data,
      current_quantity:data.quantity
   
    };
    console.log(ResourceWithId)
    addResourceData(ResourceWithId)
    form.reset();
    form.clearErrors();
   
  }
  const handleReset = (e) => {
    e.preventDefault()
    
    form.reset();
    form.clearErrors();
  }


  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
      <FormField
          control={form.control}
          name="inventory_type"
          rules={{
            required:"Type is required"            
         }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Inventory Type</FormLabel>
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
                        ? type.find(
                            (option) => option.value === field.value
                          )?.label
                        : "Select Inventory Type"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Inventory Type..." />
                    <CommandEmpty>No Inventory Type found.</CommandEmpty>
                    <CommandGroup>
                    <ScrollArea className="h-72 w-48">
                      {type.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            form.setValue("inventory_type", option.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              option.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                      </ScrollArea>

                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription className="text-xs" > 
                This is the type that will be used in the dashboard.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
         {inv_type ==="chemical" && 
         <FormField
         control={form.control}
         name="chemical_type"
         rules={{
           required:"Chemical is required"            
        }}
         render={({ field }) => (
           <FormItem className="flex flex-col">
             <FormLabel>Chemical Type</FormLabel>
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
                       ? CHEM_TYPE.find(
                           (option) => option.value === field.value
                         )?.label
                       : "Select Inventory Type"}
                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                   </Button>
                 </FormControl>
               </PopoverTrigger>
               <PopoverContent className="w-[200px] p-0">
                 <Command>
                   <CommandInput placeholder="Search Chemical Type..." />
                   <CommandEmpty>No Chemical Type found.</CommandEmpty>
                   <CommandGroup>
                   <ScrollArea className="h-72 w-48">
                     {CHEM_TYPE.map((option) => (
                       <CommandItem
                         value={option.label}
                         key={option.value}
                         onSelect={() => {
                           form.setValue("chemical_type", option.value)
                         }}
                       >
                         <Check
                           className={cn(
                             "mr-2 h-4 w-4",
                             option.value === field.value
                               ? "opacity-100"
                               : "opacity-0"
                           )}
                         />
                         {option.label}
                       </CommandItem>
                     ))}
                     </ScrollArea>

                   </CommandGroup>
                 </Command>
               </PopoverContent>
             </Popover>
             <FormDescription className="text-xs" > 
               This is the type that will be used in the dashboard.
             </FormDescription>
             <FormMessage className="text-xs" />
           </FormItem>
         )}
       />
         }

<FormField  control={form.control}
        name="input_name"
        rules={{
          required:"Input Name is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Input Name</FormLabel>
            <FormControl >
              <Input placeholder="Input Name"
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-xs">
            Input Name will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>

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


        <FormField
          control={form.control}
          name="quantity_unit"
          rules={{
            required:"Unit is required"            
         }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Unit</FormLabel>
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
                        ? UNIT.find(
                            (option) => option.value === field.value
                          )?.label
                        : "Select quantity unit"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search quantity unit..." />
                    <CommandEmpty>No Inventory Type found.</CommandEmpty>
                    <CommandGroup>
                    <ScrollArea className="h-72 w-48">
                      {UNIT.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            form.setValue("quantity_unit", option.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              option.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                      </ScrollArea>

                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription className="text-xs" > 
                This is the UNIT that will be used in the dashboard.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

<FormField  control={form.control}
        name="per_unit_price"
        
        rules={{
          required:"Per Unit Price is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Per Unit Price</FormLabel>
            <FormControl >
              <Input placeholder="15" type="number"
                {...field} 
                onChange={(e) => field.onChange(parseFloat(e.target.value))} 
              />
            </FormControl>
            <FormDescription className="text-xs">
            Per Unit Price will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/> 
        <FormField  control={form.control}
        name="alert_level"
        
        rules={{
          required:"Alert Level is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Alert Level</FormLabel>
            <FormControl >
              <Input placeholder="15" type="number"
                {...field} 
                onChange={(e) => field.onChange(parseFloat(e.target.value))} 
              />
            </FormControl>
            <FormDescription className="text-xs">
            Alert Level will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>  
        <FormField  control={form.control}
        name="vendor"
        rules={{
          required:"Vendor is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Vendor</FormLabel>
            <FormControl >
              <Input placeholder="vendor" 
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-xs">
            Vendor will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>    


        {inv_type === 'medical'|| inv_type === 'chemical' || inv_type === 'others' ? (

                  
        <>
        <FormField  control={form.control}
        name="manufacturer"
        
        rules={{
          required:"Manufacturer is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Manufacturer</FormLabel>
            <FormControl >
              <Input placeholder="Manufacturer" type="number"
                {...field} 
               
              />
            </FormControl>
            <FormDescription className="text-xs">
            Manufacturer will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>     
        
        <FormField
          control={form.control}
          name="expiration_date"
          rules={{
            required:"Expiration Date is required"
         }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiration Date</FormLabel>
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
                Your Expiration date will be used in other .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </>

        ):null}  

          <FormField
          control={form.control}
          name="addition_date"
          rules={{
            required:"Stocking Date is required"
         }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Stocking Date</FormLabel>
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
                Your Stocking date will be used in other .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
          Submit
        </Button>
        <Button variant="destructive" onClick={handleReset}>
          clear
        </Button>

      </form>
    </Form>
    



  
      </>
  )
}

export default ResourceInventoryForm