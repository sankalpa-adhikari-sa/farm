import React from 'react'
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useDispatch,useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Autocomplete, Divider, FormHelperText, IconButton, InputAdornment, InputLabel, Typography } from '@mui/material';
import { ActionBtn, BaseButton } from '../../../UI Components/CustomButtom';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {useForm, useWatch} from 'react-hook-form'
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';
import { DateTimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
function EquipmentInventoryForm(props) {
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
    restField,
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
  const ownership = useWatch({ control, name: 'ownership', defaultValue: 'purchased' });
  const subsidy = useWatch({ control, name: 'subsidy', defaultValue: 'no' });
  const insurance = useWatch({ control, name: 'insurance', defaultValue: 'no' });
   console.log(ownership)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <form className="FormWrapper" onSubmit={handleSubmit(props.onSubmit)}>
          <Grid rowSpacing={3} container >
        
            <Grid container item  className="FormGroup">
              <Typography sx={{fontWeight:600}}>Equipment Inventory</Typography>
            </Grid>
              <Divider sx={{width:"100%",mt:1,mb:2, mx:0}}  orientation='horizontal' variant='middle' light/>
            <Grid rowSpacing={2} columnSpacing={{sm:8}} container item >

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
                            placeholder='Tractor'
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
                
            <Grid item xs={12} sm={6} className="FormControl">
                    <InputLabel required sx={{mb:1, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.operation_type}
                                htmlFor="operation_type" >Operation Type </InputLabel>
                    <FormControl fullWidth error={!!errors.operation_type}>

                    <Select name="operation_type" 
                            
                            fullWidth
                            sx={{height:'40px',mr:1,mt:1,fontSize:14}}
                            defaultValue="diesel"
                            {...register('operation_type',
                            {required:{value:true,
                                      message:"Operation Type is Required"}}
                            )}
                            >

                      <MenuItem sx={{fontSize:14}} value="electric">Electric</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="diesel">Diesel</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="pertrol">Petrol</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="Manual">Manual</MenuItem>
                    </Select>
                    <FormHelperText > {errors.operation_type?.message || "Enter Operation Type"}</FormHelperText>
                    </FormControl>
                  </Grid>

                

                <Grid container item xs={12} rowSpacing={3} columnSpacing={8} >
                    <Grid container item xs={12} sm={6} className="FormControl">
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
                                                    message: "Quantity is required"},
                                                    valueAsNumber:true
                                                    },
                                                    )
                                        } 
                                        error={!!errors.quantity} 
                                        helperText={errors.quantity?.message || "Enter Quantity"}/>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} sm={6} className="FormControl">
                  <Grid item xs={12}>
                    <InputLabel required sx={{mb:1, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.vendor}
                                htmlFor="vendor" >Vendor</InputLabel>
                  </Grid>
                  <Grid item xs={12}>
                  <TextField sx={{p:1, fontSize:14}} 
                            fullWidth 
                            variant='outlined' 
                            type="text" 
                            placeholder='Generic AgroMart'
                            InputProps={{
                              sx:{height:'40px'},
                            }}

                            {...register('vendor',
                                        {required: {
                                        value: true,
                                        message: "Vender Name is required"}
                                        })
                            } 
                            error={!!errors.vendor} 
                            helperText={errors.vendor?.message || "Enter Vender Name"}
                            />
                  </Grid>
                </Grid>
                
                </Grid>
                <Grid container item xs={12} rowSpacing={3} columnSpacing={{xs:3,sm:8}} >
                    <Grid container item xs={6} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                        error={!!errors.company}
                                        htmlFor="company" >Company</InputLabel>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField sx={{p:1, fontSize:14}} 
                                        fullWidth 
                                        name="company"
                                        variant='outlined' 
                                        type="text" 
                                        placeholder='Mahendra'
                                        InputProps={{
                                        sx:{height:'40px'},
                                        }}

                                        {...register('company',
                                                    {required: {
                                                    value: true,
                                                    message: "Company is required"},
                                                   
                                                    },
                                                    )
                                        } 
                                        error={!!errors.company} 
                                        helperText={errors.company?.message || "Enter Company"}/>
                        </Grid>
                    </Grid>

                    <Grid container item xs={6} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                        error={!!errors.model}
                                        htmlFor="model" >Model</InputLabel>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField sx={{p:1, fontSize:14}} 
                                        fullWidth 
                                        variant='outlined' 
                                        type="text" 
                                        placeholder='Titan RS'
                                        InputProps={{
                                        sx:{height:'40px'},
                                        }}

                                        {...register('model',
                                                    {required: {
                                                    value: true,
                                                    message: "Model is required"},
                                                   
                                                    },
                                                    )
                                        } 
                                        error={!!errors.model} 
                                        helperText={errors.model?.message || "Enter Model"}/>
                        </Grid>
                    </Grid>


                
                </Grid>
                <Grid container item xs={12} rowSpacing={3} columnSpacing={{xs:4,sm:8}} >
                    <Grid container item xs={6} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                        error={!!errors.number_plate}
                                        htmlFor="number_plate" >Number Plate</InputLabel>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField sx={{p:1, fontSize:14}} 
                                        fullWidth 
                                        variant='outlined' 
                                        type="text" 
                                        placeholder='Ba 1 kha 2222'
                                        InputProps={{
                                        sx:{height:'40px'},
                                        }}

                                        {...register('number_plate',
                                                    {required: {
                                                    value: true,
                                                    message: "Number plate is required"},
                                                   
                                                    })
                                        } 
                                        error={!!errors.number_plate} 
                                        helperText={errors.number_plate?.message || "Enter Number Plate"}/>
                        </Grid>
                    </Grid>

                    <Grid container item xs={6} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel  error={!!errors.addition_date} required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                        htmlFor="addition_date" >Acquired Date</InputLabel>
                        </Grid>

                        <Grid item xs={12}>
                        <Controller
                            name="addition_date"
                            control={control}
                            defaultValue={dayjs(new Date())}
                            rules={{
                               required:"Acquired date is required"
                                
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
                                          error: Boolean(errors.addition_date), 
                                          helperText: errors.addition_date?.message|| "Enter Acquired date" } }}
                                     
                                    />
                            )}
                        />

                      </Grid>
                    </Grid>
                </Grid>

                {/* -------Form Control------ */}
                <Grid container item xs={12} rowSpacing={3} columnSpacing={{xs:4,sm:8}} >
                    <Grid container item xs={6} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                        error={!!errors.cost_price}
                                        htmlFor="cost_price" >Cost Price</InputLabel>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField sx={{p:1, fontSize:14}} 
                                        fullWidth 
                                        variant='outlined' 
                                        type="number" 
                                        placeholder='30000'
                                        InputProps={{
                                        sx:{height:'40px'},
                                        }}

                                        {...register('cost_price',
                                                    {required: {
                                                    value: true,
                                                    message: "cost price is required"},
                                                    valueAsNumber:true
                                                    },
                                                    )
                                        } 
                                        error={!!errors.cost_price} 
                                        helperText={errors.cost_price?.message || "Enter cost price"}/>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} className="FormControl">
                    <InputLabel required sx={{mb:2, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.currency}
                                htmlFor="currency" >Currency</InputLabel>
                    <FormControl fullWidth error={!!errors.currency}>

                    <Select name="currency" 
                            fullWidth
                            sx={{height:'40px', mt:1, mr:1, fonSize: 14}}
                            defaultValue="npr"
                            {...register('currency',
                            {required:{value:true,
                                      message:"  currency is Required"}}
                            )}
                            >

                      <MenuItem sx={{fontSize: 14}} value="npr">NPR</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="inr">INR</MenuItem>
                    </Select>
                    <FormHelperText > {errors.currency?.message || "Enter  currency"}</FormHelperText>
                    </FormControl>
                  </Grid>
                
                </Grid>


                 {/* -------Form Control------ */}
                <Grid item xs={12} sm={12} >
                <FormControl  error={!!errors.ownership}>
                  <FormLabel  error={!!errors.ownership} required sx={{mb:2, fontSize:14, color: ModeStyle(theme,"black","white")}} id="demo-row-radio-buttons-group-label">Ownership</FormLabel>
                  <Controller control={control}
                      name="ownership"
                      defaultValue="purchased"
                      rules={{required:"Ownership must be defined"}}
                      render= {({field}) => (
                        <RadioGroup {...field}
                          sx={{height:"45px"}}
                          row
                          defaultValue="purchased"
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          
                        >
                          <FormControlLabel  value="leased" 
                          control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 20,},}} />}
                          label={<span style={{fontSize:"14px"}}>Leased</span>} />
                          <FormControlLabel value="purchased" 
                          control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 20,},}}  />} 
                          label={<span style={{fontSize:"14px"}}>Purchased</span>} />
                        </RadioGroup>

                      )} />
                  
                  <FormHelperText>{errors.ownership?.message || "Ownership of Equipment"}</FormHelperText>
                </FormControl>
                </Grid>

                 {/* -------Form Control------ */}
                <Divider sx={{width:"100%",m:4}}  orientation='horizontal' variant='middle' light/>
                {ownership ==="leased" && 
                <>        
                <Grid container item xs={12} rowSpacing={3} columnSpacing={8} >
                    <Grid container item xs={6} className="FormControl">
                        <Grid item xs={12}>
                            <InputLabel  error={!!errors.lease_deadline} required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                        htmlFor="lease_deadline" >Lease Deadline</InputLabel>
                        </Grid>

                        <Grid item xs={12}>
                        <Controller
                            name="lease_deadline"
                            control={control}
                            // defaultValue={dayjs(new Date())}
                            defaultValue={null}
                            rules={{
                               required:"Lease Deadline is required"
                                
                            }}
                            render={({field}) =>(
                                    <DateTimePicker 
                                      // defaultValue={dayjs(new Date())}
                                     defaultValue={null}
                                      required
                                      sx={{width:"100%"}}
                                      InputProps={{sx:{height:'40px'}}}
                                      value={field.value|| null}  
                                      control={control}
                                      onChange={event => field.onChange(event)}
                                      slotProps={{ textField: { size:"small", 
                                          error: Boolean(errors.lease_deadline), 
                                          helperText: errors.lease_deadline?.message|| "Enter Lease Deadline" } }}
                                     
                                    />
                            )}
                        />

                      </Grid>
                    </Grid>

                    <Grid item xs={6} className="FormControl">
                    <InputLabel required sx={{mb:2, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.charged_by}
                                htmlFor="charged_by" >Charged By</InputLabel>
                    <FormControl fullWidth error={!!errors.charged_by}>

                    <Select name="charged_by" 
                            fullWidth
                            sx={{height:'40px', mt:1, mr:1, fonSize: 14}}
                            defaultValue=""
                            {...register('charged_by',
                            {required:{value:true,
                                      message:"  Charged By is Required"}}
                            )}
                            >

                      <MenuItem sx={{fontSize: 14}} value="hr">Hour</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="day">Day</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="month">Month</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="year">Year</MenuItem>
                    </Select>
                    <FormHelperText > {errors.charged_by?.message || "Enter  Charged By"}</FormHelperText>
                    </FormControl>
                  </Grid>
                
                </Grid>
                <Grid  item xs={6} className="FormControl">
                    <InputLabel required sx={{mb:2, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.lease_status}
                                htmlFor="lease_status" >Lease Status</InputLabel>
                    <FormControl fullWidth error={!!errors.lease_status}>

                    <Select name="lease_status" 
                            fullWidth
                            sx={{height:'40px', mt:1, mr:1, fonSize: 14}}
                            defaultValue=""
                            {...register('lease_status',
                            {required:{value:true,
                                      message:"Lease Status  is Required"}}
                            )}
                            >

                      <MenuItem sx={{fontSize: 14}} value="using">Using</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="returned">Returned</MenuItem>
                      
                    </Select>
                    <FormHelperText > {errors.lease_status?.message || "Enter  Lease Status"}</FormHelperText>
                    </FormControl>
                </Grid>
                  <Grid  item xs={6} className="FormControl">

                  </Grid>
                  </>
                 }

                {ownership ==="purchased" && 

                <>
                <Grid item xs={12} sm={6} className="FormControl">
                    <InputLabel required sx={{mb:2, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.purchase_condition}
                                htmlFor="purchase_condition" >Purchased Condition</InputLabel>
                    <FormControl fullWidth error={!!errors.purchase_condition}>

                    <Select name="purchase_condition" 
                            fullWidth
                            sx={{height:'40px',mt:1, mr:1, fontSize:14}}
                            defaultValue=''
                            {...register('purchase_condition',
                            {required:{value:true,
                                      message:"Purchased Condition is Required"}}
                            )}
                            >

                      <MenuItem sx={{fontSize: 14}} value="new">New</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="old">Old</MenuItem>
                    </Select>
                    <FormHelperText > {errors.purchase_condition?.message || "Enter Purchased Condition"}</FormHelperText>
                    </FormControl>
                  
                  </Grid>

                  <Grid container item xs={12} sm={6} className="FormControl">
                      <Grid item xs={12}>
                          <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white") }}
                                      error={!!errors.servicing_interval}
                                      htmlFor="servicing_interval" >Servicing Interval</InputLabel>
                      </Grid>

                      <Grid item xs={12}>
                          <TextField sx={{p:1, fontSize:14}} 
                                      fullWidth 
                                      variant='outlined' 
                                      type="number" 
                                      placeholder='90'
                                      InputProps={{
                                      sx:{height:'40px'},
                                      endAdornment: <InputAdornment position="start">Days</InputAdornment>
                                      }}
                                      

                                      {...register('servicing_interval',
                                                  {required: {
                                                  value: true,
                                                  message: "Servising Interval is required"},
                                                  valueAsNumber:true
                                                  },
                                                  
                                                  )
                                      } 
                                      error={!!errors.servicing_interval} 
                                      helperText={errors.servicing_interval?.message || "Enter Servicing Interval in days"}/>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} >
                      <FormControl  error={!!errors.subsidy}>
                        <FormLabel  error={!!errors.subsidy} required sx={{mb:2, fontSize:14, color: ModeStyle(theme,"black","white")}} id="demo-row-radio-buttons-group-label">Subsidy</FormLabel>
                        <Controller control={control}
                            name="subsidy"
                            defaultValue="no"
                            rules={{required:"subsidy must be defined"}}
                            render= {({field}) => (
                              <RadioGroup {...field}
                                sx={{height:"45px"}}
                                row
                                defaultValue="no"
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                
                              >
                                <FormControlLabel  value="yes" 
                                control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 20,},}} />}
                                label={<span style={{fontSize:"14px"}}>Yes</span>} />
                                <FormControlLabel value="no" 
                                control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 20,},}}  />} 
                                label={<span style={{fontSize:"14px"}}>No</span>} />
                              </RadioGroup>

                            )} />
                        
                        <FormHelperText>{errors.subsidy?.message || "subsidy of Equipment"}</FormHelperText>
                      </FormControl>
                    </Grid>

                    {subsidy ==="yes" && 
                    
                      <Grid container item xs={12} sm={6} className="FormControl">
                      <Grid item xs={12}>
                        <InputLabel required sx={{mb:1, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                    error={!!errors.input_name}
                                    htmlFor="subsidy_amount" >Subsidy Amount</InputLabel>
                      </Grid>
                      <Grid item xs={12}>
                      <TextField sx={{p:1, fontSize:14}} 
                                fullWidth 
                                variant='outlined' 
                                type="number" 
                                placeholder='50000'
                                InputProps={{
                                  sx:{height:'40px'},
                                }}

                                {...register('subsidy_amount',
                                            {required: {
                                            value: true,
                                            message: "Subsidy Amount is required"},
                                            valueAsNumber:true,
                                            })
                                } 
                                error={!!errors.subsidy_amount} 
                                helperText={errors.subsidy_amount?.message || "Enter Subsidy Amount"}
                                />
                      </Grid>
                    </Grid>
                    
                    }
                    <Grid item xs={12} sm={12} >
                      <FormControl  error={!!errors.insurance}>
                        <FormLabel  error={!!errors.insurance} 
                                    required sx={{mb:2, fontSize:14, color: ModeStyle(theme,"black","white")}} >
                            Insurance
                        </FormLabel>
                        <Controller control={control}
                            name="insurance"
                            defaultValue="no"
                            rules={{required:"Insurance must be defined"}}
                            render= {({field}) => (
                              <RadioGroup {...field}
                                sx={{height:"45px"}}
                                row
                                defaultValue="no"
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                
                              >
                                <FormControlLabel  value="yes" 
                                control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 20,},}} />}
                                label={<span style={{fontSize:"14px"}}>Yes</span>} />
                                <FormControlLabel value="no" 
                                control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 20,},}}  />} 
                                label={<span style={{fontSize:"14px"}}>No</span>} />
                              </RadioGroup>

                            )} />
                        
                        <FormHelperText>{errors.insurance?.message || "Insurance of Equipment"}</FormHelperText>
                      </FormControl>
                    </Grid>

                    {insurance ==="yes" && 
                    <Grid container item xs={12}>
                      <Grid container item xs={12} sm={6} className="FormControl">
                        <Grid item xs={12}>
                          <InputLabel required sx={{mb:1, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                      error={!!errors.insurance_amount}
                                      htmlFor="insurance_amount" >Insurance Amount</InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField sx={{p:1, fontSize:14}} 
                                  fullWidth 
                                  variant='outlined' 
                                  type="number" 
                                  placeholder='4000'
                                  InputProps={{
                                    sx:{height:'40px'},
                                  }}

                                  {...register('insurance_amount',
                                              {required: {
                                              value: true,
                                              message: "Insurance Amount is required"},
                                              valueAsNumber:true,
                                              })
                                  } 
                                  error={!!errors.insurance_amount} 
                                  helperText={errors.insurance_amount?.message || "Enter Insurance Amount"}
                                  />
                        </Grid>
                      </Grid>
                    
                      <Grid container item xs={12} sm={6} className="FormControl">
                      <Grid item xs={12}>
                        <InputLabel required sx={{mb:1, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                    error={!!errors.insurance_number}
                                    htmlFor="insurance_number" >Insurance Number</InputLabel>
                      </Grid>
                        <Grid item xs={12}>
                          <TextField sx={{p:1, fontSize:14}} 
                                fullWidth 
                                variant='outlined' 
                                type="text" 
                                placeholder='A00245034348c534'
                                InputProps={{
                                  sx:{height:'40px'},
                                }}

                                {...register('insurance_number',
                                            {required: {
                                            value: true,
                                            message: "Insurance Number is required"}
                                            })
                                } 
                                error={!!errors.insurance_number} 
                                helperText={errors.insurance_number?.message || "Enter Insurance Number"}
                                />
                        </Grid>
                      </Grid>
                    </Grid>
                    
                    }
                
                
                </>
                }
                 <Divider sx={{width:"100%", m:4}}  orientation='horizontal' variant='middle' light/>
               
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

                  <Grid  item xs={12} sm={6} className="FormControl">
                    <InputLabel required sx={{mb:2, fontSize:14, color: ModeStyle(theme,"black","white")}}
                                error={!!errors.equipment_status}
                                htmlFor="equipment_status" >Equipment Status</InputLabel>
                    <FormControl fullWidth error={!!errors.equipment_status}>

                    <Select name="equipment_status" 
                            fullWidth
                            sx={{height:'40px', mt:1, mr:1, fonSize: 14}}
                            defaultValue="active"
                            {...register('equipment_status',
                            {required:{value:true,
                                      message:"  Equipment Status  is Required"}}
                            )}
                            >

                      <MenuItem sx={{fontSize: 14}} value="active">Active</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="inactive">Inactive</MenuItem>
                      <MenuItem sx={{fontSize:14}} value="maintainance">Maintainance</MenuItem>
                      
                    </Select>
                    <FormHelperText > {errors.equipment_status?.message || "Enter  Equipment Status"}</FormHelperText>
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

export default EquipmentInventoryForm