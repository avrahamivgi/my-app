import React from 'react'
import Carousela from '../../Components/ImageSlider'
import SearchBooks from '../../Components/SearchBooks'
import "./books.css"

const Home = () => {

  //user redirecting
  const user = localStorage.getItem("userPerm")
  
  switch (user) {
    case "customer":
      window.location.href = "/user"
      break;
    case "worker":
      window.location.href = "/worker"
      break;
    case "manager":
      window.location.href = "/manager"
      break;
  }


return (
    <div style={{textAlign:"center"}}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <h1 >דף הבית</h1>
        <h2>מהנעשה במקומנו</h2>
        <Carousela/>
      </div>
        <SearchBooks/>
      </div>
  )
}

export default Home