import React from 'react'
import Button from '../../../UI Components/Button';
import { MdDelete, MdOutlineCleaningServices} from 'react-icons/md'
import { GiBroom} from 'react-icons/gi'
import { useDispatch,useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Autocomplete, FormControl, FormHelperText, IconButton, InputLabel } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';
function LivestockForm(props) {
  const dispatch= useDispatch()
  const livestock = useSelector(state => state.livestock.Livestock_Info);
  const DamOptions= livestock.map((items)=>{
   return({label:items.tag_no, id:items.livestock_id})
  })
  console.log("Livestock",livestock)
  console.log(DamOptions)

  const {register, control, handleSubmit,formState:{errors},reset, clearErrors}= props.form
  const handleReset = (e) => {
    e.preventDefault()
    reset();
    clearErrors();
  }
  return (

        <form className="FormWrapper" onSubmit={handleSubmit(props.onSubmit)}>
          <Grid container >
          {/* -------Form Control------ */}
            <Grid container item  className="FormGroup">
              <div className="FormStep">Basic Information</div>
            </Grid>
            <Grid rowSpacing={3} columnSpacing={8} container item >
                {/* -------Form Control------ */}
                <Grid container item xs={12} md={6} className="FormControl">
                  <Grid item xs={12}>
                    <InputLabel required sx={{mb:2, color:"black", fontWeight:500}}
                                error={!!errors.tag_no}
                                htmlFor="tag_no" >Tag Number</InputLabel>
                  </Grid>
                  <Grid item xs={12}>
                  <TextField sx={{m:1}} 
                            fullWidth 
                            variant='outlined' 
                            type="text" 
                            id='tag_no'
                            placeholder='A001'
                            InputProps={{
                              sx:{height:'40px'},
                              endAdornment:
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    <VisibilityOff />
                                    {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                                  </IconButton>
                                </InputAdornment>
                            
                            }}

                            {...register('tag_no',
                                        {required: {
                                        value: true,
                                        message: "Tagnumber is required"}
                                        })
                            } 
                            error={!!errors.tag_no} 
                            helperText={errors.tag_no?.message || "Enter Tag number"}/>
                  </Grid>
                </Grid>

                {/* -------Form Control------ */}
                <Grid item xs={12} md={6} className="FormControl">
                  <InputLabel required sx={{mb:2, color:"black", fontWeight:500}}
                                error={!!errors.color}
                                htmlFor="color" >Color</InputLabel>
                  <TextField type="text"
                             id='color'
                             sx={{m:1}} 
                             fullWidth 
                             variant='outlined'  
                             placeholder='Color'
                             InputProps={{
                             sx:{height:'40px'}}}
                             {...register('color',
                                          {required: {
                                          value: true,
                                          message: "Color is required"}
                                          })
                             }
                             error={!!errors.color} 
                             helperText={errors.color?.message || "Enter color"} 
                             />
                </Grid>

               
                  {/* -------Form Control------ */}
                  <Grid item xs={12} md={6} className="FormControl">
                    <InputLabel required sx={{mb:2, color:"black", fontWeight:500}}
                                error={!!errors.breed}
                                htmlFor="breed" >Breed</InputLabel>
                    <TextField type="text"
                             id='color'
                             sx={{m:1}} 
                             fullWidth 
                             variant='outlined'  
                             placeholder='Breed'
                             InputProps={{
                             sx:{height:'40px'}}}
                            {...register('breed',
                                        {required: {
                                        value: true,
                                        message: "Breed is required"}
                                        })
                                  
                            }
                            error={!!errors.breed} 
                            helperText={errors.breed?.message || "Enter breed"}
                            />
                    {errors.breed ? <p className='ErrorClass'>{errors.breed?.message}</p>: null}  
                  </Grid>
                  {/* -------Form Control------ */}
                  <Grid item xs={12} md={6} className="FormControl">
                    <InputLabel required sx={{mb:2, color:"black", fontWeight:500}}
                                error={!!errors.cattle_type}
                                htmlFor="cattle_type" >Cattle Type </InputLabel>
                    <FormControl fullWidth error={!!errors.cattle_type}>

                    <Select name="cattle_type" 
                            id="cattle_type"
                            fullWidth
                            sx={{height:'40px', m:1}}
                            defaultValue="poultry"
                            {...register('cattle_type',
                            {required:{value:true,
                                      message:"Cattle Type is Required"}}
                            )}
                            >

                      <MenuItem value="cows/buffalo">Cows/Buffalo</MenuItem>
                      <MenuItem value="poultry">Poultry</MenuItem>
                    </Select>
                    <FormHelperText > {errors.cattle_type?.message || "Enter Cattle Type"}</FormHelperText>
                    </FormControl>
                    {errors.cattle_type ? <p className='ErrorClass'>{errors.cattle_type?.message}</p>: null}  
                  </Grid>
         
                
                {/* -------Form Control------ */}
                <Grid item xs={12} md={6} className="FormControl">
                  <InputLabel required sx={{mb:2, color:"black", fontWeight:500}}
                                error={!!errors.gender}
                                htmlFor="gender">Gender</InputLabel>
                  <FormControl fullWidth error={!!errors.gender}>
                  <Select name="gender" 
                          id="gender"
                          fullWidth
                          sx={{height:'40px', m:1}}
                          defaultValue="female"
                          {...register('gender',
                          {required:{value:true,
                                    message:"Gender is Required"}}
                          )}>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                  <FormHelperText > {errors.gender?.message || "Enter Gender Type"}</FormHelperText>
                  </FormControl>
                  {errors.gender ? <p className='ErrorClass'>{errors.gender?.message}</p>: null}  
                </Grid>
              
                {/* -------Form Control------ */}
                {livestock.length >0 && 
                    (<Grid item xs={12} md={6} className="FormControl">
                    <InputLabel sx={{mb:2, color:"black", fontWeight:500}}
                                error={!!errors.dam_id}
                                htmlFor="dam_id">Dam</InputLabel>
                    {/* <FormControl style={{height:}}> */}

                    <Controller name="dam_id" 
                      control={control} 
                      render={({ field }) => { 
                        const {onChange,value,ref} = field;
                        return(
                          <Autocomplete 
                          size='small'
                          slotProps={{ textField: { size:"small", }}}
                          // sx={{'& .MuiInputBase-root': {
                          //   height: '40px',
                            
                          // },}}
                         
                          value={value ? DamOptions.find((option) => 
                                                {return value === option.id})?? null : null}
                                                
                                                getOptionLabel={(option) => option.label}
                                                onChange={(event,newValue) =>{
                                                  onChange(newValue? newValue.id:null)
                                                }}
                                                options={DamOptions}
                                                renderInput={(params) => (
                            <TextField sx={{m:1}} 
                                  fullWidth 
                                 
                                  InputProps={{
                                  sx:{height:'40px'}}}
                                  InputLabelProps={{
                                    sx:{marginBottom:"10px"}
                                  }}
                                  {...params}
                                  label="Dam"
                                  variant='outlined'
                                  
                                  helperText="Enter Dam Tag if any"/>
                          )} />)
                      }} />
                    {/* </FormControl> */}
                    
                    
                  </Grid>)
                }
                
               
                

              
            </Grid>
          

          
            <Grid container item spacing={{xs:8, sm:15}} direction="row" justifyContent='flex-end' className="FormButtonWrapper">
              <Grid item>
                <Button size="sm">{props.submitBtnText}</Button>
              </Grid>
              <Grid item>
                <Button onClick={handleReset} size="sm" variant="warning" icon={<GiBroom fontSize={16} color='white'/>} />
              </Grid>
            </Grid>
        </Grid>
      </form>
   
  )
}

export default LivestockForm