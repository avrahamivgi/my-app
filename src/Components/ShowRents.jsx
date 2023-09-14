import React,{useState,useEffect} from 'react'
import genericAxios from './genericAxios'
import { SERVER_URL_V2 } from '../config';

function ShowRents() {
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true)

    //retriving the rents of the user with gernericAxios
    useEffect(()=>{
        const fetchData = async()=>{
          try{
          const result = await genericAxios("GET","user/rents",null,null)
          setData(result);
          console.log(result);
          setLoading(false);
          }
          catch(error){
            console.error(`error fetching: ${error}`);
            setLoading(false);
          }
        }

        fetchData();
      },[])
    
        //ensure that the call completed
        if (loading) {
          return <div>Loading...</div>;
        }
  return (
<div>
  <h2>השאלות הספרים שלי</h2>
  {!data && <h3>לא נמצאו השאלות</h3>}
  <table style={{backgroundColor:"#f9f9f9" , margin:"0 auto"}}>
  {data && <thead>
      <tr> 
      <style>{`th {border-bottom: 1px solid black;padding: 5px;}`}</style>
        <th>ספרייה</th>
        <th>איחור</th>
        <th>תאריך סיום השאלה</th>
        <th>שם הספר</th>
        <th>תמונה</th>
      </tr>
    </thead>}

    <tbody >
        
      {data && data.map((rent) => (
        <tr key={rent.id}>
          <td>{rent.lib_details.name}</td>
          <td>{rent.is_late ? <p style={{color:"red"}}>כן</p> : "לא"}</td>
          <td>{rent.return_end_date}</td>
          <td>{rent.book_details.name}</td>
          <td>
            <img
              src={`${SERVER_URL_V2}${rent.book_details.cover_img}`}
              alt="Book Cover"
              width="80"
            />
          </td>
          
        </tr>
      ))}
    </tbody>
  </table>
</div>
  )
}

export default ShowRents