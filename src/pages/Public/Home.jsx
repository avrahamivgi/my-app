import React, { useEffect, useState } from 'react'
import Carousela from '../../Components/ImageSlider'
import { TextField} from '@mui/material'
import genericAxios from '../../Components/genericAxios'
import SearchBooks from '../../Components/SearchBooks'
import "./books.css"

const Home = () => {

  //if the user is logged he will be redirected to User Home Page
  if (localStorage.getItem("username")) {
    window.location.href = '/user';
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <h1 style={{textAlign:"center"}}>דף הבית</h1>
        <h2>מהנעשה במקומנו</h2>
        <Carousela/>
        <SearchBooks/>
      </div>
  )
}

export default Home