import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"

import { useDispatch,useSelector } from 'react-redux';


import { v4 as uuidv4 } from 'uuid';
import { addLivestock, updateLivestock } from '../../../Features/Livestock/LivestockSlice';
import { useParams } from 'react-router-dom';
import { useWatch,useForm } from 'react-hook-form';
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAddLivestockData, useLivestockByID, useLivestock, useUpdateLivestockByID } from '@/hooks/useLivestockData';
import { useLivestockType } from '@/hooks/useLivestockTypeData';




function LivestockForm(props) {

//getting livestock_type data for form
  const l_type_Query= useLivestockType()
  const type= l_type_Query.data?l_type_Query.data.map(item => ({
    label: item.type,
    value:item.id
  })):[]
  //getting dam_id for form
  const dam_id_Query= useLivestock()
  const DamOptions=  dam_id_Query.data?dam_id_Query.data.map(item => ({
    label: item.livestock_tag_no,
    value:item.id
  })):[]

  //getting current livestock data for update mode
  const { id } = useParams();
  const current_livestock=  dam_id_Query.data?dam_id_Query.data.find(item => (item.id === id )):[]
  const form = useForm(
    (props.isUpdate) ? { 
      defaultValues: current_livestock
    } : {defaultValues: {
      
      livestock_tag_no:"",
      livestock_colour:"",
      livestock_breed:"",
      livestock_details:"",
      livestock_gender:"male"

        }}
  );
const {mutate:addLivestockData}= useAddLivestockData()
const {mutate:updateLivestockData}= useUpdateLivestockByID()
const onSubmitForm=(data) => {
  if (props.isUpdate){
    const updatedLivestock= {
      ...current_livestock,
      ...data
    }
      // dispatch(updateLivestock(updatedLivestock))
      console.log(updatedLivestock)
      console.log("current livestock,",current_livestock)
      updateLivestockData(id,updateLivestock)

  }
  else {
    addLivestockData(data)
    // dispatch(addLivestock(data));
    form.reset();
    form.clearErrors();
  
  }
  
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
        name="livestock_tag_no"
        rules={{
          required:"Livestock Tag Number is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Tag No</FormLabel>
            <FormControl>
              <Input placeholder="A001"
              {...field} />
            </FormControl>
            <FormDescription className="text-xs">
            Tag Number for Livestock Indentification
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>
      {/* --------------------------------- */}
      <FormField  control={form.control}
        name="livestock_colour"
        rules={{
          required:"Livestock Color is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Color</FormLabel>
            <FormControl>
              <Input placeholder="Brown"
              {...field} />
            </FormControl>
            <FormDescription className="text-xs">
            Colour of livestock
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>
      {/* --------------------------------- */}
      <FormField  control={form.control}
        name="livestock_breed"
        rules={{
          required:"Livestock Breed is required"
       }}
        render={({field}) =>(
          <FormItem >
            <FormLabel>Breed</FormLabel>
            <FormControl>
              <Input placeholder="Jersey"
              {...field} />
            </FormControl>
            <FormDescription className="text-xs">
            Breed of Livestock
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>

<FormField
          control={form.control}
          name="livestock_gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                Gender of livestock
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

      {/* --------------------------------- */}
      <FormField  control={form.control}
        name="livestock_details"
        render={({field}) =>(
          <FormItem >
            <FormLabel>Details</FormLabel>
            <FormControl>
              <Input placeholder="Details..."
              {...field} />
            </FormControl>
            <FormDescription className="text-xs">
            Information related to livestock
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}/>
         <FormField
          control={form.control}
          name="livestock_type"
          rules={{
            required:"Type is required"            
         }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Livestock Type</FormLabel>
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
                        : "Select Livestock Type"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Livestock Type..." />
                    <CommandEmpty>No Livestock type found.</CommandEmpty>
                    <CommandGroup>
                    <ScrollArea className="h-72 w-48">
                      {type.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            form.setValue("livestock_type", option.value)
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
        {DamOptions.length >0 && (
          <FormField
          control={form.control}
          name="dam_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Dam</FormLabel>
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
                        ? DamOptions.find(
                            (dam_option) => dam_option.value === field.value
                          )?.label
                        : "Select Dam"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Dam ..." />
                    <CommandEmpty>No Dam found.</CommandEmpty>
                    <CommandGroup>
                    <ScrollArea className="h-72 w-48">
                      {DamOptions.map((dam_option) => (
                        <CommandItem
                          value={dam_option.label}
                          key={dam_option.value}
                          onSelect={() => {
                            form.setValue("dam_id", dam_option.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              dam_option.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {dam_option.label}
                        </CommandItem>
                      ))}
                      </ScrollArea>

                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription className="text-xs">
                This is the Dam that will be used in the dashboard.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        )}
      
      

     
      <Button type="submit">
        {props.submitBtnText}
      </Button>
      <Button variant="destructive" onClick={handleReset}>
        clear
      </Button>
    </form>



  </Form>

      //   <form className="FormWrapper" onSubmit={handleSubmit(onSubmitForm)}>
      //     <Grid container >
      //     {/* -------Form Control------ */}
      //       <Grid container item  className="FormGroup">
      //         <div className="FormStep">Basic Information</div>
      //       </Grid>
      //       <Grid rowSpacing={3} columnSpacing={8} container item >
      //           {/* -------Form Control------ */}
      //           <Grid container item xs={12} md={6} className="FormControl">
      //             <Grid item xs={12}>
      //               <InputLabel required sx={{mb:2, color:"black", fontWeight:500}}
      //                           error={!!errors.tag_no}
      //                           htmlFor="tag_no" >Tag Number</InputLabel>
      //             </Grid>
      //             <Grid item xs={12}>
      //             <TextField sx={{m:1}} 
      //                       fullWidth 
      //                       variant='outlined' 
      //                       type="text" 
      //                       id='tag_no'
      //                       placeholder='A001'
      //                       InputProps={{
      //                         sx:{height:'40px'},
      //                         endAdornment:
      //                           <InputAdornment position="end">
      //                             <IconButton
      //                               aria-label="toggle password visibility"
      //                               // onClick={handleClickShowPassword}
      //                               // onMouseDown={handleMouseDownPassword}
      //                               edge="end"
      //                             >
      //                               <VisibilityOff />
      //                               {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
      //                             </IconButton>
      //                           </InputAdornment>
                            
      //                       }}

      //                       {...register('tag_no',
      //                                   {required: {
      //                                   value: true,
      //                                   message: "Tagnumber is required"}
      //                                   })
      //                       } 
      //                       error={!!errors.tag_no} 
      //                       helperText={errors.tag_no?.message || "Enter Tag number"}/>
      //             </Grid>
      //           </Grid>

      //           {/* -------Form Control------ */}
      //           <Grid item xs={12} md={6} className="FormControl">
      //             <InputLabel required sx={{mb:2, color:"black", fontWeight:500}}
      //                           error={!!errors.color}
      //                           htmlFor="color" >Color</InputLabel>
      //             <TextField type="text"
      //                        id='color'
      //                        sx={{m:1}} 
      //                        fullWidth 
      //                        variant='outlined'  
      //                        placeholder='Color'
      //                        InputProps={{
      //                        sx:{height:'40px'}}}
      //                        {...register('color',
      //                                     {required: {
      //                                     value: true,
      //                                     message: "Color is required"}
      //                                     })
      //                        }
      //                        error={!!errors.color} 
      //                        helperText={errors.color?.message || "Enter color"} 
      //                        />
      //           </Grid>

               
      //             {/* -------Form Control------ */}
      //             <Grid item xs={12} md={6} className="FormControl">
      //               <InputLabel required sx={{mb:2, color:"black", fontWeight:500}}
      //                           error={!!errors.breed}
      //                           htmlFor="breed" >Breed</InputLabel>
      //               <TextField type="text"
      //                        id='color'
      //                        sx={{m:1}} 
      //                        fullWidth 
      //                        variant='outlined'  
      //                        placeholder='Breed'
      //                        InputProps={{
      //                        sx:{height:'40px'}}}
      //                       {...register('breed',
      //                                   {required: {
      //                                   value: true,
      //                                   message: "Breed is required"}
      //                                   })
                                  
      //                       }
      //                       error={!!errors.breed} 
      //                       helperText={errors.breed?.message || "Enter breed"}
      //                       />
      //               {errors.breed ? <p className='ErrorClass'>{errors.breed?.message}</p>: null}  
      //             </Grid>
      //             {/* -------Form Control------ */}
      //             <Grid item xs={12} md={6} className="FormControl">
      //               <InputLabel required sx={{mb:2, color:"black", fontWeight:500}}
      //                           error={!!errors.cattle_type}
      //                           htmlFor="cattle_type" >Cattle Type </InputLabel>
      //               <FormControl fullWidth error={!!errors.cattle_type}>

      //               <Select name="cattle_type" 
      //                       id="cattle_type"
      //                       fullWidth
      //                       sx={{height:'40px', m:1}}
      //                       defaultValue="poultry"
      //                       {...register('cattle_type',
      //                       {required:{value:true,
      //                                 message:"Cattle Type is Required"}}
      //                       )}
      //                       >

      //                 <MenuItem value="cows/buffalo">Cows/Buffalo</MenuItem>
      //                 <MenuItem value="poultry">Poultry</MenuItem>
      //               </Select>
      //               <FormHelperText > {errors.cattle_type?.message || "Enter Cattle Type"}</FormHelperText>
      //               </FormControl>
      //               {errors.cattle_type ? <p className='ErrorClass'>{errors.cattle_type?.message}</p>: null}  
      //             </Grid>
         
                
      //           {/* -------Form Control------ */}
      //           <Grid item xs={12} md={6} className="FormControl">
      //             <InputLabel required sx={{mb:2, color:"black", fontWeight:500}}
      //                           error={!!errors.gender}
      //                           htmlFor="gender">Gender</InputLabel>
      //             <FormControl fullWidth error={!!errors.gender}>
      //             <Select name="gender" 
      //                     id="gender"
      //                     fullWidth
      //                     sx={{height:'40px', m:1}}
      //                     defaultValue="female"
      //                     {...register('gender',
      //                     {required:{value:true,
      //                               message:"Gender is Required"}}
      //                     )}>
      //               <MenuItem value="male">Male</MenuItem>
      //               <MenuItem value="female">Female</MenuItem>
      //             </Select>
      //             <FormHelperText > {errors.gender?.message || "Enter Gender Type"}</FormHelperText>
      //             </FormControl>
      //             {errors.gender ? <p className='ErrorClass'>{errors.gender?.message}</p>: null}  
      //           </Grid>
              
      //           {/* -------Form Control------ */}
      //           {livestock.length >0 && 
      //               (<Grid item xs={12} md={6} className="FormControl">
      //               <InputLabel sx={{mb:2, color:"black", fontWeight:500}}
      //                           error={!!errors.dam_id}
      //                           htmlFor="dam_id">Dam</InputLabel>
      //               {/* <FormControl style={{height:}}> */}

      //               <Controller name="dam_id" 
      //                 control={control} 
      //                 render={({ field }) => { 
      //                   const {onChange,value,ref} = field;
      //                   return(
      //                     <Autocomplete 
      //                     size='small'
      //                     slotProps={{ textField: { size:"small", }}}
      //                     // sx={{'& .MuiInputBase-root': {
      //                     //   height: '40px',
                            
      //                     // },}}
                         
      //                     value={value ? DamOptions.find((option) => 
      //                                           {return value === option.id})?? null : null}
                                                
      //                                           getOptionLabel={(option) => option.label}
      //                                           onChange={(event,newValue) =>{
      //                                             onChange(newValue? newValue.id:null)
      //                                           }}
      //                                           options={DamOptions}
      //                                           renderInput={(params) => (
      //                       <TextField sx={{m:1}} 
      //                             fullWidth 
                                 
      //                             InputProps={{
      //                             sx:{height:'40px'}}}
      //                             InputLabelProps={{
      //                               sx:{marginBottom:"10px"}
      //                             }}
      //                             {...params}
      //                             label="Dam"
      //                             variant='outlined'
                                  
      //                             helperText="Enter Dam Tag if any"/>
      //                     )} />)
      //                 }} />
      //               {/* </FormControl> */}
                    
                    
      //             </Grid>)
      //           }
                
               
                

              
      //       </Grid>
          

          
      //       <Grid container item spacing={{xs:8, sm:15}} direction="row" justifyContent='flex-end' className="FormButtonWrapper">
      //         <Grid item>
      //           <Button >{props.submitBtnText}</Button>
      //         </Grid>
      //         <Grid item>
      //           <Button onClick={handleReset} >clean</Button>
      //         </Grid>
      //       </Grid>
      //   </Grid>
      // </form>
   
  )
}

export default LivestockForm