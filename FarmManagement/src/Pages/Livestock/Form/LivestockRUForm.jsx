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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useParams } from 'react-router-dom';
import { useResource } from '@/hooks/useResourceData';


function LivestockRUForm() {
  const {id}= useParams()

  const form= useForm({
    defaultValues: {
      usage_quantity: 0,
      details: ''
    },
  })
  const {data}= useResource()
  const RESOURCES= data
  console.log("Resource data: ", data)

  const onSubmitForm =(data) =>{
    const UsageWithId = {
      ...data,
      livestock: id,
    };
    console.log(UsageWithId)
    form.reset();
    form.clearErrors();
  }

  const handleReset = (e) => {
    e.preventDefault();
    form.reset();
    form.clearErrors();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
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
          Submit
        </Button>
        <Button variant="destructive" onClick={handleReset}>
          clear
        </Button>
      </form>
    </Form>
  )
}

export default LivestockRUForm