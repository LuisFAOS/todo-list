import React from 'react';
import './btnChangeTheme.css';
import {ThemeContext} from '../../themes/themeContext'

class changeTheme extends React.Component {
    
    render(){
        return ( 
            <div className="ThemeChanger">
                <label htmlFor="changer">Dark Theme</label>
                <input type="checkbox" id="changer" onClick={this.props.changeTheme}/>
            </div>
        );
    }
}
changeTheme.contextType=ThemeContext

export default changeTheme;