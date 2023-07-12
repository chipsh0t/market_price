// import React from "react";
// import "./Product.css"
// type Prop = {
//     id: string;
//     productURL: string;
//     name: string;
//     price: number;
//     imageURL: string
// }
// function handleClick(id : string){

// console.log(id)
// }
// export default class Product extends React.Component<Prop> {
//     props: Prop;
//     constructor(props: Prop) {
//         super(props);
//         this.props = props;



//     }

//     render() {


//         return <div className="card" >
//                     <img className="card-img-top" src={this.props.imageURL} alt={name + " photo"}></img>
//                     <div className="card-body">
//                         <h5 className="card-title">{this.props.name.slice(0,20).concat("...")}</h5>
//                         <p className="card-text">ფასი {this.props.price}&#8382;</p>
//                         <a href={this.props.productURL} onClick={(e)=>{ e.preventDefault();handleClick(this.props.id); window.open(this.props.productURL, '_blank');}}  target="_blank" className="btn btn-primary">Go to mymarket</a>
//                     </div>
//                 </div>
//         //    return <div className="product">
//         //         <a href={this.props.productURL}>
//         //             <img src={this.props.imageURL} alt={name+" photo"} />
//         //             {/*<span>{this.props.id}</span>*/}
//         //             <span>{this.props.name.slice(0,8).concat("...")}</span> 
//         //             <span>ფასი {this.props.price}&#8382;</span>
//         //         </a>
//         //     </div>;

//     }
// }

// // import React from "react";
// // import "./Product.css";

// // type Prop = {
// //   id: string;
// //   productURL: string;
// //   name: string;
// //   price: number;
// //   imageURL: string;
// // };

// // function handleClick(id: string) {
// //   // Modify or remove the console.log as needed
// //   console.log(id);
// // }

// // export default function Product(props: Prop) {
// //   return (
// //     <div className="card">
// //       <img
// //         className="card-img-top"
// //         src={props.imageURL}
// //         alt={props.name + " photo"}
// //       />
// //       <div className="card-body">
// //         <h5 className="card-title">{props.name.slice(0, 20).concat("...")}</h5>
// //         <p className="card-text">ფასი {props.price}&#8382;</p>
// //         <a
// //           href={props.productURL}
// //           onClick={(e) => {
// //             e.preventDefault();
// //             handleClick(props.id);
// //             window.open(props.productURL, "_blank");
// //           }}
// //           target="_blank"
// //           className="btn btn-primary"
// //         >
// //           Go to mymarket
// //         </a>
// //       </div>
// //     </div>
// //   );
// // }


import React from "react";
import "./Product.css";
import axios from "axios";

export type ProductProps = {
  id: number;
  productURL: string;
  name: string;
  price: number;
  imageURL: string;
};

const Product: React.FC<ProductProps> = ({
  id,
  productURL,
  name,
  price,
  imageURL,
}) => {
  // function handleClick(id: number) {

  //   let userid = sessionStorage.getItem("userid");
  //   if (userid != null) {
  //     axios.post("http://127.0.0.1:8000/save_interaction/" + id, { "id": userid })
  //       .then(res => {
  //         console.log(res.data)

  //       }).catch(err => { console.log(err) })
  //   }
  //   console.log(id)
  // }
  function handleClick(id: number) {

    let userid = sessionStorage.getItem("userid");
    if (userid != null) {
      axios.post("http://127.0.0.1:8000/save_interaction/" + id, { "id": userid })
        .then(res => {
          console.log(res.data)

        }).catch(err => { console.log(err) })
    }
    console.log(id) 
  }

  return (
    <div className="card h-100">
      <img className="card-img-top" src={imageURL} alt={name + " photo"} />
      <div className="card-body">
        <h5 className="card-title">{name.slice(0, 20).concat("...")}</h5>
        <p className="card-text">ფასი: {price}&#8382;</p>
        <a
          href={productURL}
          onClick={(e) => {
            e.preventDefault();
            handleClick(id);
            window.open(productURL, "_blank");
          }}
          target="_blank"
          className="btn btn-primary"
        >
          გადადი mymarket-ზე
        </a>
      </div>
    </div>
  );
};

export default Product;
