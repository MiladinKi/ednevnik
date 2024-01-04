import { Box, Button, Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { useState } from "react";
import Modal from "../Teachers/Modal";

const ShowUser = ({user}) =>{
    const[showModal, setShowModal] = useState(false);
    const[userId, setUserId] = useState(null);

    const handleDelete = async()=>{
        let result = await fetch(`http://localhost:8080/api/v1/users/${user.id}`,
        {
            method:"DELETE"
        });
        if(result.ok){
            let r = await result.json();
            console.log(r);
        } else {
            console.log("Brisanje nije uspelo")
        }
        window.location.reload(false);
    }

    const deleteUser = async() =>{
        let result = await fetch(`http://localhost:8080/api/v1/users/${user.id}`,
        {
            method:"DELETE"
        });
        if(result.ok){
            let r = await result.json();
            console.log(r);
        } else {
            console.log("Brisanje nije uspelo")
        }
        window.location.reload(false);
    }

    const handleCloseModal = (deleteUser) =>{
        if(deleteUser){
            handleDelete()
        }
        setShowModal(false);
    }
    const navigate = useNavigate();
    return <Container>
    {showModal && <Modal onCloseModal={handleCloseModal}/>}

     <Card key={user.id} variant="outlined">
       <CardHeader subheader={user.username} sx={{border:"1px solid gray", borderRadius:"3px 3px 0px 0px", 
    textAlign:"center", backgroundColor:"green"}}>
       
       </CardHeader>
       <CardContent sx={{display:"flex", flexDirection:"column", alignContent:"center", flexWrap:"wrap", backgroundColor:"lightgreen", textAlign:"center"}}>
            <Typography>ID: {user.id}</Typography>
            <Typography>Email: {user.email}</Typography>
        <Box>
            <InfoIcon sx={{cursor:"pointer"}} variant="outlined"  onClick={()=>navigate(`/users/findById/${user.id}`)}>Details user</InfoIcon>
            <AutoDeleteIcon sx={{cursor:"pointer"}} variant="outlined"  onClick={deleteUser}>Delete user</AutoDeleteIcon>
            <EditIcon sx={{cursor:"pointer"}} variant="outlined"  onClick={()=>navigate(`/users/${user.id}`)}>Update user</EditIcon>
            </Box>
            <Box>
            <DeleteIcon sx={{cursor:"pointer"}} variant="outlined" onClick={()=> {setShowModal(true); setUserId(user.id)}}>Delete User</DeleteIcon>
            </Box>
       </CardContent>
    </Card>
    </Container>
}
export default ShowUser;