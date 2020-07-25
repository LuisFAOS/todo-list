import React, {useState} from 'react';
import './input.css';

const input=(props)=>{
    return (
        <input maxLength={props.maxlength} style={{borderBottom:props.borderBerror}} 
            onChange={props.changed} value={props.value} 
            onBlur={props.blured} onClick={props.clicked}
            placeholder={props.placeholder} className={props.class} readOnly={props.readOnly}/>
    )
}
export default input;