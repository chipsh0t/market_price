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

export default function FirstPage() {
  //   // let cntnt
  //   // const [content, setContent] = useState(cntnt)
  //   // useEffect(() => {
  //   //   axios.get("http://127.0.0.1:8000/")
  //   //     .then(res => {
  //   //       setContent(res.data)
  //   //         // console.log(res.data[0])

  //   //     }).catch(err => { console.log(err) })
  //   // }, [])
  //   // console.log('HERE IS CONTENT !!!!')
  //   // console.log(content)
  //   // if (content != null)
  //   //   return (
  //   //     <div className="app1" >
  //   //       <Hdr></Hdr>
  //   //       <Search ></Search>
  //   //       <Recomended products={[new Product(content.res.data[0]),
  //   //       new Product(content.res.data[1]),
  //   //       new Product(content.res.data[2]),
  //   //       new Product(content.res.data[3])
  //   //       ]}></Recomended>
  //   //       {/* <Product id={content.res.data[0].id} productURL={content.res.data[0].productURL} name={content.res.data[0].name} price={content.res.data[0].price} imageURL={content.res.data[0].imageURL}></Product> */}
  //   //     </div>
  //   //   )
  //   // return (
  //   //   <div className="app1">
  //   //     <Hdr></Hdr>
  //   //     <Search ></Search>
  //   //   </div>
  //   // )

  //   // const [hot_items, setItems] = useState([])
  //   // useEffect(() => {
  //   //   axios.get('http://127.0.0.1:8000/')
  //   //     .then(res => setItems(res.data))
  //   //     .catch(err => console.log(err))
  //   // }, [])
  //   // console.log('HOT ITEMS !')
  //   // console.log(hot_items)
  //   // if (hot_items.length == 0) {
  //   //   return (
  //   //     <div className="app1" >
  //   //       <Hdr></Hdr>
  //   //       <Search ></Search>
  //   //     </div>
  //   //   )
  //   // }else{
  //   //   return (
  //   //     <div className="app1" >
  //   //       <Hdr></Hdr>
  //   //       <Search ></Search>
  //   //       {/* <Recomended products={[new Product(hot_items[0]),
  //   //       new Product(hot_items[1]),
  //   //       new Product(hot_items[2]),
  //   //       new Product(hot_items[3])
  //   //       ]}></Recomended> */}
  //   //       <Recomended products={hot_items}></Recomended>
  //   //     </div>
  //   //   )
  //   // }

  const [hotItems, setHotItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/')
      .then(res => {
        setHotItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="app1 w-100">
        <Hdr />
        <Search />
        <div className="spinner-border text-primary mt-5" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="app1 w-100">
        <Hdr />
        <Search />
        {hotItems.length === 0 ? (
          <p className='text text-danger'>ნივთები ვერ მოიძებნა !</p>
        ) : (
          <div className="w-100">
            <div className='container-fluid d-flex justify-content-center'>
              <h4>პოპულარული პროდუქცია💥: </h4>
            </div>
            <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
              <div className="row">
                <Recomended products={hotItems} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}


