import React from 'react'
import Button from '../../../UI Components/Button';
import { MdDelete, MdOutlineCleaningServices} from 'react-icons/md'
import { GiBroom} from 'react-icons/gi'
function LivestockForm(props) {

  const {register, handleSubmit,formState:{errors},reset, clearErrors}= props.form
  const handleReset = (e) => {
    e.preventDefault()
    reset();
    clearErrors();
  }
  return (
    <div>
        <form className="FormWrapper" onSubmit={handleSubmit(props.onSubmit)}>
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

          
          <div className="FormButtonWrapper">
            <Button size="sm">{props.submitBtnText}</Button>
            <Button onClick={handleReset} size="sm" variant="warning" icon={<GiBroom fontSize={16} color='white'/>} />
          </div>
      </form>
    </div>
  )
}

export default LivestockForm