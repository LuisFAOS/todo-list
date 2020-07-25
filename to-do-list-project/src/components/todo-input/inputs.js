import React, {useState} from 'react';
import './inputs.css';
import Input from './input/input'
import BoxDateTime from './DateTime/DateTime'
import PopUp from './popup/popup'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Inputs(props){


    const [controlErrors,setControlErrors]=
    useState([{borderBottom:["","",""]}, {textError:""}])

    const [values,setValues]=useState(["","","","",""]);

    const [dataList,setDataList]=useState({
        name:"",
        date:"",
        time:{hour:"",mins:""},
        description:""
    })
    const [viewComponent,setViewComponent]=useState([false,false]);

    const putInList=(...values)=>{
        setDataList(
            {
                name:values[0],
                date:values[1],
                time:values[2],
                description:values[3]
            }
        )
    }

    const putInControl=([...borders],error)=>{
        setControlErrors([
            {borderBottom:borders}, 
            {textError:error}
        ])
    }


    const validationName = (name)=>{
        if (name.trim().length > 1 && name.trim().length <= 25) {
            setViewComponent([false,false])
            putInList(name,dataList.date,dataList.time,dataList.description)
            putInControl(["",...controlErrors[0].borderBottom.slice(1)],controlErrors[1].textError)
        }else{ 
            putInControl(["2px solid red",...controlErrors[0].borderBottom.slice(1)],"ERROR! The name can't be empty!  ")
        }
    }

    const setAdate=(value)=>{
        let userDate=value.toLocaleDateString();
        let today=new Date().toLocaleDateString();
        let tomorrow=new Date();
        tomorrow.setDate(new Date().getDate()+1)
        tomorrow=tomorrow.toLocaleDateString();
        let finalDate=userDate===today ? "Today":userDate===tomorrow ? "Tomorrow":userDate;
        putInList(dataList.name,finalDate,dataList.time,dataList.description)
    }

    const validationHour = (value)=>{
        const matchHour=value.match(value[0]==='2' ? "[0-2]{1}[0-4]{1}":"[0-1]{1}[0-9]{1}");
        const verifyHour=matchHour ? matchHour[0]:null;
        if (verifyHour && verifyHour.length === value.length) {
            setViewComponent([false,false])
            putInList(dataList.name,dataList.date,{hour:value,mins:dataList.time.mins}, dataList.description)
            putInControl([controlErrors[0].borderBottom[0], "", controlErrors[0].borderBottom[2]],controlErrors[1].textError)
        }else if((isNaN(value) && value!=="") || value.length===1){
            putInControl([controlErrors[0].borderBottom[0], "2px solid red", controlErrors[0].borderBottom[2]],"ERROR! The hour is invalid value!  ")
        }
    }

    const validationMins = (value)=>{
        const matchMins=value.match("[0-5]{1}[0-9]{1}");
        const verifyMins=matchMins ? matchMins[0]:null;
        if (verifyMins && verifyMins.length === value.length) {
            putInList(dataList.name,dataList.date,{hour:dataList.time.hour,mins:value}, dataList.description)
            putInControl([...controlErrors[0].borderBottom.slice(0,2),""],controlErrors[1].textError)
        }else if((isNaN(value) && value!=="") || value.length===1){
            putInControl([...controlErrors[0].borderBottom.slice(0,2),"2px solid red"],"ERROR! The minute is invalid value!")
        }
    }

    const setDescription= (description)=>{
        description=description.trim().length>0 ? description[0].toUpperCase() + description.slice(1).toLowerCase():"";
        putInList(dataList.name,dataList.date,dataList.time,description)
    }
    
    const sendAndClearFields=()=>{
        const {name,date,time}=dataList
        let verifyErro=name==="" || date==="" ? setValues([values[0],values[1],values[2],values[3],"ERRO: Name or date is empty"]):"";
        verifyErro=time.hour==="" && time.mins.length>1 ? setValues([values[0],values[1],values[2],values[3],"ERRO: U put the minute, but not the hour"]):"";
        if (!(name==="" || date==="") && !(time.hour==="" && time.mins.length>0)) {
            props.send(dataList)
            setValues(["","","","",""])
            putInList("","",{hour:"",mins:""},"")
            setViewComponent([false,false])
        }else {
            let callFocus=name==="" ? document.querySelector('.nameAct').focus():date==="" ? document.querySelector('.date').focus():"";
            setViewComponent([true,false])
        }
    } 

    const formatData=(date)=>  {
        const datenow=new Date();
        let tomorrow=new Date();
        tomorrow.setDate(new Date().getDate()+1)
        const isTomorrow= date==="Tomorrow" ? tomorrow:false;
        const isToday= date==="Today" ? datenow:false;
        let finalDate= isTomorrow ? isTomorrow:isToday ? isToday: new Date(date.split("/")[1]+"/"+date.split("/")[0]+"/"+date.split("/")[2]);
        return finalDate
    }
    
    const bodyStyle=document.body.style
    if(viewComponent[1]){ 
        bodyStyle.overflow = "hidden" 
        window.scrollTo(0,0)
    }
    else bodyStyle.overflow = "visible"
    return (
        <div className="inputsBox">  

            {/* INPUT NAME...*/}
            <Input class="nameAct inputDefault" placeholder="Name your activity..." maxlength="25" value={values[0]}
                changed={(event)=> setValues([event.target.value,values[1],values[2],values[3],values[4]])}
                blured={(event)=> validationName(event.target.value)} borderBerror={controlErrors[0].borderBottom[0]}
            />

            {/* Box DATE/TIME */}
            <BoxDateTime date={dataList.date} values={values} viewComponent={()=> setViewComponent([viewComponent[0],true])}
            borderBottom={controlErrors[0].borderBottom} setValueHour={(event)=>{setValues([values[0],event.target.value,values[2],values[3],values[4]])}}
            setValueMins={(event)=>{setValues([values[0],values[1],event.target.value,values[3],values[4]])}} 
            validationHour={(event)=>validationHour(event.target.value)} validationMins={(event)=>validationMins(event.target.value)}
            />
           
            {/* TEXTAREA TO DESCRIPTION */}
            <textarea className="descAct inputDefault" placeholder="Describe your activity..." maxLength="60"  
            onBlur={(event) => setDescription(event.target.value)} 
            onChange={(event) => setValues([values[0],values[1],values[2],event.target.value,values[4]])} 
            value={values[3]}/>
            
            {/* ALERT WHEN SEND A INVALID VALUES */}
            {viewComponent[0] ? <div><p className="error">{values[4]}</p></div>:null}

            <button className="buttonAdd" onClick={sendAndClearFields}>+</button>

            {/* CONDITIONAL TO HIDE OR SHOW CALENDAR*/}
            {viewComponent[1] ? 
                <div className="BoxCalendar">
                    <Calendar minDate={new Date()} defaultValue={dataList.date.length>0 ? formatData(dataList.date):new Date()}
                    onChange={(value)=> setAdate(value)}
                    locale="pt-br" maxDate={new Date('2040-12-31')} className="calendar"/>
                    <button className="buttonClose" onClick={()=> setViewComponent([viewComponent[0],false])}>OK</button>
                </div> : ""
            }

            {/* CONDITIONAL TO HIDE OR SHOW POPUP ERROR*/}
            {controlErrors[1].textError && 
                <PopUp textError={controlErrors[1].textError}
                clickedFunction={()=> setControlErrors([{borderBottom:controlErrors[0].borderBottom}, {textError:""}])}/> 
            }
            
        </div>
    );
}