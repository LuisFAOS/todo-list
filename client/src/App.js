import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Input from './components/todo-input/input/input'
import Inputs from './components/todo-input/inputs';
import Card from './components/todo-output/card'

export default function App() {
  const [lists, setList]=useState([])

  const [listsFiltered,setListsFiltered]=useState([])

  const selectRef=useRef(null)

  useEffect(()=>{
    renderLists()
  },[]) 
  
  const renderLists= async ()=>{
    const response = await fetch(`/list`)
    const body= await response.json()
    if (response.status !== 200) throw Error(body.message);
    setList([...body])
    setListsFiltered([...body])
  }

  const addList= async (list)=>{
    list.date=list.date.replace("/","*").replace("/","*")
    const jsonList=JSON.stringify(list)
    await fetch(`/addList/${jsonList}`)
    renderLists()
  }

  const removeList=async (index)=> {
    let conf=window.confirm("This item will be delete")
    if(conf) await fetch(`/removeList/${index}`)
    renderLists()
  }

  const filterLists=(name)=>{
    const listsBefore=lists.filter((value)=> value.name.toUpperCase().startsWith(name.toUpperCase()) ? value:"")
    setListsFiltered(listsBefore)
  }

  const selectFilter=(typeFilter)=>{
    if(typeFilter==="Name") filterByName()
    else if(typeFilter==="Date") filterByDate()
    else setListsFiltered([...lists])
  }

  const filterByName=()=>{
    const filteredByName=[...lists]
    filteredByName.sort((val1, val2)=> (val1.name > val2.name) ? 1 : ((val2.name > val1.name) ? -1 : 0))
    setListsFiltered(filteredByName)
  }

  const filterByDate=()=>{
    const filteredByDate=[...lists]
    filteredByDate.sort((val1, val2)=> {
      let tomorrow=new Date();
      tomorrow.setDate(new Date().getDate()+1)
      let date1=val1.date
      let date2=val2.date
      date1=date1==="Today" ? new Date().toLocaleDateString() : date1==="Tomorrow" ? tomorrow.toLocaleDateString():date1
      date2=date2==="Today" ? new Date().toLocaleDateString() : date2==="Tomorrow" ? tomorrow.toLocaleDateString():date2
      let finalResult=Number(date1.split("/")[2]) - Number(date2.split("/")[2])
      finalResult=finalResult===0 ? Number(date1.split("/")[1]) - Number(date2.split("/")[1]) : finalResult;
      finalResult=finalResult===0 ? Number(date1.split("/")[0]) - Number(date2.split("/")[0]) : finalResult
      return finalResult
    })
    setListsFiltered(filteredByDate)
  }


  return (
    <div className="container">
      <div className="presentation">
        Welcome To
        <p>A Begginer "To do List" </p>
      </div>
      <div className="Box1">
        <p className="title">
        Hello, Dev!<br/>
        Optimize your time!!</p>
        <Inputs send={(list) => addList(list)}/>
      </div>
      <div className="to-do-list">
      {lists.length!==0 && 
        <div>
          <p className="titleList">Your List</p>
          <Input placeholder="Filter a list..." class="searchList inputDefault" changed={(e) => filterLists(e.target.value)}/>
          <label>Order by: </label>
          <select className="filter" ref={selectRef} onChange={()=> selectFilter(selectRef.current.value)}>
            <option>Default</option>
            <option>Name</option>
            <option>Date</option>
          </select> 
        </div>
      }
        {listsFiltered.map((valor) => 
          (<Card name={valor.name} date={(valor.date+(valor.time ? " - "+valor.time:""))}
          desc={valor.description} key={valor.id_list} remove={()=>removeList(valor.id_list)}/>))}
      </div>
    </div>
  );
}

