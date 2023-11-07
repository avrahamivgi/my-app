import {Box  , Button} from '@mui/material';
import React,{useEffect, useState} from 'react'
import WorkerDashboard from './WorkerCustomer';




const WorkerHome = () => {

  //selected button color
  const [selectedButton , setSelectedButton] = useState(null)

  //user redirecting
  const user = localStorage.getItem("userPerm")
  
  switch (user) {
    case "customer":
      window.location.href = "/customer"
      break;
    case "manager":
      window.location.href = "/manager"
      break;

    case null:
      window.location.href = "/"
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 100,
            height: 50,
          },
        }}
      >
          <Button
            variant="contained"
            style={{ width: '20%',backgroundColor: selectedButton === 'cust' ? 'blue' : 'gray',
            color: 'white' }}
            onClick={()=>{setSelectedButton("cust")}}
          >
            
            צרכנים
          </Button>
          <Button
            variant="contained"
            style={{ width: '20%',backgroundColor: selectedButton === 'books' ? 'blue' : 'gray', color: 'white' }}
            onClick={()=>{setSelectedButton("books")}}
          >
            ספרים
          </Button>
          <Button
            variant="contained"
            style={{ width: '20%', color: 'white',backgroundColor: selectedButton === 'loans' ? 'blue' : 'gray' }}
            onClick={()=>{setSelectedButton("loans")}}
          >
            השאלות
          </Button>

      </Box>
    <WorkerDashboard mode={selectedButton}/>
    </div>
  );
  
}

export default WorkerHome