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
function WarehouseForm(props) {
  //Themeing
  const theme = useTheme();
  const ModeStyle = (theme, onLightMode, onDarkMode) => {
    return theme.palette.mode === 'light' ? onLightMode : onDarkMode;
  }
  //React-Hook-Form
  const {register, 
    control, 
    handleSubmit,
    formState:{errors},
    reset, 
    watch,
    clearErrors} = props.form()

  const navigate= useNavigate()
  const dispatch= useDispatch()
  const handleReset = (e) => {
    e.preventDefault()
    reset();
    clearErrors();
    navigate("/inventory")
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <form className="FormWrapper" onSubmit={handleSubmit(props.onSubmit)}>
          <Grid rowSpacing={3} container >
        
            <Grid container item  className="FormGroup">
              <Typography sx={{fontWeight:600}}>Warehouse</Typography>
            </Grid>
              <Divider sx={{width:"100%",mt:1,mb:2, mx:0}}  orientation='horizontal' variant='middle' light/>
            <Grid rowSpacing={2} columnSpacing={8} container item >



                {/* -------Form Control------ */}
                <Grid container item xs={12} sm={6} className="FormControl">
                  <Grid item xs={12}>
                    <InputLabel required sx={{mb:1, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.warehouse_name}
                                htmlFor="warehouse_name" >Warehouse Name</InputLabel>
                  </Grid>
                  <Grid item xs={12}>
                  <TextField sx={{p:1, fontSize:14}} 
                            fullWidth 
                            variant='outlined' 
                            type="text" 
                            placeholder='Green Container'
                            InputProps={{
                              sx:{height:'40px'},
                            }}

                            {...register('warehouse_name',
                                        {required: {
                                        value: true,
                                        message: "Warehouse Name is required"}
                                        })
                            } 
                            error={!!errors.warehouse_name} 
                            helperText={errors.warehouse_name?.message || "Enter Warehouse Name"}
                            />
                  </Grid>
                </Grid>

                    <Grid container item xs={12} sm={6} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                        error={!!errors.warehouse_tag}
                                        htmlFor="warehouse_tag" >Warehouse Tag</InputLabel>
                        </Grid>

                        <Grid item xs={12} >
                            <TextField sx={{p:1, fontSize:14}} 
                                        fullWidth 
                                        variant='outlined' 
                                        type="text" 
                                        placeholder='W105'
                                        InputProps={{
                                        sx:{height:'40px'},
                                        }}

                                        {...register('warehouse_tag',
                                                    {required: {
                                                    value: true,
                                                    message: "Warehouse Tag is required"},
                                                  
                                                    })
                                        } 
                                        error={!!errors.warehouse_tag} 
                                        helperText={errors.warehouse_tag?.message || "Enter Warehouse Tag"}/>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} sm={6} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel  error={!!errors.addition_date} required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                        htmlFor="establishment_date" >Establishment</InputLabel>
                        </Grid>

                        <Grid item xs={12}>
                        <Controller
                            name="establishment_date"
                            control={control}
                            defaultValue={dayjs(new Date())}
                            rules={{
                               required:"Establishment date is required"
                                
                            }}
                            render={({field}) =>(
                                    <DateTimePicker 
                                      defaultValue={dayjs(new Date())}
                                      minDate={dayjs("2023-07-17T15:30")}
                                      maxDate={dayjs(new Date())}
                                      required
                                      sx={{width:"100%"}}
                                      InputProps={{sx:{height:'40px'}}}
                                      value={field.value|| null}  
                                      control={control}
                                      onChange={event => field.onChange(event)}
                                      slotProps={{ textField: { size:"small", 
                                          error: Boolean(errors.establishment_date), 
                                          helperText: errors.establishment_date?.message|| "Enter Establishment date" } }}
                                     
                                    />
                            )}
                        />

                      </Grid>
                    </Grid>

                    
                
                

                <Grid container item xs={12} sm={6} className="FormControl">
                  <Grid item xs={12}>
                      <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white")}}
                                  error={!!errors.loaction}
                                  htmlFor="loaction" >Warehouse Address</InputLabel>
                  </Grid>

                  <Grid item xs={12}>
                      <TextField  
                                  fullWidth 
                                  variant='outlined' 
                                  type="text" 
                                  placeholder='Butwal-13,Rupandehi'
                                  InputProps={{
                                  sx:{height:'40px'},
                                  }}

                                  {...register('loaction',
                                              {required: {
                                              value: true,
                                              message: "Address is required"},
                                            
                                              })
                                  } 
                                  // disabled={!watchedFieldValue}
                                  error={!!errors.loaction} 
                                  helperText={errors.loaction?.message || "Enter Address"}/>
                  </Grid>
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

export default WarehouseForm