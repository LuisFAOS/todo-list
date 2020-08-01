import React, {useEffect} from 'react'
import './popup.css'

const PopUp = (props)=> {


    useEffect(()=>{
        const timer= setTimeout(props.clickedFunction,4000)
        return ()=>{
            clearTimeout(timer)
        }
    },[props])

    return (<div className="popUpAlertError"> 
                <button className="ClosePopUp" onClick={props.clickedFunction}>
                    X
                </button>
                <p className="txtError">{props.textError}</p>
            </div>)

}
export default PopUp