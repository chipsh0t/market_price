import { useEffect, useState } from "react";
import Recomended from "./Recomended";
import Product from "./Product";
import axios from "axios";

let initial_data = {
    "interacted_products": [
        {
            "id": 45,
            "productURL": "https://www.mymarket.ge/ka/pr/28215527/teqnika/audio-video-fototeqnika/televizori/81sm-SMART-televizori-yvelaze-dabal-fasad?OfferType=SuperVip",
            "imageURL": "https://static.my.ge/mymarket/photos/large/0317/28215527_1.jpg?v=6",
            "name": "81სმ SMART ტელევიზორი ყველაზე დაბალ ფასად",
            "price": 329.0
        },
        {
            "id": 67,
            "productURL": "https://www.mymarket.ge/ka/pr/27906767/teqnika/kavshirgabmuloba/smart-saaTi/apple-watch-SE?OfferType=VipUsual",
            "imageURL": "https://static.my.ge/mymarket/photos/large/0209/27906767_1.jpg?v=2",
            "name": "apple watch SE",
            "price": 550.0
        },
        {
            "id": 12,
            "productURL": "https://www.mymarket.ge/ka/pr/28750826/teqnika/audio-video-fototeqnika/obieqtivebi/canon-24mm-f14-II?OfferType=VipPlus",
            "imageURL": "https://static.my.ge/mymarket/photos/large/0601/28750826_1.jpg?v=6",
            "name": "canon 24mm f1.4 II",
            "price": 1800.0
        },
        {
            "id": 382,
            "productURL": "https://www.mymarket.ge/ka/pr/28974884/teqnika/kavshirgabmuloba/mobiluri-telefoni/Xiaomi-Redmi-10C-64-4GB--1-wliani-garantiiT-ganvadebiT?OfferType=VipUsual",
            "imageURL": "https://static.my.ge/mymarket/photos/large/0706/28974884_1.jpg?v=0",
            "name": "Xiaomi Redmi 10C (64/4GB) - 1 წლიანი გარანტიით/განვადებით",
            "price": 249.0
        }
    ],
    "profile_recommendations": [
        {
            "id": 45,
            "productURL": "https://www.mymarket.ge/ka/pr/28215527/teqnika/audio-video-fototeqnika/televizori/81sm-SMART-televizori-yvelaze-dabal-fasad?OfferType=SuperVip",
            "imageURL": "https://static.my.ge/mymarket/photos/large/0317/28215527_1.jpg?v=6",
            "name": "81სმ SMART ტელევიზორი ყველაზე დაბალ ფასად",
            "price": 329.0
        },
        {
            "id": 67,
            "productURL": "https://www.mymarket.ge/ka/pr/27906767/teqnika/kavshirgabmuloba/smart-saaTi/apple-watch-SE?OfferType=VipUsual",
            "imageURL": "https://static.my.ge/mymarket/photos/large/0209/27906767_1.jpg?v=2",
            "name": "apple watch SE",
            "price": 550.0
        },
        {
            "id": 12,
            "productURL": "https://www.mymarket.ge/ka/pr/28750826/teqnika/audio-video-fototeqnika/obieqtivebi/canon-24mm-f14-II?OfferType=VipPlus",
            "imageURL": "https://static.my.ge/mymarket/photos/large/0601/28750826_1.jpg?v=6",
            "name": "canon 24mm f1.4 II",
            "price": 1800.0
        },
        {
            "id": 382,
            "productURL": "https://www.mymarket.ge/ka/pr/28974884/teqnika/kavshirgabmuloba/mobiluri-telefoni/Xiaomi-Redmi-10C-64-4GB--1-wliani-garantiiT-ganvadebiT?OfferType=VipUsual",
            "imageURL": "https://static.my.ge/mymarket/photos/large/0706/28974884_1.jpg?v=0",
            "name": "Xiaomi Redmi 10C (64/4GB) - 1 წლიანი გარანტიით/განვადებით",
            "price": 249.0
        }
    ]
}

export default function Profile() {

    // const [history, setHistory] = useState(null)
    // const id = sessionStorage.getItem('userid')
    let id = sessionStorage.getItem('userid')
    if (id==null){
        return (
            <div className="mt-5 d-flex jusify-content-center align-items-center">
                <h4 className="text text-danger">გაიარეთ ავტორიზაცია !</h4>
            </div>
        )
    }else{
        const [fetched_data,setFetchedData] = useState(initial_data)
        useEffect(() => {
            axios.get("http://127.0.0.1:8000/profile_page/".concat(id),)
                .then(res => {
                    // setHistory(res.data),
                    //     console.log(res)
                    // fetched_data = res.data
                    setFetchedData(res.data)
                    console.log(res.data)
                }).catch(err => { console.log(err) })
        }, [])
        //   return(
        //     <div className="mt-5 d-flex justify-content-center align-items-center">
        //         <h4 className="text text-danger">სისტემაში გაიარეთ ავტორიზაცია !</h4>
        //     </div>
        //   )
        return (
            <div className="my-5">
                
                <label>ისტორია🕐:</label>
                <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
                        <div className="row w-100">
                            <Recomended products={fetched_data.interacted_products} />
                        </div>
                    </div>
                <label>ყველაზე იაფი ნივთები💲: </label>
                <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
                    <div className="row w-100">
                        <Recomended products={fetched_data.profile_recommendations}></Recomended>
                    </div>
                </div>
            </div>
        )
    }

    // const [history, setHotItems] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/')
    //         .then(res => {
    //             setHotItems(res.data);
    //             setLoading(false);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setLoading(false);
    //         });
    // }, []);

    // if (loading) {
    //     return (
    //         <div className="app1 w-100">
    //             <Hdr />
    //             <Search />
    //             <div className="spinner-border text-primary mt-5" role="status">
    //                 <span className="sr-only"></span>
    //             </div>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div className="app1 w-100">
    //             <Hdr />
    //             <Search />
    //             {hotItems.length === 0 ? (
    //                 <p className='text text-danger'>No items found !</p>
    //             ) : (
    //                 <div className="w-100">
    //                     <div className='container-fluid d-flex justify-content-center'>
    //                         <h4>hot items:</h4>
    //                     </div>
    //                     <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
    //                         <div className="row">
    //                             <Recomended products={hotItems} />
    //                         </div>
    //                     </div>
    //                 </div>
    //             )}
    //         </div>
    //     );
    // }
}