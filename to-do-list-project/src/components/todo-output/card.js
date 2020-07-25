import React from 'react';
import './card.css';

export default function Card(props){
    return(
        <div className="card">
            <button className="remove" onClick={props.remove}>X</button>
            <div>
                <input className="name" value={props.name} readOnly/>
                <input className="date" value={props.date} readOnly/>
            </div>
            <input className="description" value={props.desc} readOnly/>
        </div>
    );
}