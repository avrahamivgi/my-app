import axios from "axios";
import { SERVER_URL } from "./config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//need 1.type:(get,post)etc. 2.token 3.query 4.body and 5.query
//thank for YOSSI HALILI for helping making this call!
//its not entirly copy paste ;) (because i understand the procces)
async function genericAxios(httpMethod,endpoint,body,query) {

  //trying to retrive the token from the local storage
  try{

    //retrive the token
    const headers = {
      Authorization:`Token ${localStorage.getItem("token")}`}
    
    //config that will orgnize the data
    const config = {
      method : httpMethod,
      url : SERVER_URL +endpoint,
      headers : headers
    }

    //if there is query its will be added to the url
    //using lib "query-string" that handle the query params
    //in case of more than one param
    if (query) {
      const queryString = `?${new URLSearchParams(query).toString()}`
      config.url += `${queryString}`;
    }

    //ig there is body and its post or put method - its will be added to the call
    if (body) {
      const formData = new FormData();
      for (const key in body) {
        formData.append(key, body[key]);
      }
      config.data = formData;
      
    }

    

    //The Axios Call
    console.log(config)
    const response = await axios(config);
    

    //for DEBUGG
    //console.log(config);

    //handle the call
    if (response.status >= 200 && response.status < 300){
      return response.data;
    }else{
 
      throw new Error(`The Response Failed ${ response.status,response.data}`)

    }

  }catch(error){
    toast.error(JSON.stringify(error.response.data), {
      position: toast.POSITION.TOP_CENTER
  });
      console.log(new Error(`Error:${error.message}`)) 
  }


}export default genericAxios