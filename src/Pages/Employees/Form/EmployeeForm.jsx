import React from 'react'
// import './EmployeeForm.scss'

import Button from '../../../UI Components/Button';
import { MdDelete, MdOutlineCleaningServices} from 'react-icons/md'
import { GiBroom} from 'react-icons/gi'
function EmployeeForm(props) {

  const {register, handleSubmit,formState:{errors},reset, clearErrors}= props.form
  const handleReset = (e) => {
    e.preventDefault()
    reset();
    clearErrors();
  }

  return (
    <div>
      <form className="FormWrapper" onSubmit={handleSubmit(props.onSubmit)}>
          <div className="FormControl">
            <label htmlFor="name">Name</label>
            <input type="text" id='name'
              {...register('name',
                          {required: {
                          value: true,
                          message: "Name is required"}
                          })
              } />
            {errors.name ? <p className='ErrorClass'>{errors.name?.message}</p>: null}  
          </div>

          <div className="FormControl">
            <label htmlFor="position">Position</label>
            <select name="position" 
                    id="position"
                    {...register('position',
                    {required:{value:true,
                              message:"Position is Required"}}
                    )}>
              <option value="manager">Manager</option>
              <option value="it">IT</option>
            </select>
            {errors.position ? <p className='ErrorClass'>{errors.position?.message}</p>: null}  
          </div>

          
          <div className="FormButtonWrapper">
            <Button size="sm">{props.submitBtnText}</Button>
            <Button onClick={handleReset} size="sm" variant="warning" icon={<GiBroom fontSize={16} color='white'/>} />
          </div>
      </form>

    </div>
  )
}

export default EmployeeForm