import { useState } from "react";
import { NavLink, useLoaderData, useParams } from "react-router-dom";
import ShowTeacher from "./ShowTeacher";
import { Box, Button, Container, Grid, TextField } from "@mui/material";

const ShowTeachers = () =>{
    const { id } = useParams();
    const teachers = useLoaderData();
    console.log(teachers);

    let[search, setSearch] = useState("");
    const filteredTeachers = teachers.filter((t)=>((t.firstname.toLowerCase().includes(search.toLowerCase())) ||
    t.lastname.toLowerCase().includes(search.toLowerCase())));
    return <Container>
        <Box>
           
                {/* <input className="input-field" type="text" placeholder="Search techers..." onChange={((e)=> setSearch(e.target.value))}/> */}
              <TextField size="small" id="outlined-search" label="Pretraga po imenu ili prezimenu" type="search" onChange={(e)=>setSearch(e.target.value)}/>
                <Button variant="oulined" className="search-button">Search</Button>
            
            <Button variant="outlined"><NavLink to={`add_new_teacher/${id}`}>Add New Teacher</NavLink></Button>
        </Box>
        <Grid container spacing={1}>
            {filteredTeachers.map((t)=><ShowTeacher key={t.id} teacher={t}/>)}
        </Grid>

    </Container>
}
export default ShowTeachers;