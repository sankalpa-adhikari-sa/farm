import React from 'react'
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useDispatch,useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Autocomplete, Divider, FormControl, FormHelperText, IconButton, InputLabel, Typography } from '@mui/material';
import { ActionBtn, BaseButton } from '../../../UI Components/CustomButtom';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {useForm} from 'react-hook-form'
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';
import { DateTimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
function FeedInputInventoryForm(props) {
  const form = useForm()
  const dispatch= useDispatch()
  const notify = ()=>{
    toast.success('Livestock Added', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const onSubmit=(data) =>{
    // const livestockWithId = {
    //   ...data,
    //   livestock_id: uuidv4(), // Generate a UUIDv4 for the employee ID
    // };    
    // dispatch(addLivestock(livestockWithId))
    // form.reset()
    // form.clearErrors();

    // const inputDate = new Date(data.date_time.$d);

    // const formattedDate = inputDate.toISOString();
    // //for django and also in react-hook-form use this as minimum value for date picker
    //     console.log(formattedDate)
    //     console.log(data.date_time.$d)
        console.log(data)
   
    notify()

  }
    
    const theme = useTheme();
    const navigate= useNavigate()
    const ModeStyle = (theme, onLightMode, onDarkMode) => {
      return theme.palette.mode === 'light' ? onLightMode : onDarkMode;
    }

    const {register, 
        control, 
        handleSubmit,
        formState:{errors},
        reset, 
        watch,
        clearErrors} = form
    const watchedFieldValue = watch('quantity')
  const handleReset = (e) => {
    e.preventDefault()
    reset();
    clearErrors();
    navigate("/inventory")
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <form className="FormWrapper" onSubmit={handleSubmit(onSubmit)}>
          <Grid rowSpacing={3} container >
        
            <Grid container item  className="FormGroup">
              <Typography sx={{fontWeight:600}}>Feed and Input Inventory</Typography>
            </Grid>
              <Divider sx={{width:"100%",mt:1,mb:2, mx:0}}  orientation='horizontal' variant='middle' light/>
            <Grid rowSpacing={2} columnSpacing={8} container item >

            <Grid item xs={12} sm={6} className="FormControl">
                    <InputLabel required sx={{mb:1, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.inventory_type}
                                htmlFor="inventory_type" >Inventory Type </InputLabel>
                    <FormControl fullWidth error={!!errors.inventory_type}>

                    <Select name="inventory_type" 
                            
                            fullWidth
                            sx={{height:'40px',mr:1,mt:1,fontSize:14}}
                            defaultValue="feed"
                            {...register('inventory_type',
                            {required:{value:true,
                                      message:"Inventory Type is Required"}}
                            )}
                            >

                      <MenuItem sx={{fontSize:14}} value="feed">Feed</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="input">Input</MenuItem>
                    </Select>
                    <FormHelperText > {errors.inventory_type?.message || "Enter Inventory Type"}</FormHelperText>
                    </FormControl>
                  </Grid>

                {/* -------Form Control------ */}
                <Grid container item xs={12} sm={6} className="FormControl">
                  <Grid item xs={12}>
                    <InputLabel required sx={{mb:1, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.input_name}
                                htmlFor="input_name" >Input Name</InputLabel>
                  </Grid>
                  <Grid item xs={12}>
                  <TextField sx={{p:1, fontSize:14}} 
                            fullWidth 
                            variant='outlined' 
                            type="text" 
                            placeholder='Mixed Feed'
                            InputProps={{
                              sx:{height:'40px'},
                            }}

                            {...register('input_name',
                                        {required: {
                                        value: true,
                                        message: "Input Name is required"}
                                        })
                            } 
                            error={!!errors.input_name} 
                            helperText={errors.input_name?.message || "Enter Input Name"}
                            />
                  </Grid>
                </Grid>

                <Grid container item xs={12} rowSpacing={3} columnSpacing={8} >
                    <Grid container item xs={6} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                        error={!!errors.quantity}
                                        htmlFor="quantity" >Quantity</InputLabel>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField sx={{p:1, fontSize:14}} 
                                        fullWidth 
                                        variant='outlined' 
                                        type="number" 
                                        placeholder='10'
                                        InputProps={{
                                        sx:{height:'40px'},
                                        }}

                                        {...register('quantity',
                                                    {required: {
                                                    value: true,
                                                    message: "Quantity is required"}
                                                    })
                                        } 
                                        error={!!errors.quantity} 
                                        helperText={errors.quantity?.message || "Enter Quantity"}/>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} className="FormControl">
                    <InputLabel required sx={{mb:2, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.unit}
                                htmlFor="unit" >Unit</InputLabel>
                    <FormControl fullWidth error={!!errors.unit}>

                    <Select name="unit" 
                            fullWidth
                            sx={{height:'40px', mt:1, mr:1, fonSize: 14}}
                            defaultValue="kg"
                            {...register('unit',
                            {required:{value:true,
                                      message:" Quantity unit is Required"}}
                            )}
                            >

                      <MenuItem sx={{fontSize: 14}} value="kg">Kg</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="liter">Liter</MenuItem>
                    </Select>
                    <FormHelperText > {errors.unit?.message || "Enter Quantity unit"}</FormHelperText>
                    </FormControl>
                  </Grid>
                
                </Grid>
                <Grid container item xs={12} rowSpacing={3} columnSpacing={8} >
                    <Grid container item xs={6} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                        error={!!errors.quantity}
                                        htmlFor="per_unit_price" >Per Unit Price</InputLabel>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField sx={{p:1, fontSize:14}} 
                                        fullWidth 
                                        variant='outlined' 
                                        type="number" 
                                        placeholder='10'
                                        InputProps={{
                                        sx:{height:'40px'},
                                        }}

                                        {...register('per_unit_price',
                                                    {required: {
                                                    value: true,
                                                    message: "Per unit price is required"}
                                                    })
                                        } 
                                        error={!!errors.per_unit_price} 
                                        helperText={errors.per_unit_price?.message || "Enter per unit price"}/>
                        </Grid>
                    </Grid>

                    <Grid container item xs={6} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel  error={!!errors.addition_date} required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                        htmlFor="addition_date" >Stocking Date</InputLabel>
                        </Grid>

                        <Grid item xs={12}>
                        <Controller
                            name="addition_date"
                            control={control}
                            // defaultValue={null}
                            // defaultValue={dayjs(new Date())}
                            rules={{
                               required:"Addition date is required"
                                
                            }}
                            render={({field}) =>(
                                    <DateTimePicker 
                                      // defaultValue={dayjs(new Date())}
                                      minDate={dayjs("2023-07-17T15:30")}
                                      maxDate={dayjs(new Date())}
                                      required
                                      sx={{width:"100%"}}
                                      InputProps={{sx:{height:'40px'}}}
                                      value={field.value|| null}  
                                      control={control}
                                      onChange={event => field.onChange(event)}
                                      slotProps={{ textField: { size:"small", 
                                          error: Boolean(errors.addition_date), 
                                          helperText: errors.addition_date?.message|| "Enter addition date" } }}
                                     
                                    />
                            )}
                        />

                      </Grid>
                    </Grid>

                    
                
                </Grid>

                <Grid container item xs={12} sm={6} className="FormControl">
                  <Grid item xs={12}>
                      <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white")}}
                                  error={!!errors.alert_level}
                                  htmlFor="alert_level" >Alert Level</InputLabel>
                  </Grid>

                  <Grid item xs={12}>
                      <TextField  
                                  fullWidth 
                                  variant='outlined' 
                                  type="number" 
                                  placeholder='10'
                                  InputProps={{
                                  sx:{height:'40px'},
                                  }}

                                  {...register('alert_level',
                                              {required: {
                                              value: true,
                                              message: "Alert Level is required"}
                                              })
                                  } 
                                  // disabled={!watchedFieldValue}
                                  error={!!errors.alert_level} 
                                  helperText={errors.alert_level?.message || "Enter Alert Level"}/>
                  </Grid>
                </Grid>

                
               
                  {/* -------Form Control------ */}
                  <Grid item xs={12} sm={6} className="FormControl">
                    <InputLabel required sx={{mb:2, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.storage_location}
                                htmlFor="storage_location" >Storage Location </InputLabel>
                    <FormControl fullWidth error={!!errors.storage_location}>

                    <Select name="storage_location" 
                            fullWidth
                            sx={{height:'40px',mt:1, mr:1, fontSize:14}}
                            defaultValue="warehouse_1"
                            {...register('storage_location',
                            {required:{value:true,
                                      message:"Storage Location is Required"}}
                            )}
                            >

                      <MenuItem sx={{fontSize: 14}} value="warehouse_1">Warehouse 1</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="warehouse_2">Warehouse 2</MenuItem>
                    </Select>
                    <FormHelperText > {errors.storage_location?.message || "Enter Storage Location"}</FormHelperText>
                    </FormControl>
                  
                  </Grid>
                  <Grid container item xs={12} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white")}}
                                        error={!!errors.details}
                                        htmlFor="details" >Details</InputLabel>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField sx={{p:1, fontSize:14}} 
                                        fullWidth 
                                        variant='outlined' 
                                        type="text" 
                                        placeholder='Details'
                                        multiline

                                        {...register('details',
                                                    {required: {
                                                    value: true,
                                                    message: "Details is required"}
                                                    })
                                        } 
                                        error={!!errors.details} 
                                        helperText={errors.details?.message || "Enter Details"}/>
                        </Grid>
                    </Grid>
            </Grid>
          

          
            <Grid container item spacing={{xs:8, sm:8}} direction="row" justifyContent='flex-end' className="FormButtonWrapper">
              <Grid item>
                <BaseButton  type='submit' variant='contained' color='success' size='small' >Submit</BaseButton>
              </Grid>
              <Grid item>
                <BaseButton variant='contained' color='error' size='small' onClick={handleReset}> Cancel </BaseButton>
              </Grid>
            </Grid>
        </Grid>
      </form>
      </LocalizationProvider>
  )
}

export default FeedInputInventoryForm