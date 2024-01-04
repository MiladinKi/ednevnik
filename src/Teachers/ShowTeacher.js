import { Box, Button, Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { useState } from "react";
import Modal from "./Modal";

const ShowTeacher = ({teacher}) =>{
    const navigate = useNavigate();
    const[showModal, setShowModal] = useState(false);
    const[teacherId, setTeacherId] = useState(null);

    const handleDelete = async() =>{
        let result = await fetch(`http://localhost:8080/api/v1/teachers/${teacher.id}`,
        {
            method: "DELETE"
        });
        if(result.ok){
            let r = await result.json();
            console.log(r);
        } else {
            console.log("Brisanje nije uspelo");
        }
        window.location.reload(false);
    }
    const deleteTeacher = async() =>{
        let result = await fetch(`http://localhost:8080/api/v1/teachers/${teacher.id}`,
        {
            method: "DELETE"
        });
        if(result.ok){
            let r = await result.json();
            console.log(r);
        } else {
            console.log("Brisanje nije uspelo");
        }
        window.location.reload(false);
    }
    const handleCloseModal = (deleteTeacher) =>{
        if(deleteTeacher){
            handleDelete()
        }
        setShowModal(false);
    }

    return <Container>
         {showModal && <Modal onCloseModal={handleCloseModal}/>}
 
     <Card key={teacher.id} variant="outlined" >
        <CardHeader subheader={`${teacher.firstname} ${teacher.lastname}`}  sx={{border:"1px solid gray", borderRadius:"3px 3px 0px 0px", 
    textAlign:"center", backgroundColor:"green"}}/>
        <CardContent sx={{display:"flex", flexDirection:"column", alignContent:"center", flexWrap:"wrap", backgroundColor:"lightgreen", textAlign:"center"}}>
            <Typography>ID: {teacher.id}</Typography>
            <Typography>Age: {teacher.age}</Typography>
            {/* <div> */}
            <Box>
            <InfoIcon sx={{cursor:"pointer"}} variant="outlined" onClick={()=>navigate(`/teachers/findById/${teacher.id}`)}>Details teacher</InfoIcon>
            <AutoDeleteIcon sx={{cursor:"pointer"}} variant="outlined" onClick={deleteTeacher}>Delete teacher</AutoDeleteIcon>
            <EditIcon sx={{cursor:"pointer"}} variant="outlined" onClick={()=> navigate(`/teachers/update/${teacher.id}`)}>Update teacher</EditIcon>
            {/* </div> */}
            </Box>
            <Box>
            <DeleteIcon sx={{cursor:"pointer"}} variant="outlined" onClick={()=> {setShowModal(true); setTeacherId(teacher.id)}}>Delete Teacher</DeleteIcon>
            </Box>
        </CardContent>

    </Card>
    </Container>
}
export default ShowTeacher;