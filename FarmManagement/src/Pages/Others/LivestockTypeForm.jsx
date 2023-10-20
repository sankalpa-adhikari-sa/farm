import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button'
import {useForm,useFieldArray, useWatch} from 'react-hook-form'
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
import { Trash,PlusCircle, Eraser } from 'lucide-react';
function LivestockTypeForm(props) {
  const form= useForm({
    defaultValues: {
      type:"",  
      livestock_type_yield:[{yield_name: "", yield_unit: ""}],
      livestock_type_info:"",
    },
  })

  const {fields,append,remove}=useFieldArray({
    name:"livestock_type_yield",
    control:form.control
  })
  const onSubmitForm =(data) =>{
    const livestockYieldWithId = {
      ...data,
      livestock_yield_id: uuidv4(),
    };
    form.reset();
    form.clearErrors();
    console.log(livestockYieldWithId)
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
          name="type"
          
          rules={{
            required:"Type of Livestock is required"
             
         }}
          render={({field}) =>(
            <FormItem >
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Poultry"
                {...field} />
              </FormControl>
              <FormDescription className="text-xs">
              Livestock type will be used in various Forms
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/>

        {/* --------------------------------- */}
        <div>
          <FormLabel>Yield</FormLabel>
            { fields.map(({id},index)=>(
            <div>
              <FormField key={id}
                control={form.control}
                name={`livestock_type_yield.${index}.yield_name`}
                rules={{
                  required:"Yield name is required"              
                }}
                render={({field}) =>(
                  <div className='flex flex-row space-x-4'>
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Egg" 
                        {...field}
                        
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Name of Yield from livestock
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                    
                  </div>
                )}
              />
            <FormField key={id+1}
              control={form.control}
              name={`livestock_type_yield.${index}.yield_unit`}
              rules={{
                required:"Unit for yield is required"              
            }}
              render={({field}) =>(
                <div className='flex flex-row space-x-4'>
                  <FormItem>
                    <FormControl>
                      <Input placeholder="dozens" 
                      {...field}
                      
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Unit for measurement of yield
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                  
                </div>
            )}/>
          {index > 0 && (
                  <Button className="h-8 w-8" size="icon" onClick={()=> remove(index)} variant="destructive">
                    <Trash className='h-4 w-4'/>
                  </Button>
                )}
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={()=> append({yield_name:"",yield_unit:""})}>
          <PlusCircle className='h-4 w-4 mr-3'/> Add Unit
        </Button>
        </div>
        
        

        {/* --------------------------------- */}
        <FormField control={form.control}
          name="livestock_type_info"
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
                Information about this livestock type
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}/>
          <div className='flex flex-row space-x-4 float-right'>
        <Button variant="default" type="submit">
          Submit
        </Button>
        <Button size="icon" variant="destructive" onClick={handleReset}>
          <Eraser className='h-4 w-4'/> 
        </Button>
          </div>
      </form>



    </Form>
  )
}

export default LivestockTypeForm