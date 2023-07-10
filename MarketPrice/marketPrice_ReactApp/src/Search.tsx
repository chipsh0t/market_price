import React, { useEffect, useState } from "react"
import Content from "./Content";
import "./Search.css"
import axios from "axios";
import C from "./Content"
const baseContent={ 
    min_price_product:{
        id :"6",
        productURL:"",
        imageURL:"",
        name:"",
        price: 0
    },
    max_price_product:{
        id :"7",
        productURL:"",
        imageURL:"",
        name:"",
        price: 0
    },
    min_price : 0,
    max_price : 0,
    avg_price : 0,
    items_looked_up :0,
    other_recommendations:[{
        id :"8",
        productURL:"",
        imageURL:"",
        name:"",
        price: 0
    },
    {
        id :"9",
        productURL:"",
        imageURL:"",
        name:"",
        price: 0
    },
    {
        id :"10",
        productURL:"",
        imageURL:"",
        name:"",
        price: 0
    }]

}

//http://127.0.0.1:8000/search_products/
function Search(){
    let keyWord=""
    const [rel,setRel]=useState("")
    const [content,setContent]=useState(baseContent)
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/search?name=".concat(rel))
        .then(res=>{
            setContent(res.data),
            console.log(res)
            
        }).catch(err=>{console.log(err)})
    },[rel])
    if (rel!="")    
        return (
            <div className="Search ">
                <form className="input-group flex-nowrap">
                    <input type="text" className="ds-input form-control" onChange={input=>(keyWord=input.target.value)} placeholder="Search.." id="search" name="search"></input>
                    <button className="btn btn-outline-success" onClick={input=>setRel(keyWord)} type="button">Search</button>
                </form>
            <Content content={content}></Content>
            </div>
         )
    return (
            <div className="Search ">
                <form className="input-group flex-nowrap">
                    <input type="text" className="ds-input form-control" onChange={input=>(keyWord=input.target.value)} placeholder="Search.." id="search" name="search"></input>
                    <button className="btn btn-outline-success" onClick={input=>setRel(keyWord)} type="button">Search</button>
                </form>
            </div>
            )
}
export default Search