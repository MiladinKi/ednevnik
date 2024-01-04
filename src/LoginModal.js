import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useState } from 'react';

const LoginModal = ({onCloseModal}) =>{
    const[username, setUsername] = useState();
    const[password, setPassword] = useState();

    
      const userLogin = () =>{
   
    //  localStorage.setItem("token", "1234abcd");
    // }

   // const userLogin =async () =>{
      //ovako kada imamo u backendu, samo paziti na url adresu
    //     let response = await fetch('http://localhost:8080/finalProject/login', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type":"application/json",
    //         },
    //         body: JSON.stringify({
    //             username: "test",
    //             password: "test"
    //         }),
    //     });
    //     if(response.ok){
    //         let token = await response.json();
    //         //ubacujemo token u local storage
    //         localStorage.setItem("token", token);
    //     }else{
    //         console.log("Neuspeh slanja!");
    //     }
    // }

        if(username === 'test' && password === 'test'){
          localStorage.setItem("user", "test");
          onCloseModal();
        }
 }
  
    return (
        <div>
          <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Login"}
            </DialogTitle>
            <DialogContent sx={{display:"flex", flexDirection:"column"}}>
              <TextField label="Username" variant="outlined" required sx={{marginBottom:"10px"}} onChange={(e)=>{setUsername(e.target.value)}}/>
              <TextField label="Password" variant="outlined" required onChange={(e)=>{setPassword(e.target.value)}}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{userLogin()}}>Login</Button>
              <Button onClick={()=>{onCloseModal()}}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default LoginModal;