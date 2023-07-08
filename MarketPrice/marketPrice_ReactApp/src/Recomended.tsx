import React from "react";
import Product from"./Product"
import "./Recomended.css"
type Props={
    products:Array<Product>;
    
}
export default function(props:Props){
   //const [type,setType]=useState("")
    //setType(type);
    //console.log(procs.prs)
    return <div className="recomended"> 
        <p>Recomended</p>
        <div className="products">
        {props.products.map(pr=> <div key={pr.props.id}>{pr.render()}</div>)
        }
        </div>  
    </div>
          
            
    
}