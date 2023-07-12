// import React, { useEffect, useState } from "react"
// import Content from "./Content";
// import "./Search.css"
// import axios from "axios";
// import C from "./Content"
// import Barch from "./Barch";
// const baseContent = {
//     min_price_product: {
//         id: "6",
//         productURL: "",
//         imageURL: "",
//         name: "",
//         price: 0
//     },
//     max_price_product: {
//         id: "7",
//         productURL: "",
//         imageURL: "",
//         name: "",
//         price: 0
//     },
//     min_price: 0,
//     max_price: 0,
//     avg_price: 0,
//     items_looked_up: 0,
//     other_recommendations: [{
//         id: "8",
//         productURL: "",
//         imageURL: "",
//         name: "",
//         price: 0
//     },
//     {
//         id: "9",
//         productURL: "",
//         imageURL: "",
//         name: "",
//         price: 0
//     },
//     {
//         id: "10",
//         productURL: "",
//         imageURL: "",
//         name: "",
//         price: 0
//     }]

// }

// function Search() {
//     let keyWord = ""
//     const [rel, setRel] = useState("")
//     const [content, setContent] = useState(baseContent)
//     useEffect(() => {
//         axios.get("http://127.0.0.1:8000/search/".concat(rel))
//             .then(res => {
//                 setContent(res.data),
//                     console.log(res)

//             }).catch(err => { console.log(err) })
//     }, [rel])
//     if (rel != "")
//         return (
//             <div className="Search">
//                 <form className="input-group flex-nowrap innersearch" >
//                     <input type="text" className="ds-input form-control" onChange={input => (keyWord = input.target.value)} placeholder="Search.." id="search" name="search"></input>
//                     <button className="btn btn-outline-success" onClick={input => setRel(keyWord)} type="button">Search</button>
//                 </form>
//                 <Content content={content}></Content>
//                 <Barch data={[10, 15, 20, 25, 20, 15, 10]} labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}></Barch>

//             </div>
//         )
//     return (
//         <div className="Search ">
//             <form className="input-group flex-nowrap">
//                 <input type="text" className="ds-input form-control" onChange={input => (keyWord = input.target.value)} placeholder="Search.." id="search" name="search"></input>
//                 <button className="btn btn-outline-success" onClick={input => setRel(keyWord)} type="button">Search</button>
//             </form>
//         </div>
//     )
// }
// export default Search

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Product, { ProductProps } from "./Product";
// import Recomended from "./Recomended";

// type SearchResponse = {
//     min_price_product: ProductProps;
//     max_price_product: ProductProps;
//     min_price: number;
//     max_price: number;
//     avg_price: number;
//     items_looked_up: number;
//     graph_prices: string[];
//     graph_labels: number[];
//     search_recommendations: ProductProps[];
// };


import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Product, { ProductProps } from "./Product";
import Barch from "./Barch";
import Recomended from "./Recomended";

type SearchResponse = {
    min_price_product: ProductProps;
    max_price_product: ProductProps;
    min_price: number;
    max_price: number;
    avg_price: number;
    items_looked_up: number;
    graph_prices: string[];
    graph_labels: number[];
    search_recommendations: ProductProps[];
};

const Search: React.FC = () => {
    //   const navigate = useNavigate();
    const [minPriceProduct, setMinPriceProduct] = useState<ProductProps | null>(null);
    const [maxPriceProduct, setMaxPriceProduct] = useState<ProductProps | null>(null);
    const [searchRecommendations, setSearchRecommendations] = useState<ProductProps[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [avgPrice, setAvgPrice] = useState<number | null>(null);
    const [itemsLookedUp, setItemsLookedUp] = useState<number | null>(null);
    const [graphPrices, setGraphPrices] = useState<string[]>([]);
    const [graphLabels, setGraphLabels] = useState<number[]>([]);

    const handleSearch = () => {
        setMinPriceProduct(null);
        setMaxPriceProduct(null);
        setSearchRecommendations([]);
        setMinPrice(null);
        setMaxPrice(null);
        setAvgPrice(null);
        setItemsLookedUp(null);
        setGraphPrices([]);
        setGraphLabels([]);
        setSearchPerformed(true);

        axios
            .get<SearchResponse>(`http://127.0.0.1:8000/search/${searchQuery}`)
            .then((res) => {
                const {
                    min_price_product,
                    max_price_product,
                    min_price,
                    max_price,
                    avg_price,
                    items_looked_up,
                    graph_prices,
                    graph_labels,
                    search_recommendations,
                } = res.data;
                setMinPriceProduct(min_price_product);
                setMaxPriceProduct(max_price_product);
                setSearchRecommendations(search_recommendations);
                setMinPrice(min_price);
                setMaxPrice(max_price);
                setAvgPrice(avg_price);
                setItemsLookedUp(items_looked_up);
                setGraphPrices(graph_prices);
                setGraphLabels(graph_labels);
                // navigate(`/search/${searchQuery}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <div className="input-group my-5">
                <input
                    type="text"
                    placeholder="პროდუქტის ძიება"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                    autoFocus
                />
                <button onClick={handleSearch} className="btn btn-primary">ძიება</button>
            </div>

            {searchPerformed && minPriceProduct && maxPriceProduct && (
                <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
                    <div className="row">
                        <div className="col-6">
                            <h6 className="my-3">მინიმალური ფასი⬇:</h6>
                            <Product {...minPriceProduct} />
                        </div>
                        <div className="col-6">
                            <h6 className="my-3">მაქსიმალური ფასი⬆:</h6>
                            <Product {...maxPriceProduct} />
                        </div>
                    </div>
                </div>
            )}

            {/* {searchPerformed && maxPriceProduct && (
        <div>
          <h4>Maximum Price Product:</h4>
          <Product {...maxPriceProduct} />
        </div>
      )} */}


            {searchPerformed && minPrice && maxPrice && avgPrice && itemsLookedUp && minPriceProduct && maxPriceProduct && (
                <div className="d-flex my-5 justify-content-center align-items-center">
                    <table className="table mt-5">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">მინიმალური ფასი</th>
                                <th scope="col">მაქსიმალური ფასი</th>
                                <th scope="col">საშუალო ფასი</th>
                                <th scope="col">ნივთების რაოდენობა</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>{minPrice}</td>
                                <td>{maxPrice}</td>
                                <td>{avgPrice}</td>
                                <td>{itemsLookedUp}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {searchPerformed && graphLabels && graphPrices && minPriceProduct && maxPriceProduct && (
                <div className="w-100 d-flex justify-content-center align-items-center border border-primary rounded">
                    <Barch data={graphLabels} labels={graphPrices}></Barch>
                </div>
            )}

            {searchPerformed && searchRecommendations.length > 0 && (
                <div className="w-100 mb-5">
                    <div className='container-fluid d-flex justify-content-center mt-3'>
                        <h4 className="mt-3">ძებნის რეკომენდაციები:</h4>
                    </div>
                    <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
                        <div className="row">
                            {/* <div className="col-6">
                                <h6>Minimum price:</h6>
                                <Product {...minPriceProduct} />
                            </div>
                            <div className="col-6">
                                <h6>Maximum price:</h6>
                                <Product {...maxPriceProduct} />
                            </div> */}
                            <Recomended products={searchRecommendations} />
                        </div>
                    </div>
                </div>
            )}

            {searchPerformed && !minPriceProduct && !maxPriceProduct && searchRecommendations.length === 0 && (
                <div className="my-4 d-flex justify-content-center align-items-center">
                    <p className="alert alert-danger">
                        No search results found !
                    </p>
                </div>
            )}
        </div>
    );
};

export default Search;
