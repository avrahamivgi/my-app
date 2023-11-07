import React, { useState , useEffect} from 'react';
import { Box, Paper, Button, Modal, IconButton, CircularProgress } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAllSharp';
import "./workerStyle.css"
import genericAxios from '../../genericAxios';


const WorkerDashboard = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  
  //
  const openViewModal = () => {
    setIsViewModalOpen(true);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsViewModalOpen(false);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };
  
  //making fetch calls tp the server
  //view books
  useEffect(()=>{
    const fetchData = async()=>{
      try{        
      const result = await genericAxios("GET","lib_worker/customers",null,null)
  
      setData(result);
      setLoading(false);
      console.log(result);
      }
      catch(error){
        console.error(`error fetching: ${error}`);
        setLoading(false);
      }
    }
    fetchData()
    
  },[isViewModalOpen])

    //ensure that the call completed
    if (loading) {
      return <CircularProgress/>

    }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
      <h1>דף הבית לעובדים</h1>
      <Box
        sx={{
          display: 'flex',
          alignItems:"center",
          justifyContent:"center",
          flexWrap: 'wrap',
        }}
      >

          
        <Paper elevation={6} sx={{ padding: '40px', background: '#f0f0f0' }}>
        <div sx={{
          display: 'flex',
          alignItems:"center",
          justifyContent:"center",
          flexWrap: 'wrap',
          flexDirection: "column",
        }}>
        <IconButton color='primary' onClick={()=>{window.history.back()}} >
          <ReplyAllIcon/>
        </IconButton>
        <h3>ניהול מאגר הספרייה</h3>
        </div>
          <Button
            variant="contained"
            style={{ width: '100%', padding: '15px', marginBottom: '10px', backgroundColor: 'gray', color: 'white' }}
            onClick={openViewModal}
          >
            צפייה בלקוחות
          </Button>
          <Button
            variant="contained"
            style={{ width: '100%', padding: '15px', marginBottom: '10px', backgroundColor: 'gray', color: 'white' }}
            onClick={openAddModal}
          >
            הוספת לקוח
          </Button>
          <Button
            variant="contained"
            style={{ width: '100%', padding: '15px', marginBottom: '10px', backgroundColor: 'gray', color: 'white' }}
            onClick={openEditModal}
          >
            עריכת לקוח
          </Button>
          <Button
            variant="contained"
            style={{ width: '100%', padding: '15px', backgroundColor: 'gray', color: 'white' }}
            onClick={openDeleteModal}
          >
            מחיקת לקוח
          </Button>
        </Paper>
      </Box>

      <Modal open={isViewModalOpen} onClose={handleCloseModals}>
        <div className='coolModal'>
          <h2>צפייה בלקוחות</h2>

        </div>
      </Modal>

      <Modal open={isAddModalOpen} onClose={handleCloseModals}>
        <div className='coolModal'>
          <h2>Add Customer</h2>
          {/* Add your content for add customer here */}
        </div>
      </Modal>

      <Modal open={isEditModalOpen} onClose={handleCloseModals}>
        <div className='coolModal'>
          <h2>Edit Customer</h2>
          {/* Add your content for edit customer here */}
        </div>
      </Modal>

      <Modal open={isDeleteModalOpen} onClose={handleCloseModals}>
        <div className='coolModal'>
          <h2>Delete Customer</h2>
          {/* Add your content for delete customer here */}
        </div>
      </Modal>
    </div>
  );
};

export default WorkerDashboard;
