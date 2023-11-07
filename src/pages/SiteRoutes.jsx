import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Public/Home'
import UserHome from './User/UserHome'
import WorkerHome from './Worker/WorkerHome'
import WorkerCust from './Worker/WorkerCust'

const SiteRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/user' element={<UserHome/>}/>
            <Route path='/worker' element={<WorkerHome/>}/>
            <Route path='/worker/cust' element={<WorkerCust/>}/>
        </Routes>


    </div>
  )
}

export default SiteRoutes