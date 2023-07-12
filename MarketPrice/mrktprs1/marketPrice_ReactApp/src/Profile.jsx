import { useEffect, useState } from "react";
import Recomended from "./Recomended";
import Product from "./Product";
import axios from "axios";
const basehist=[{
    id :8,
    productURL:"",
    imageURL:"",
    name:"",
    price: 0
},
{
    id :9,
    productURL:"",
    imageURL:"",
    name:"",
    price: 0
},
{
    id :10,
    productURL:"",
    imageURL:"",
    name:"",
    price: 0
},
{
    id :11,
    productURL:"",
    imageURL:"",
    name:"",
    price: 0
},
]
export default function Profile(){
    const [history,setHistory]=useState(basehist)
   useEffect(()=>{
    axios.get("http://127.0.0.1:8000/")
    .then(res=>{
        setHistory(res.data),
        console.log(res)
        
    }).catch(err=>{console.log(err)})
    },[])
    /*
    const [recoms,setRecoms]=useState(null)
    useEffect(()=>{
    axios.get("http://127.0.0.1:5000/recomendationsfromhistory?userid=".concat(""))
    .then(res=>{
        setRecoms(res.data),
        console.log(res)
        
    }).catch(err=>{console.log(err)})
},[])*/
    if(history==null||history.length==0){
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
                <Recomended products={[ new Product(history[0]),
                            new Product(history[1]),
                            new Product(history[2]),
                            new Product(history[3])
                        ]}></Recomended>
            </div>
            
           <div>
                <label htmlFor="">for you</label>
                <Recomended products={[ new Product(history[0]),
                            new Product(history[1]),
                            new Product(history[2]),
                            new Product(history[3])
                        ]}></Recomended>
    </div>
        </div>
    )
}