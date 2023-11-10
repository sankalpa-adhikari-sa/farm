import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm, useWatch} from 'react-hook-form'
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, CheckIcon, PlusCircleIcon } from "lucide-react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup,RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AiFillFire } from "react-icons/ai"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
type TasksFormProps = {
  isUpdate:Boolean
  submitBtnText: string

}
const formSchema = z.object({
  task_title:z.string().min(5,{message:"Title must be at least 5 characters"}),
  task_description:z.string().min(10,{message:"Title must be at least 10 characters"}),
  task_priority:z.enum(["high","low","medium"]),
  task_deadline:z.date().optional(),
  assigned_to: z.array(z.string())

})

function TasksForm(props:TasksFormProps) {
  const assigned = [
    { value: "One", label: "1" },
    { value: "Two", label: "2" },
    { value: "Tree", label: "3" },
    { value: "Four", label: "4" },
    { value: "Six", label: "6" },
    { value: "seven", label: "7" },
    { value: "eight", label: "8" },
    { value: "nine", label: "9" },
    { value: "ten", label: "10" },
    { value: "eleven", label: "11" },
    { value: "twelve", label: "12" },
    { value: "thirteen", label: "13" },
    { value: "fourteen", label: "14" },
    { value: "fifteen", label: "15" },
    { value: "sixteen", label: "16" },
  ];
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());
  const form= useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      task_title:"",
      task_description:"",
      task_priority:"medium"
    }
})
const watchedPriority = useWatch({
  control: form.control,
  name: 'task_priority',
  defaultValue: 'medium', // Set the default value
});

  const onSubmitForm =(data:z.infer<typeof formSchema>) =>{
  console.log(data)
    form.reset();
    setSelectedValues(new Set()); //resetting the state
    form.clearErrors();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <FormField  control={form.control}
            name="task_title"
            rules={{
              required:"Title is required",
              }}
            render={({field}) =>(
              <FormItem >
                <FormLabel>Title</FormLabel>
                <FormControl >
                  <Input type="text" placeholder="Title"
                    {...field} 
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter Title
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}/>
        <FormField  control={form.control}
            name="task_description"
            rules={{
              required:"Description is required",
              }}
            render={({field}) =>(
              <FormItem >
                <FormLabel>Description</FormLabel>
                <FormControl >
                  <Textarea placeholder="Description"
                    {...field} 
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter Description
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}/>
      <FormField control={form.control}
      name="task_priority"
      rules={{required: "Priority is required"}}
      render = {({field}) => (
        <FormItem>
          <FormLabel>
            Priority
          </FormLabel>
          <FormControl>
            <RadioGroup className="items-center grid grid-cols-3 gap-4" onValueChange={field.onChange}
                        defaultValue="medium">
                <FormItem >
                  <FormControl className="peer sr-only">
                    <RadioGroupItem  value="high" />
                  </FormControl>
                  <FormLabel className={cn(
    'flex flex-col gap-3 items-center justify-between rounded-md border-2 border-muted bg-popover p-4',
    {
      'hover:bg-accent hover:text-accent-foreground':watchedPriority !== 'high',
      'border-primary':watchedPriority === 'high',
      'peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary':
       watchedPriority === 'high',
    }
  )}>
                  <AiFillFire />
                    High
                  </FormLabel>
                </FormItem>

                <FormItem>
                  <FormControl>
                    <RadioGroupItem className="peer sr-only"  value="medium" />
                  </FormControl>
                    <FormLabel  className={cn(
    'flex flex-col gap-3 items-center justify-between rounded-md border-2 border-muted bg-popover p-4',
    {
      'hover:bg-accent hover:text-accent-foreground':watchedPriority !== 'medium',
      'border-primary':watchedPriority === 'medium',
      'peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary':
       watchedPriority === 'medium',
    }
  )} >
                    <AiFillFire />
                      Medium
                    </FormLabel>
                </FormItem>

                <FormItem>
                  <FormControl>
                    <RadioGroupItem className="peer sr-only" value="low"/>
                  </FormControl>
                  <FormLabel className={cn(
    'flex flex-col gap-3 items-center justify-between rounded-md border-2 border-muted bg-popover p-4',
    {
      'hover:bg-accent hover:text-accent-foreground':watchedPriority !== 'low',
      'border-primary':watchedPriority === 'low',
      'peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary':
       watchedPriority === 'low',
    }
  )}>
                  <AiFillFire />
                    Low
                  </FormLabel>
                </FormItem>
            </RadioGroup>
          </FormControl>
          <FormDescription className="text-xs">
                  Enter Priority
          </FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
      
      />

            <FormField
            control={form.control}
            name="task_deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Deadline</FormLabel>
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
                        date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Task Deadline .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


              <FormField
              control={form.control}
              rules={{
                required:"Should be assigned to atleast one "            
             }}
              name='assigned_to'
              render={() => (
                <FormItem>
                  <FormLabel>Assigned to</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className='w-full justify-start'
                        >
                          <PlusCircleIcon className='mr-2 h-4 w-4' />
                          {(!selectedValues || selectedValues.size < 1)&& (<p className="text-muted-foreground">Assigned to</p>)}
                          {selectedValues?.size > 0 && (
                            <>
                              <Separator
                                orientation='vertical'
                                className='mx-2 h-4'
                              />

                              <div className='flex space-x-1'>
                                
                                {selectedValues.size > 4 ? (
                                  <Badge
                                    variant='secondary'
                                    className='rounded-sm px-1 font-normal'
                                  >
                                    {selectedValues.size} selected
                                  </Badge>
                                ) : (
                                  assigned
                                    .filter((option) =>
                                      selectedValues.has(option.value),
                                    )
                                    .map((option) => (
                                      <Badge
                                        variant='secondary'
                                        key={option.value}
                                        className='rounded-sm px-1 font-normal'
                                      >
                                        {option.label}
                                      </Badge>
                                    ))
                                )}
                              </div>
                            </>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0' align='start'>
                      <Command>
                        <CommandInput
                          placeholder='Search array...'
                          className='h-9'
                        />
                        <CommandEmpty>No result found.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72 w-48">

                         
                          {assigned.map((option, index) => {
                            const isSelected = selectedValues.has(option.value);
                            return (
                              <CommandItem
                                key={index}
                                onSelect={() => {
                                  setSelectedValues((prevValues) => {
                                    const newValues = new Set(prevValues);
                                    if (isSelected) {
                                      newValues.delete(option.value);
                                    } else {
                                      newValues.add(option.value);
                                    }
                                    form.setValue('assigned_to', Array.from(newValues));
                                    return newValues;
                                  });
                                }}
                              >
                                <div
                                  className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    isSelected
                                      ? "bg-primary text-primary-foreground"
                                      : "opacity-50 [&_svg]:invisible",
                                  )}
                                >
                                  <CheckIcon className={cn("h-4 w-4")} />
                                </div>
                                <span>{option.label}</span>
                              </CommandItem>
                            );
                          })}
                           </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />



            <Button>submit</Button>
        </form>
      </Form>
     
    </div>
  )
}

export default TasksForm