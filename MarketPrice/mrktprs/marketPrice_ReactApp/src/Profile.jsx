import { useEffect, useState } from "react";
import Recomended from "./Recomended";
import Product from "./Product";
import axios from "axios";

export default function Profile(){
    const [history,setHistory]=useState(null)
    axios.get("http://127.0.0.1:5000/history?userid=".concat(""))
    .then(res=>{
        setHistory(res.data),
        console.log(res)
        
    }).catch(err=>{console.log(err)})

    const [recoms,setRecoms]=useState(null)
    axios.get("http://127.0.0.1:5000/recomendationsfromhistory?userid=".concat(""))
    .then(res=>{
        setRecoms(res.data),
        console.log(res)
        
    }).catch(err=>{console.log(err)})
    if(history==null || recoms==null){
        return(
            <div>
                <h1>you have to login!</h1>
            </div>
        )
    }
    return(
        <div>
            <div>
                <label>Histoty</label>
                <Recomended products={history}></Recomended>
            </div>
            <div>
                <label htmlFor="">for you</label>
                <Recomended products={recoms}></Recomended>
            </div>
        </div>
    )
}