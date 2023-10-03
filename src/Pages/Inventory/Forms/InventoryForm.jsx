import React from 'react'
import { useTheme } from '@mui/material/styles';
import { useDispatch,useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Autocomplete, FormControl, FormHelperText, IconButton, InputLabel } from '@mui/material';
import { ActionBtn, BaseButton } from '../../../UI Components/CustomButtom';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function InventoryForm(props) {
    const theme = useTheme();
    const ModeStyle = (theme, onLightMode, onDarkMode) => {
      return theme.palette.mode === 'light' ? onLightMode : onDarkMode;
    }

    const {register, 
        control, 
        handleSubmit,
        formState:{errors},
        reset, 
        clearErrors} = props.form
  const handleReset = (e) => {
    e.preventDefault()
    reset();
    clearErrors();
  }
  return (
    <form className="FormWrapper" onSubmit={handleSubmit(props.onSubmit)}>
          <Grid container >
        
            <Grid container item  className="FormGroup">
              <div className="FormStep">Basic Information</div>
            </Grid>
            <Grid rowSpacing={2} columnSpacing={8} container item >

            <Grid item xs={12} md={6} className="FormControl">
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
                <Grid container item xs={12} md={6} className="FormControl">
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

                <Grid container item xs={6} className="FormControl">
                  <Grid item xs={12}>
                      <InputLabel required sx={{mb:2,fontSize:14, color: ModeStyle(theme,"black","white")}}
                                  error={!!errors.alert_level}
                                  htmlFor="alert_level" >Alert Level</InputLabel>
                  </Grid>

                  <Grid item xs={12}>
                      <TextField sx={{p:1, fontSize:14, color: ModeStyle(theme,"black","white")}} 
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
                                  error={!!errors.alert_level} 
                                  helperText={errors.alert_level?.message || "Enter Alert Level"}/>
                  </Grid>
                </Grid>

                
               
                  {/* -------Form Control------ */}
                  <Grid item xs={12} md={6} className="FormControl">
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
                  <Grid container item xs={6} className="FormControl">
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
                <BaseButton type='submit' variant='contained' color='success' size='small' >Submit</BaseButton>
              </Grid>
              <Grid item>
                <BaseButton variant='contained' color='error' size='small' onClick={handleReset}> Cancel </BaseButton>
              </Grid>
            </Grid>
        </Grid>
      </form>
  )
}

export default InventoryForm