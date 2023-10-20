import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button'
import {useForm, useWatch} from 'react-hook-form'
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


function YieldTypeForm(props) {
  const form= useForm({
    defaultValues: {
      name:"",
      yield_unit:"",
      yield_type_info:"",
    },
  })

  // const {register, control, handleSubmit,formState:{errors},reset, clearErrors}= form

  const onSubmitForm =(data) =>{
    const livestockYieldTypeWithId = {
      ...data,
      livestock_yield_type_id: uuidv4(),
    };
    form.reset();
    form.clearErrors();
    console.log(livestockYieldTypeWithId)
  }
  const handleReset = (e) => {
    e.preventDefault()
    form.reset();
    form.clearErrors();
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        
        {/* --------------------------------- */}
        <FormField  control={form.control}
          name="name"
          
          rules={{
            required:"Name of Yield type required"
             
         }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Eggs"
                {...field} />
              </FormControl>
              <FormDescription className="text-xs">
              Yield type will be showed as option while adding yield
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/>
        
        {/* --------------------------------- */}
        <FormField control={form.control}
          name="yield_unit"
          valueAsNumber={true}
          rules={{
            required:"Yield unit required",
            
             
         }}
          render={({field}) =>(
            <FormItem>
              <FormLabel>Yield Unit</FormLabel>
              <FormControl>
                <Input placeholder="kg" 
                {...field}
                // onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                />
              </FormControl>
              <FormDescription className="text-xs">
                These units will be used for measuring Yield
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/>

        {/* --------------------------------- */}
        <FormField control={form.control}
          name="yield_type_info"
          valueAsNumber={true}
          render={({field}) =>(
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Input placeholder="Details...." 
                {...field}
                // onChange={(e) => field.onChange(parseFloat(e.target.value))} 
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

export default YieldTypeForm