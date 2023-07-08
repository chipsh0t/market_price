import React from "react";
import "./Statistics.css"
type props={
    min:number;
    max:number;
    avarage:number;
    n:number
}
export default function Statistics(props:props){

    return (
        <div className="statistics">
            <p>min : {props.min}</p>
            <p>max : {props.max}</p>
            <p>avarage : {props.avarage}</p>
            <p>number of items : {props.n}</p>
            
        </div>
    )
}

