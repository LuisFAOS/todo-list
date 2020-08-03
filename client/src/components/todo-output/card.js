import React from 'react';
import {ThemeContext} from '../../themes/themeContext'
import {CardStyle, InputDate, InputName, InputDesc, ButtonRemove} from './style'

export default function Card(props){
    return(
        <ThemeContext.Consumer>
           {value=> <CardStyle>
                        <div>
                            <InputName value={props.name} readOnly/>
                            <InputDate value={props.date} readOnly/>
                            <ButtonRemove onClick={props.remove}>X</ButtonRemove>
                        </div>
                        <InputDesc value={props.desc} readOnly/>
                    </CardStyle>}
        </ThemeContext.Consumer>
    );
}