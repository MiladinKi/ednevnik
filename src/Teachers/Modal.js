import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react"

export default function Modal({onCloseModal}){

const[open, setOpen] = useState(false);

const handleClickOpen = () =>{
        setOpen(true);        
}

const handleClose = (closeModal) =>{
    onCloseModal(closeModal);
};

return (

    <Dialog
      open={true}
      onClose={()=>{handleClose(false)}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete teacher"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you shure want to delete this teacher?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{handleClose(true)}}>Yes</Button>
        <Button onClick={()=>{handleClose(false)}}>No</Button>
      </DialogActions>
    </Dialog>
)

}