import React from 'react';
import './titleTodo.css';

function titleTodo(props) {
  return (<div>
            <div className="presentation">
                Welcome To
                <p>A Begginer "To do List" </p>
            </div>
            <div className="Box1">
            <p className="title">
                Hello, Dev!<br/>
                Optimize your time!!
            </p>
            {props.children}
            </div>
        </div>)

}

export default titleTodo;