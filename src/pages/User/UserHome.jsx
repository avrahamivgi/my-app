import React, { useEffect, useState } from 'react'
import "../Public/books.css"
import SearchBooks from '../../Components/SearchBooks'
import ShowRents from '../../Components/ShowRents'

const UserHome = () => {

  return (
    <div style={{textAlign:"center"}}>
      <ShowRents/>
      <SearchBooks/>
      
      </div>
  )
}

export default UserHome