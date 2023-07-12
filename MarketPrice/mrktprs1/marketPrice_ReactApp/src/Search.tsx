import React, { useEffect, useState } from "react"
import Content from "./Content";
import "./Search.css"
import axios from "axios";
import C from "./Content"
import Barch from "./Barch";
import Product from "./Product";
import Recomended from "./Recomended";
const baseContent={ 
    min_price_product:{
        id :6,
        productURL:"",
        imageURL:"",
        name:"",
        price: 0
    },
    max_price_product:{
        id :7,
        productURL:"",
        imageURL:"",
        name:"",
        price: 0
    },
    min_price : 0,
    max_price : 0,
    avg_price : 0,
    items_looked_up :0,

    "graph_labels":[10,15,20,25,20,15,10],
    "graph_prices":['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    search_recommendations:[{
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


}

function Search(){
    let keyWord=""
    const [rel,setRel]=useState("")
    const [content,setContent]=useState(baseContent)
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/search/".concat(rel))
        .then(res=>{
            setContent(res.data),
            console.log(res)
            const d=document.getElementById("h6err"); if (d!=null ){d.innerHTML="" };
            const c=document.getElementById("grcn");
            if (c!=null ){c.style.display="flex" }
            
        }).catch(err=>{console.log(err.response.status);const d=document.getElementById("h6err"); if (d!=null ){d.innerHTML="პროდუქტები ვერ მოიძებნა" };
        const c=document.getElementById("grcn");
        if (c!=null ){c.style.display="none" }

    })
    },[rel])
    
    const [initrecs,setInitrecs]=useState(baseContent.search_recommendations)
    useEffect(()=>{
            axios.get("http://127.0.0.1:8000/")
            .then(res=>{
                setInitrecs(res.data),
                console.log(res)
               
                
            }).catch(err=>{console.log(err.response.status);})
        },[])
  

    if (rel!="" )    
        return (
            <div className="Search">
                <form className="input-group flex-nowrap innersearch" >
                    <input type="text" className="ds-input form-control" onChange={input=>(keyWord=input.target.value)} placeholder="Search.." id="search" name="search"></input>
                    <button className="btn btn-outline-success" onClick={input=>setRel(keyWord)} type="button">Search</button>
                </form>
                <h6 id="h6err" ></h6>
            <div id="grcn">
            
            <Barch data={content.graph_labels} labels={content.graph_prices}></Barch>
            <Content content={content}></Content>
            
            </div>
            </div>
         )
 
    return (
            <div className="Search ">
                <form className="input-group flex-nowrap">
                    <input type="text" className="ds-input form-control" onChange={input=>(keyWord=input.target.value)} placeholder="Search.." id="search" name="search"></input>
                    <button className="btn btn-outline-success" onClick={input=>setRel(keyWord)} type="button">Search</button>
                </form>
                <Recomended products={[ new Product(initrecs[0]),
                            new Product(initrecs[1]),
                            new Product(initrecs[2]),
                            new Product(initrecs[3])
                        ]}></Recomended>
            </div>

            )
}
export default Search