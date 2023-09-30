import React from 'react'
import Button from '../../../UI Components/Button';
import { MdDelete, MdOutlineCleaningServices} from 'react-icons/md'
import { GiBroom} from 'react-icons/gi'
import { useDispatch,useSelector } from 'react-redux';
import Select from 'react-select'
import { Controller } from 'react-hook-form';
function LivestockForm(props) {
  const dispatch= useDispatch()
  const livestock = useSelector(state => state.livestock.Livestock_Info);

  const DamOptions= livestock.map((items)=>{
   return({label:items.tag_no, value:items.livestock_id})
  })
  console.log(livestock)

  const {register, control, handleSubmit,formState:{errors},reset, clearErrors}= props.form
  const handleReset = (e) => {
    e.preventDefault()
    reset();
    clearErrors();
  }
  const styles = {
    valueContainer: (base) => ({
      ...base,
      // height: 20,
      
      
      justifyContent:"center",
      overflowY: "hidden"
    }),
    control: (base) => ({
      ...base,
      minHeight:20,
      width:"100%",
      ZIndex:10000,
      height:20,
      margin:0,
      padding:0,
      display:"flex",
      flexDirection:"column",
      backgroundColor:"#cbc9c9",
      borderRadius:5,
      justifyContent:"center",
      overflowY: "auto"
    }),
  };

  return (
    <div>
        <form className="FormWrapper" onSubmit={handleSubmit(props.onSubmit)}>
          {/* -------Form Control------ */}
          <div className="FormGroup">

            <div className="FormGroupTitle">
              <div className="FormStep">Basic Information</div>
            <hr className='FormStepUnderline'/>
            </div>

            <div className="FormGroupBody">
              {/* -------Form Control------ */}
              <div className="FormControl">
                <label htmlFor="tag_no">Tag Number</label>
                <input type="text" id='tag_no'
                  {...register('tag_no',
                              {required: {
                              value: true,
                              message: "Name is required"}
                              })
                  } />
                {errors.tag_no ? <p className='ErrorClass'>{errors.tag_no?.message}</p>: null}  
              </div>

              {/* -------Form Control------ */}
              <div className="FormControl">
                <label htmlFor="color">Color</label>
                <input type="text" id='color'
                  {...register('color',
                              {required: {
                              value: true,
                              message: "Color is required"}
                              })
                  } />
                {errors.color ? <p className='ErrorClass'>{errors.color?.message}</p>: null}  
              </div>

              <div className="InputGroup">
                {/* -------Form Control------ */}
                <div className="FormControl">
                  <label htmlFor="breed">Breed</label>
                  <input type="text" id='breed'
                    {...register('breed',
                                {required: {
                                value: true,
                                message: "Breed is required"}
                                })
                    } />
                  {errors.breed ? <p className='ErrorClass'>{errors.breed?.message}</p>: null}  
                </div>
                {/* -------Form Control------ */}
                <div className="FormControl">
                  <label htmlFor="cattle_type">Cattle Type</label>
                  <select name="cattle_type" 
                          id="cattle_type"
                          {...register('cattle_type',
                          {required:{value:true,
                                    message:"Cattle Type is Required"}}
                          )}>
                    <option value="cows/buffalo">Cows/Buffalo</option>
                    <option value="poultry">Poultry</option>
                  </select>
                  {errors.cattle_type ? <p className='ErrorClass'>{errors.cattle_type?.message}</p>: null}  
                </div>
              </div>
              
              {/* -------Form Control------ */}
              <div className="FormControl">
                <label htmlFor="gender">Gender</label>
                <select name="gender" 
                        id="gender"
                        {...register('gender',
                        {required:{value:true,
                                  message:"Gender is Required"}}
                        )}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender ? <p className='ErrorClass'>{errors.gender?.message}</p>: null}  
              </div>
             
              {/* -------Form Control------ */}
              {livestock.length >0 && 
                  (<div className="FormControl">
                  <label htmlFor="dam_id">Dam</label>
                  <Controller name="dam_id" 
                    control={control} 
                    render={({ field }) => ( 
                      
                      <Select  {...field} 
                      value={field.value !== null ? DamOptions.find(option => option.value === field.value) : null}
                      // value={DamOptions.find(option => option.value === field.value)} 
                      onChange={(selectedOption) => field.onChange(selectedOption?.value)} 
                      options={DamOptions}
                      styles={styles}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      isSearchable />
                    )}/>
                  
                        {/* {livestock.map((items,id)=>{
                          return(
                            <option key={items.livestock_id} value={items.livestock_id}>{items.tag_no}</option>
                        
                            )
                          })} */}
                  
                  {errors.dam_id ? <p className='ErrorClass'>{errors.dam_id?.message}</p>: null}  
                </div>)
              }

            </div>
          </div>
          

          
          <div className="FormButtonWrapper">
            <Button size="sm">{props.submitBtnText}</Button>
            <Button onClick={handleReset} size="sm" variant="warning" icon={<GiBroom fontSize={16} color='white'/>} />
          </div>
      </form>
    </div>
  )
}

export default LivestockForm