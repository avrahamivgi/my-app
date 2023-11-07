import React, { useState, useEffect } from 'react';
import genericAxios from '../../genericAxios';
import { TextField, Button, Modal, Box,FormControlLabel,Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL_V2 } from '../../config';
import './cellstyle.css'
import SearchBooks from '../../Components/SearchBooks';

function WorkerDashboard(props) {
  //state for the fetch
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(true);
  const [idSearch, setIdSearch] = useState(null);

  // State for the modal
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [lib] = useState(localStorage.getItem("userLib"))
  const [theBirthDate,setTheBirthDate] = useState ('')
  const [custID,setCustID] = useState('')

  //state for delete modal
  const [openDeleteModal,setOpenDeleteModal] = useState(false)
  const [idDeleteModal,setidDeleteModal] = useState(null)

  //state for loans modal
  const [openLoansModal, setLoansModal] = useState(false)
  const [custIDForLoans, setCustIDForLoans] = useState("")
  const [loansData,setDataLoans] = useState("")
  const [addModalOpen,setAddModalOpen] = useState(false)

  function handelOpenForDeleteModal(id) {
    setidDeleteModal(id)
    setOpenDeleteModal(true)

  }

  function handelDelete() {
    const deleteRecord = async () => {
      console.log({ id:idDeleteModal });
      try {
        const result = await genericAxios('DELETE', 'lib_worker/customers', null, { id: idDeleteModal });
        setData(result);
        {console.log(data)}
        setLoading(false);
        setSearching(!searching)
      } catch (error) {
        console.error(`Error fetching: ${error}`);
        setLoading(false);
      }
    };

    deleteRecord();
    setOpenDeleteModal(false)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await genericAxios('GET', 'lib_worker/customers', null, { id: idSearch });
        setData(result);
        {console.log(data)}
        setLoading(false);
        
      } catch (error) {
        console.error(`Error fetching: ${error}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [searching]);

  //open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to handle input change for 'name'
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Function to handle input change for 'password'
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  
  // Function to handle input change for 'password'
  const handleBirthDateChange = (event) => {
    setTheBirthDate(event.target.value);
  };

  const handleCustID = (event) => {
    setCustID(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    console.log(name,password,lib,custID,theBirthDate);

    const fetchData = async () => {
      try {
        const result = await genericAxios('POST', 'lib_worker/customers', {"name":name,"password":password,"customer_id":custID,"birth_date":theBirthDate,"lib":lib}, null);
        setData(result);
        {console.log(data)}
        setLoading(false);
        setSearching(!searching)
      } catch (error) {
        console.error(`Error fetching: ${error}`);
        setLoading(false);
      }
    };

    fetchData();
    
    setOpen(false)
  };

  function handelDeleteLoan(loanId) {

    const fetchData = async () => {
      try {
        const result = await genericAxios('DELETE', 'lib_worker/rents', null, {id:loanId});
        setData(result);
        {console.log(data)}
        setSearching(!searching)

      } catch (error) {
        console.error(`Error fetching: ${error}`);
      }
    };

    fetchData()
  }
  const calculateAge = (birthDate) => {
    const birthDateObject = new Date(birthDate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDateObject.getFullYear();
    return age;
  };

  const cellStyle = {
    border: '1px solid black',
    padding: '10px',
  };
  

  //making modal for every user
  function user_modal(cust) {
    const fetchData = async () => {
      try {
        const result = await genericAxios('GET',"lib_worker/rents", null, {id:cust});
        setDataLoans(result);
        {console.log(result)}
        setLoading(false);
        setSearching(!searching)
      } catch (error) {
        console.error(`Error fetching: ${error}`);
        setLoading(false);
      }
    };

    fetchData();
    setLoansModal(!openLoansModal)
    setDataLoans("")
  }
  function handelAddLoanModal() {
    setLoansModal(false)
    setAddModalOpen(true)
  }
  return (
    <div>
        <ToastContainer />
      <hr />
      <Button onClick={() => setSearching(!searching)}>חפש</Button>
      <TextField
        style={{ marginBottom: '20px' }}
        id="standard-basic"
        label="חיפוש לפי ת.ז."
        variant="filled"
        dir="rtl"
        onChange={(e) => setIdSearch(e.target.value)}
      />


      <table style={{ backgroundColor: '#f9f9f9', margin: '0 auto',borderCollapse: 'collapse',width: '100%' }}>
        {(
          <thead>
            <tr>
              <style>{`th {border-bottom: 1px solid black;padding: 5px;}`}</style>
              <th style={cellStyle}>ספרייה</th>
              <th style={cellStyle}>פלאפון</th>
              <th style={cellStyle}>גיל</th>
              <th style={cellStyle}>שם</th>
              <th style={cellStyle}>מספר זהות</th>
              <th className="cellStyle" style={{cursor:"pointer"}}><AddIcon style={{ color: 'green' }} onClick={handleOpen} /></th>
            </tr>
          </thead>
        )}

        <tbody>
          {Array.isArray(data) &&
            data.map((cust) => (
              
              <tr key={cust.customer_id}>
                <td style={cellStyle}>{cust.lib_details.name}</td>
                <td style={cellStyle}>{cust.phone}</td>
                <td style={cellStyle}>{cust.birth_date && calculateAge(cust.birth_date)}</td>
                <td style={cellStyle}>{cust.name}</td>
                <td className="cellStyle" style={{color:"blue" , cursor:"pointer"}} onClick={()=>{user_modal(cust.customer_id)}}>
                {cust.customer_id}</td>
                <td className="cellStyle" style={{cursor:"pointer"}}><DeleteIcon style={{ color: '#dd7973' }} onClick={()=>{handelOpenForDeleteModal(cust.customer_id)}}/></td>
              </tr>
            ))}
        </tbody>
      </table>
      {data && !Array.isArray(data) && <h2>{data.info}</h2>}

      {/* Modal */}
      <Modal open={open} dir="rtl" onClose={()=>{setOpen(false)} }>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 270,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 2,
          }}
        >
          <h2 style={{textAlign:"center"}}>יצירת משתמש</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="שם"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <br/><br/>
          <TextField
            label="סיסמה"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
          <br/><br/>
            <TextField
            label="מספר זהות"
            variant="outlined"
            value={custID}
            onChange={handleCustID}
          />
          <br/><br/>
          <TextField
            label="מספר ספרייה"
            variant="outlined"
            value={lib}
          />
                    <h5 style={{margin:1}}>תאריך לידה</h5>
          <TextField
            type="date"
            variant="outlined"
            value={theBirthDate}
            onChange={handleBirthDateChange}
          />

          <Button type='submit'>
            אשר
          </Button>
          </form>
        </Box>
      </Modal>
      <Modal open={openDeleteModal} onClose={()=>{setOpenDeleteModal(false)}}>
      <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 2,
            direction:"rtl"
          }}
        >

          <h2 style={{textAlign:"center"}}>למחוק?</h2>
          <Button style={{color:"#4681f4"}} onClick={() => {setOpenDeleteModal(false)}}>ביטול</Button>
          <Button style={{color:"#ED0800"}} onClick={() => {handelDelete({idDeleteModal})}}>מחיקה</Button>
          </Box>
      </Modal>

      {/* viewing removing and extending loans */}
    <Modal open={openLoansModal} dir="rtl" onClose={()=>{setLoansModal(false)} }>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 2,
          }}
        >
          <h2 style={{textAlign:"center"}}>{custIDForLoans}</h2>

  <table style={{backgroundColor:"#f9f9f9" , margin:"0 auto"}}>
  {loansData && <thead>
      <tr> 
      <style>{`th {border-bottom: 1px solid black;padding: 5px;}`}</style>
      <th  style={{cursor:"pointer"}}><AddIcon style={{ color: 'green' }} onClick={handleOpen} /></th>

        <th>ספרייה</th>
        <th>איחור</th>
        <th>תאריך סיום השאלה</th>
        <th>שם הספר</th>
        <th>תמונה</th>
      </tr>
    </thead>}

    <tbody >
        
    {loansData ? (
  loansData.map((rent) => (
    <tr key={rent.id}>
            <td  style={{cursor:"pointer"}}><DeleteIcon style={{ color: '#dd7973' }} onClick={()=>{handelDeleteLoan(rent.id)}}/></td>
      <td>{rent.lib_details.name}</td>
      <td>{rent.is_late ? <p style={{ color: "red" }}>כן</p> : "לא"}</td>
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
  ))
) : (
  <>
  <h2>לא נמצאו השאלות</h2>
  <h3 style={{textAlign:"center",color:"blue" ,cursor:"pointer" }} onClick={()=>{handelAddLoanModal()}}>הוספה</h3>
  </>
)}

    </tbody>
  </table>
  </Box>
  </Modal>
  <Modal open={addModalOpen} onClose={()=>{setAddModalOpen(false)}}>
  <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 2,
            direction:"rtl"
          }}
        >
 <SearchBooks/>
  </Box>
 
  </Modal>
    </div>
  );
}

export default WorkerDashboard;
