import { useEffect, useState } from 'react'
import Search from './Search'
import Hdr from './hdr'
import Product from './Product'
import Recomended from './Recomended'
import axios from "axios";
import Statistics from './Statistics'
import Content from './Content'
import './FirstPage.css'
import React from 'react'

export default function FirstPage(){
    let cntnt 
    const [content,setContent]=useState(cntnt)
    useEffect(()=>{
      axios.get("http://127.0.0.1:5000/search?name= ")
      .then(res=>{
          setContent(res.data),
          console.log(res)
          
      }).catch(err=>{console.log(err)})
    },[])
    if(content !=null)
      return (
     <div className="app1" > 
     <Hdr></Hdr>
     <Search ></Search>
     <Recomended products={[ new Product(content.other_recommendations[0]),
                              new Product(content.other_recommendations[1]),
                              new Product(content.other_recommendations[2]),
                              new Product(content.other_recommendations[3])
                          ]}></Recomended> 
    
      </div>
      )
     return(
      <div className="app1"> 
      <Hdr></Hdr>
      <Search ></Search>
      </div>
     )
}