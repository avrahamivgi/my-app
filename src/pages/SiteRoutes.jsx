import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Public/Home'
import UserHome from './User/UserHome'


const SiteRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/user' element={<UserHome/>}/>
        </Routes>


    </div>
  )
}

export default SiteRoutes