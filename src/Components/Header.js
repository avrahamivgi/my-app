import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginModal from './handeLogin';
import { REACT_URL } from '../config';

//func for logout the system
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userPerm");
  
  window.location.href = `${REACT_URL}`
}

export default function ButtonAppBar() {
  const [toggleModal , setToggleModal] = React.useState(false)
  let username = localStorage.getItem("username")

  return (
<Box sx={{ flexGrow: 1 }}>
  <AppBar position="static">
    <Toolbar sx={{ justifyContent: 'center' }}>
      <img src='\jru_logo.png' style={{ maxWidth: "40px" }} />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
        ספריות ירושליים
      </Typography>
      {username ? (<>
        <Button color="inherit" onClick={logout} style={{border:"1px solid white" ,marginRight:10}}>התנתק</Button>
        <Typography variant="h6" sx={{ marginRight: '10px', color:"lime"}}>
          {username}
        </Typography>
        <Typography variant="h6" sx={{ marginRight: '10px'}}>שלום</Typography>

        </> 
      ) : (
        <Button color="inherit" onClick={() => {setToggleModal(true)}}>
          התחבר
        </Button>
      )}
 <LoginModal open={toggleModal} onClose={setToggleModal}/>
    </Toolbar>
  </AppBar>
</Box>
  );
}
