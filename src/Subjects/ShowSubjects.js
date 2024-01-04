import { NavLink, useLoaderData } from "react-router-dom";
import './ShowSubjects.css'
import { useState } from "react";
import ShowSubject from "./ShowSubject";
import { Box, Button, Container, Grid, TextField } from "@mui/material";

const ShowSubjects = () =>{
    const subjects = useLoaderData();
    console.log('ShowSubjects - subjects:', subjects);

    let[search, setSearch] = useState("");
    const filteredSubject = subjects.filter((s)=>s.name.toLowerCase().includes(search.toLowerCase()));
    
    return <Container>
        <Box sx={{display:"flex", justifyContent:"end", marginBottom:3}}>
           
                {/* <input className="input-field" type="text" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}/> */}
               <TextField size="small" id="outlined-search" label="Pretraga po nazivu predmeta" type="search" onChange={(e)=>setSearch(e.target.value)}/>
                <Button variant="outlined" className="search-button">Search</Button>
          
            <Button variant="outlined"><NavLink to="add_new_subject">Add New Subject</NavLink></Button>
        </Box>
        <Box>
        <Grid container spacing={3}>
            {filteredSubject.map((s)=><ShowSubject key={s.id} subject={s}/>)}
            </Grid>
        </Box>
    </Container>
}

export default ShowSubjects;