import React from 'react'
import Input from '../input/input'
import './DateTime.css'

const DateTimeInput = (props)=>{
    return (
        <fieldset>
            <legend>SET A DATE/TIME:</legend>

            {/* DIVBOX TO INPUT DATE...*/}
            <div className='box'>
                <Input class="date inputDefault" placeholder="Set a date..." value={props.date}
                clicked={props.viewComponent}
                readOnly={true}/>
                <p style={{textAlign:'start'}}>OBS: click in the input</p>
            </div> 

            {/* DIVBOX TO INPUT HOUR...*/}
            <div className='box'>
                <Input class="timeInput inputDefault" placeholder="23" maxlength="2" value={props.values[1]} 
                changed={props.setValueHour}
                blured={props.validationHour} borderBerror={props.borderBottom[1]}
                />:
                <p>Hour</p>
            </div>

            {/* DIVBOX TO INPUT MINUTES...*/}
            <div className='box'>
                <Input class="timeInput inputDefault" placeholder="59" maxlength="2" value={props.values[2]} 
                changed={props.setValueMins}
                blured={props.validationMins} borderBerror={props.borderBottom[2]}
                />
                <p>Mins</p>
            </div>
        </fieldset>
    )
}
export default DateTimeInput