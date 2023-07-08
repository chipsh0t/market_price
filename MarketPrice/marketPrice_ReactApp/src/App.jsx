import { useEffect, useState } from 'react'
import Search from './Search'
import Hdr from './hdr'
import Product from './Product'
import Recomended from './Recomended'
import axios from "axios";
import Statistics from './Statistics'
import Content from './Content'
import './app.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import FirstPage from './FirstPage'


function App() {
   return(
      <div className='app'>
        <BrowserRouter>
        <Routes>
          <Route index element={<FirstPage/>}></Route>
          <Route path="link1" element={<Hdr/>}></Route>
          <Route path="link2"  element={<Hdr/>}></Route>
          <Route path="link3"  element={<Hdr/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
   )
}

export default App
