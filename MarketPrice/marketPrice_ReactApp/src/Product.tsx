import React from "react";
import "./Product.css"
type Prop = {
    id: string;
    productURL: string;
    name: string;
    price: number;
    imageURL: string
}

export default class Product extends React.Component<Prop> {
    props: Prop;
    constructor(props: Prop) {
        super(props);
        this.props = props;



    }

    render() {


        return <div className="card" >
                    <img className="card-img-top" src={this.props.imageURL} alt={name + " photo"}></img>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">ფასი {this.props.price}&#8382;</p>
                        <a href={this.props.productURL} target="_blank" className="btn btn-primary">Go to mymarket</a>
                    </div>
                </div>
        //    return <div className="product">
        //         <a href={this.props.productURL}>
        //             <img src={this.props.imageURL} alt={name+" photo"} />
        //             {/*<span>{this.props.id}</span>*/}
        //             <span>{this.props.name.slice(0,8).concat("...")}</span> 
        //             <span>ფასი {this.props.price}&#8382;</span>
        //         </a>
        //     </div>;

    }
}