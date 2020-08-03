import React from 'react';
import './funcsCard.css';
import { ThemeContext } from '../../themes/themeContext';

function funcCard(props) {

    return (
    <ThemeContext.Consumer>
        {(value)=> (<div>  
                        <p className="titleList">Your List</p>
                        {props.children}
                        <label>Order by: </label>
                        <select className="filter" onChange={(e)=> props.selectFilter(e.target.value)}
                        style={{backgroundColor:value.background, color:value.color}}>
                            <option>Default</option>
                            <option>Name</option>
                            <option>Date</option>
                        </select>
                    </div>)     
        }
    </ThemeContext.Consumer>
            
            )

}

export default funcCard;