// import React from 'react'
// import { useEffect } from 'react';
// import { useTheme } from '@mui/material/styles';
// import { useDispatch,useSelector } from 'react-redux';
// import { Controller } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
// import { Autocomplete, Divider, FormControl, FormHelperText, IconButton, InputLabel, Typography } from '@mui/material';
// import { Button } from "@/components/ui/button"
// import Grid from '@mui/material/Grid';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import {useForm} from 'react-hook-form'
// import {ToastContainer, toast} from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { DatePicker } from '@mui/x-date-pickers';
// import { DateTimeField } from '@mui/x-date-pickers';
// import dayjs from 'dayjs';

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
import { useAddWarehouseData } from '@/hooks/useWarehouseData';

function WarehouseForm(props) {
  //React-Hook-Form
  const form= useForm({
    defaultValues: {
      warehouse_details:"",
      warehouse_name:"",
      warehouse_tag:"",
      warehouse_location:"",
    },
  })
  const {mutate:AddWarehouseData}= useAddWarehouseData()
  const onSubmitForm =(data) =>{
    AddWarehouseData(data)
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
        <FormField  control={form.control}
          name="warehouse_name"
          rules={{
            required:"Warehouse Name is required"
            }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Warehouse Name</FormLabel>
              <FormControl >
                <Input placeholder="Green container"
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-xs">
                Enter Warehouse Name
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/>
        <FormField  control={form.control}
          name="warehouse_tag"
          rules={{
            required:"Warehouse Tag is required"
            }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Warehouse Tag</FormLabel>
              <FormControl >
                <Input placeholder="W105"
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-xs">
                Enter Warehouse Tag
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/>
        <FormField  control={form.control}
          name="warehouse_location"
          rules={{
            required:"Warehouse Location is required"
            }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Warehouse Address</FormLabel>
              <FormControl >
                <Input placeholder="Butwal-12, Devinagar"
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-xs">
                Enter Warehouse Tag
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/>

<FormField
          control={form.control}
          name="warehouse_establishment"
          rules={{
            required:"Warehouse Establishment Date is required"
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

        <FormField control={form.control}
          name="warehouse_details"
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
                Additional Information about Warehouse
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

export default WarehouseForm