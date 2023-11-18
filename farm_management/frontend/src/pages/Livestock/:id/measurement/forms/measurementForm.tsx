import { Button } from '@/components/ui/button'
import {useForm} from 'react-hook-form'
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
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
import { useParams } from 'react-router-dom';
import { useAddMeasurementData } from '@/pages/Livestock/hooks/useMeasurementData';
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"

const formSchema = z.object({
    height:z.number().min(0).optional(),
    weight:z.number().min(0).optional(),
    temperature:z.number().min(0).optional(),
    recorded_date:z.date(),
    details:z.string().optional(),
})

type MeasurementFormProps = {
    isUpdate:Boolean
    submitBtnText: string
}

function LivestockMeasurementForm(props:MeasurementFormProps) {

  const {id}= useParams()
  const form= useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      temperature:0,
      height:0,
      weight:0,
      details:"",
    },
  })
  const {mutate:addMeasurementData}= useAddMeasurementData()

  const onSubmitForm =(data: z.infer<typeof formSchema>) =>{
    const MeasurementWithId = {
      ...data,
      livestock: id,
    };
    console.log(MeasurementWithId)
    addMeasurementData(MeasurementWithId)
    form.reset();
    form.clearErrors();
   
  }
  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset();
    form.clearErrors();
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>

        {/* --------------------------------- */}
        <FormField  control={form.control}
        name="height"
        rules={{
          required:"Height is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Height</FormLabel>
            <FormControl >
              <Input placeholder="15" type="number"
                {...field} 
                onChange={(e) => field.onChange(parseFloat(e.target.value))} 
              />
            </FormControl>
            <FormDescription className="text-xs">
            Height will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>     
        {/* --------------------------------- */}
        <FormField  control={form.control}
        name="weight"
        rules={{
          required:"Weight is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Weight</FormLabel>
            <FormControl >
              <Input placeholder="15" type="number"
                {...field} 
                onChange={(e) => field.onChange(parseFloat(e.target.value))} 
              />
            </FormControl>
            <FormDescription className="text-xs">
            Weight will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>     
         
        {/* --------------------------------- */}
        <FormField
          control={form.control}
          name="recorded_date"
          rules={{
            required:"Recorded Date is required"
         }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Recorded Date</FormLabel>
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
                Your Recorded Date will be used in other .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* --------------------------------- */}
        <FormField  control={form.control}
        name="temperature"
        rules={{
          required:"Temperature is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Temperature</FormLabel>
            <FormControl >
              <Input placeholder="15" type="number"
                {...field} 
                onChange={(e) => field.onChange(parseFloat(e.target.value))} 
              />
            </FormControl>
            <FormDescription className="text-xs">
            Temperature will be showed as option while adding yield
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>     
        <FormField  control={form.control}
        name="details"
        rules={{
          required:"Details is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Details</FormLabel>
            <FormControl >
              <Textarea placeholder="Details..."
              className="resize-none"
                {...field} 
               
              />
            </FormControl>
            <FormDescription className="text-xs">
            Details will be showed as option while adding yield
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

export default LivestockMeasurementForm