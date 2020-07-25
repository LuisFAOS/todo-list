import React,{Component} from 'react'
import './popup.css'

export default class PopUp extends Component{
    render(){
        return (<div className="popUpAlertError"> 
                    <button className="ClosePopUp" onClick={this.props.clickedFunction}>
                        X
                    </button>
                    <p className="txtError">{this.props.textError}</p>
                </div>)
    }
}