import { NavLink, useLoaderData } from "react-router-dom";
import "./users.css"
import { useState } from "react";
import ShowUser from "./ShowUser";
import { Box, Button, Container, Grid, TextField } from "@mui/material";

const ShowUsers = () =>{
    const users = useLoaderData();
    console.log(users);
    const[search, setSearch] = useState("");

    const filteredUsers = users.filter((u)=>u.username.toLowerCase().includes(search.toLowerCase()));


    return <Container>
        <Box>
        <TextField size="small" id="outlined-search" label="Pretraga po username" type="search" onChange={(e)=>setSearch(e.target.value)}/>
                {/* <input className="input-field" type="text" placeholder="Search..." onChange={(e)=> setSearch(e.target.value)}/> */}
                <Button className="search-button">Search</Button>
          
            <Button variant="outlined" className="add-button"><NavLink to="add_new_user">Add New User</NavLink></Button>
            </Box>
            <Box>
            <Grid container spacing={1}>
            {filteredUsers.map((u)=> <ShowUser key={u.id} user={u}/>)}
        </Grid>
        </Box>
    </Container>
}
export default ShowUsers;