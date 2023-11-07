import React, { useEffect, useState } from 'react'
import "../Public/books.css"
import SearchBooks from '../../Components/SearchBooks'
import ShowRents from '../../Components/ShowRents'
import { userRedirecting } from '../../Components/handeLogin'

const UserHome = () => {

  //user redirecting
  const user = localStorage.getItem("userPerm")
  
  switch (user) {
    case "worker":
      window.location.href = "/worker"
      break;
    case "manager":
      window.location.href = "/manager"
      break;

    case null:
      window.location.href = "/"
  }

  return (
    <div style={{textAlign:"center"}}>
      <ShowRents/>
      <SearchBooks/>
      
      </div>
  )
}

export default UserHome