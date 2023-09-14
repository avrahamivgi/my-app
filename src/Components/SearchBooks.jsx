import React,{useState,useEffect} from 'react'
import genericAxios from './genericAxios';
import { TextField } from '@mui/material'
import { SERVER_URL_V2 } from '../config';

function SearchBooks() {
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [searchTerm,setSearchTerm] = useState("")
    
    useEffect(()=>{
      const fetchData = async()=>{
        try{
        const result = await genericAxios("GET","public/books",null,{name:searchTerm})
        setData(result);
        setLoading(false);
        console.log(result);
        }
        catch(error){
          console.error(`error fetching: ${error}`);
          setLoading(false);
        }
      }
      fetchData();
    },[searchTerm])
  
      //ensure that the call completed
      if (loading) {
        return <div>Loading...</div>;
      }

  return (
    <div style={{textAlign:"center"}}>

    <h2>חיפוש ספרים</h2>
    <TextField style={{marginBottom:"20px"}} id="standard-basic"
     label="חפש ספר" 
     variant="filled" 
     dir='rtl'
     
     onChange={(e)=>{setSearchTerm(e.target.value)}} />
    {!data && <h3>לא נמצאו ספרים</h3>}
    <div className="books-container">

  {(data && data.map((book) => (
    <div className="book-card" key={book.id}>
      <img className='book-cover'
        src={`${SERVER_URL_V2}${book.cover_img}`}
        alt="Book Cover"
        width="200"
        height="300"
      />
      <h4 style={{color:"#336699"}}>{book.name}</h4>
      <p>{book.author}</p>
      <p> {book.lib_details.name}</p>
    </div>)
     ))}
    </div>
    </div>
  )
}export default SearchBooks