import React from 'react';
import './input.css';
import {ThemeContext} from '../../../themes/themeContext'

const input=(props)=>{
    return (
        <ThemeContext.Consumer>
            {value=> 
            <input maxLength={props.maxlength} style={{borderBottom:props.borderBerror, 
                backgroundColor:value.color==='white' ? value.color:""}} 
                onChange={props.changed} value={props.value} 
                onBlur={props.blured} onClick={props.clicked}
                placeholder={props.placeholder} className={props.class} readOnly={props.readOnly}/>
            }
        </ThemeContext.Consumer>
    )
}
export default input;