import React,{useState,useEffect} from 'react'
import { TextField ,CircularProgress,FormControlLabel,Checkbox , Box , Button} from '@mui/material'
import { SERVER_URL_V2 } from '../config';
import genericAxios from '../genericAxios';

function SearchBooks() {
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [searchTerm,setSearchTerm] = useState("")
    const [booksByLib,setBooksByLib] = useState(true)
    const [searching,setSearching] = useState(false)
    const toggleLib = () =>{
        setBooksByLib(!booksByLib)
    }

    useEffect(()=>{
      if (searching) {
      const fetchData = async()=>{
        try{
            //if the user is loogged will be 
        let result ;     
         if (localStorage.getItem("userPerm")=="customer" && booksByLib ) {
            result = await genericAxios("GET","user/books",null,{name:searchTerm})
        
        }else if(localStorage.getItem("userPerm")=="worker"){
            result = await genericAxios("GET","public/books",{"lib":localStorage.getItem("userLib")},{name:searchTerm})

        }else{
            result = await genericAxios("GET","public/books",null,{name:searchTerm})
            
        }
        
        setData(result);
        setLoading(false);
        console.log(result);
        }
        catch(error){
          console.error(`error fetching: ${error}`);
          setLoading(false);
        }
      }
      fetchData()}


      
    },[booksByLib, searching])
  
      //ensure that the call completed
      if (loading) {
        return<>
        <CircularProgress />
        </>
      }

  return (
    <div style={{ textAlign: "center" }}>

    <h2>חיפוש ספרים</h2>
    <Button onClick={()=>{setSearching(!searching) }}>חפש</Button>
    {localStorage.getItem("token") && <FormControlLabel control={<Checkbox onClick={()=> {toggleLib()}} />} label="כל הספריות"/>}
    <TextField style={{marginBottom:"20px"}} id="standard-basic"
     label="חפש ספר" 
     variant="filled" 
     dir='rtl'
     
     onChange={(e)=>{setSearchTerm(e.target.value)}} />


    {!data && <h3>לא נמצאו ספרים</h3>}
    <div className="books-container" style={{maxWidth:"70%" , marginLeft:"15%" , marginRight:"15%"}}>

  {(data && data.map((book) => (
    <div className="book-card" key={book.id}>
      <img className='book-cover'
        src={`${SERVER_URL_V2}${book.cover_img}`}
        alt="Book Cover"
        width="200"
        height="300"
      />

      <h4 style={{color:"#336699"}}>{book.name}</h4>
      {localStorage.getItem("userPerm") !== "worker"? (
      <>
        <p>{book.author}</p>
        <p>{book.lib_details.name}</p>
      </>
    ) : null}
    </div>)
     ))}
    </div>
    </div>
  )
}export default SearchBooks