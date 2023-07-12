// import React from "react";
// import Product from"./Product"
// import "./Recomended.css"
// type Props={
//     products:Array<Product>;
    
// }
// export default function(props:Props){
//    //const [type,setType]=useState("")
//     //setType(type);
//     //console.log(procs.prs)
//     return <div className="recomended"> 
//         <p>Recomended</p>
//         <div className="products">
//         {props.products.map(pr=> <div key={pr.props.id}>{pr.render()}</div>)
//         }
//         </div>  
//     </div>
// }

import React from "react";
import Product,{ProductProps}  from "./Product";
import "./Recomended.css";

type Props = {
  products: Array<ProductProps>;
};

const Recomended: React.FC<Props> = ({ products }) => {
  return (
    // recomended
    // <div className="w-100">
      <div className="row my-3">
        {/* <div className="col-4"> */}
        {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center align-items-center mb-3">
                <Product {...product} />
            </div>
        ))}
        {/* </div> */}
      </div>
    // </div>
  );
};

export default Recomended;





