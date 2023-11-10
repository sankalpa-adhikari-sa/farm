import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup,RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AiFillFire } from "react-icons/ai"
type TasksFormProps = {
  isUpdate:Boolean
  submitBtnText: string

}
const formSchema = z.object({
  task_title:z.string().min(5,{message:"Title must be at least 5 characters"}),
  task_priority:z.enum(["high","low","medium"]),

})

function TasksForm(props:TasksFormProps) {

  const form= useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      task_title:"",
      task_priority:"high"
    }
})

  const onSubmitForm =(data:z.infer<typeof formSchema>) =>{
  console.log(data)
    form.reset();
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
                  <Input type="text"  placeholder="Title"
                    {...field} 
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter Title
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
                        defaultValue="high">
                <FormItem >
                  <FormControl className="peer sr-only">
                    <RadioGroupItem  value="high" />
                  </FormControl>
                  <FormLabel className="flex flex-col gap-3 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  <AiFillFire />
                    High
                  </FormLabel>
                </FormItem>

                <FormItem>
                  <FormControl>
                    <RadioGroupItem className="peer sr-only"  value="low" />
                  </FormControl>
                    <FormLabel  className="flex flex-col gap-3 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary" >
                    <AiFillFire />
                      Low
                    </FormLabel>
                </FormItem>

                <FormItem>
                  <FormControl>
                    <RadioGroupItem className="peer sr-only" value="medium"/>
                  </FormControl>
                  <FormLabel className="flex flex-col gap-3 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  <AiFillFire />
                    Medium
                  </FormLabel>
                </FormItem>

    

            </RadioGroup>
          </FormControl>
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