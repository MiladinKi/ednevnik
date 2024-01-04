import { Box, Button, Card, CardContent, CardHeader, Container, Typography, useScrollTrigger } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import Modal from "./Modal";

const ShowSubject = ({subject}) =>{
    const navigate = useNavigate();
    const[showModal, setShowModal] = useState(false);
    const[subjectId, setSubjectId]=useState(null);

    const handleDelete =async () =>{
        let result =  await fetch (`http://localhost:8080/api/v1/subjects/${subject.id}`,
        {
         method : "DELETE"
        });
        if(result.ok){
         let r = await result.json();
         console.log(r);
        } else {
         console.log("Brisanje nije uspelo")
        }
        window.location.reload(false);
    }

    const deleteSubject = async() =>{
       let result =  await fetch (`http://localhost:8080/api/v1/subjects/${subject.id}`,
       {
        method : "DELETE"
       });
       if(result.ok){
        let r = await result.json();
        console.log(r);
       } else {
        console.log("Brisanje nije uspelo")
       }
       window.location.reload(false);
    }

    const handleCloseModal = (deleteSubject) =>{
        if(deleteSubject){
            handleDelete()
        }
        setShowModal(false);
    }

    return <Container>
        {showModal && <Modal onCloseModal={handleCloseModal}/>}
    <Card key={subject.id} variant="outlined">
        <CardHeader subheader={subject.name} sx={{border:"1px solid gray", borderRadius:"3px 3px 0px 0px", 
    textAlign:"center", backgroundColor:"green"}}/>

        <CardContent sx={{display:"flex", flexDirection:"column", alignContent:"center", flexWrap:"wrap", backgroundColor:"lightgreen", textAlign:"center"}}>
            <Typography>Id: {subject.id}</Typography>
            <Typography>Class Fund: {subject.weekClassFund}</Typography>

            <Box>
               
                <InfoIcon sx={{cursor:"pointer"}} variant="outlined"  onClick={()=>navigate(`/subjects/findById/${subject.id}`)}>Details subject</InfoIcon>
                <AutoDeleteIcon sx={{cursor:"pointer"}}  variant="outlined"   onClick={deleteSubject}>AutoDelete subject</AutoDeleteIcon>
                <EditIcon sx={{cursor:"pointer"}}  variant="outlined"  onClick={()=>navigate(`/subjects/update/${subject.id}`)}>Update subject</EditIcon>
            </Box>
            <Box>
            <DeleteIcon sx={{cursor:"pointer"}} variant="outlined" onClick={()=> {setShowModal(true); setSubjectId(subject.id)}}>Delete Subject</DeleteIcon>
            </Box>
        </CardContent>
    </Card>
    </Container>
}

export default ShowSubject;