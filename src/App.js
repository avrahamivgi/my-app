import React from "react";
import SiteRoutes from "./pages/SiteRoutes";
import ButtonAppBar from "./Components/Header";
import genericAxios from "./genericAxios";
import Footer from "./Components/Footer";
function App() {

 

  return (
    <>
    <ButtonAppBar/>{/*The Header */}
    <SiteRoutes/> {/* This Will display by the url*/}
    {/* {<Footer/>} */}
    </>
         );
  }
export default App;
