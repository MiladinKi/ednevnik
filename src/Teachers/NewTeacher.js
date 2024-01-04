import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

const NewTeacher = () =>{
    const { userId } = useParams();

    const[firstname, setFirstname] = useState("");
    const[lastname, setLastname] = useState("");
    const[age, setAge] = useState("");
    const[users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const[showAlert, setShowAlert] = useState(false);
    const[showError, setShowError] = useState(false);
    const[helperText, setHelperText] = useState("");
    const[helperText2, setHelperText2] = useState("");
    const[helperText3, setHelperText3] = useState("");

    const addNewTeacher = async () => {
        let response = await fetch(`http://localhost:8080/api/v1/teachers/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            age: age,
            users: selectedUser ? [selectedUser] : [],
            userId: userId, 
          }),
        });
      
        if (response.ok) {
          let d = await response.json();
          console.log(d);
          setShowAlert(true);
        } else {
          console.log("Neuspeh slanja");
        }
      };


      
    useEffect(() => { 
        let ignore = false; 
        const ff = async () => { 
            let r = await fetch('http://localhost:8080/api/v1/users');
            let rr = await r.json();
            if(!ignore){
                setUsers(rr);
            }
        };
        ff();
        return () => { 
            ignore = true;
        };
    }, []);
     const teacherUsers = users.filter((user) => user.role === "TEACHER");
   return <Container sx={{justifyContent:"center", alignContent:"center", flexWrap:"wrap", width:"80%"}}>
    <Box  sx={{display:"flex", width:"100%", flexDirection:"column", alignItems:"end"}}>
        {/* <div>Teacher firstname:</div>
        <input type="text" onChange={((e)=> setFirstname(e.target.value))}/>
        <div>Teacher lastname:</div>
        <input type="text" onChange={((e)=> setLastname(e.target.value))}/>
        <div>Teacher age:</div>
        <input type="number" onChange={((e)=> setAge(e.target.value))}/> */}
    <TextField sx={{width:"100%", marginBottom:4}} id="outlined" label="firstname" variant="outlined" type="text" onChange={(e)=>{
      if(e.target.value === ""){
        setShowError(true);
        setHelperText("Polje ne moze da bude prazno");
        setFirstname(e.target.value);
       } else{
          setShowError(false);
        setHelperText("");
        setFirstname(e.target.value);
        }
        }}
        required
        error={showError}
        helperText={helperText}
          />
    <TextField sx={{width:"100%", marginBottom:4}} id="outlined" label="lastname" variant="outlined" type="text" onChange={(e)=>
      {
        if(e.target.value === ""){
          setShowError(true);
          setHelperText2("Polje ne moze da bude prazno");
          setLastname(e.target.value);}
          else{
            setShowError(false);
            setHelperText2("");
            setLastname(e.target.value);
          }}}
          required
          error={showError}
          helperText2={helperText2}/>
    <TextField sx={{width:"100%", marginBottom:4}} id="outlined" label="age" variant="outlined" type="number" onChange={(e)=>{
      if(e.target.value<24){
        setShowError(true);
        setHelperText3("Vrednost mora biti veca 24");
        setAge(e.target.value)}
       else{
        setShowError(false);
        setHelperText3("");
        setAge(e.target.value);
       }}}
       required
       error={showError}
       helperText={helperText3}/>
    <FormControl sx={{ width:"30%", minWidth: 120 }} size="small">
    <InputLabel id="demo-select-small-label">Users</InputLabel>
    <Select
      labelId="filter"
      id="filter"
      label="Users"
    onChange={(e) => setSelectedUser(teacherUsers.find((user) => user.username === e.target.value))}>

        {teacherUsers.map((tu) => (
          <option key={tu.id} value={tu.username}>
            {tu.username}
          </option>
        ))}
      </Select>
      </FormControl>
      {showAlert &&<Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>uspesno</Alert>}
        <Button variant="outlined"  onClick={addNewTeacher}>Save</Button>
    </Box>
    </Container>
}
export default NewTeacher;