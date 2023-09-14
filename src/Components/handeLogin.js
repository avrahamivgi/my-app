import React, { useState } from 'react';
import { Modal,TextField, Box , Typography , Button} from '@mui/material';
import genericAxios from './genericAxios';
import { useNavigate } from 'react-router-dom';


function LoginModal({ open, onClose }) {
    const [error,setError] = useState(false)

    async function handleSubmit(event) {
        //prevent from the browser to redirect the user
        event.preventDefault()
    
        //retriving the required values
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        
    
    
        //lets make the axios call
        const data = await genericAxios("POST","public/obtain_token",{username,password},null)
    
    
        //saving the token if the call succseed
        if (data) {
            localStorage.setItem("token" , data["token"])
            console.log("login succsesfully");
            onClose(false)
            localStorage.setItem("username",username)
            window.location.href = '/user';

    }else{
        setError(true)
    }
}

  return (
    <Modal open={open} onClose={onClose}>
    <form onSubmit={handleSubmit}>
      <Box sx={{
        width: 400,
        bgcolor: 'background.paper',
        p: 2,
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginLeft: "auto",
      }}>
        <Typography variant="h6" component="h2">
          כניסה
        </Typography>
        <TextField id="my_user" label="שם משתמש" variant="outlined" name="username" style={{marginBottom: 5}}/>
        <TextField id="my_pass" label="סיסמה" variant="outlined" name="password" type='password'/>
        {error && <h3 style={{color: "red"}}>שגיאה בהזנת הפרטים</h3>}
        <Button type="submit">שליחה</Button>
        <Button onClick={()=>{onClose(false); setError(false);}}>סגירה</Button>
      </Box>
    </form>
    </Modal>
  );

}

export default LoginModal;
