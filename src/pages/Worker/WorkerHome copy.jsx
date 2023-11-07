import { Paper , Box  , Button} from '@mui/material';
import React from 'react'



const WorkerHome = () => {

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
      <h1>דף הבית לעובדים</h1>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 450,
            height: 300,
          },
        }}
      >
        <Paper elevation={6} sx={{ padding: '40px', background: '#f0f0f0'}}>
          <h3>ניהול מאגר הספרייה</h3>
          <Button
            variant="contained"
            style={{ width: '100%', padding: '15px', marginBottom: '10px', backgroundColor: 'gray', color: 'white' }}
            onClick={()=>{window.location.href = "/worker/cust"}}
          >
            צרכנים
          </Button>
          <Button
            variant="contained"
            style={{ width: '100%', padding: '15px', marginBottom: '10px', backgroundColor: 'gray', color: 'white' }}
          >
            ספרים
          </Button>
          <Button
            variant="contained"
            style={{ width: '100%', padding: '15px', backgroundColor: 'gray', color: 'white' }}
          >
            השאלות
          </Button>
        </Paper>
      </Box>
      <hr/>
    </div>
  );
  
}

export default WorkerHome