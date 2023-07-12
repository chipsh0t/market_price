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
import ProfilePage from './ProfilePage'


function App() {
   return(
      <div className='app' id="app">
        <BrowserRouter>
        <Routes>
          {/* <Route index element={<FirstPage/>}></Route>
          <Route path="ProfilePage" element={<ProfilePage/>}></Route>
          <Route path="link2"  element={<Hdr/>}></Route>
          <Route path="link3"  element={<Hdr/>}></Route>
          <Route path='/search/:query' element={<Search />} /> */}
          <Route path='/' element={<FirstPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/link2' element={<Hdr />} />
          <Route path='/link3' element={<Hdr />} />
          {/* <Route path='/search/:query' element={<Search />} /> */}
        </Routes>
        </BrowserRouter>
      </div>
   )
}

export default App 

