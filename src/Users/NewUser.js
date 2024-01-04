import { Alert, Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const NewUser = () =>{
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[email, setEmail] = useState("");
    const[role, setRole] = useState("");
    const[showAlert, setShowAlert] = useState(false);

    const[showError, setShowError] = useState(false);
    const[helperText, setHelperText] = useState("");
    const[helperText2, setHelperText2] = useState("");
    const[helperText3, setHelperText3] = useState("");
    const[helperText4, setHelperText4] = useState("");

    const addNewUser = async() =>{
        let response = await fetch('http://localhost:8080/api/v1/users',
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                username:username,
                password: password,
                email:email,
                role:role
            }),
        });
        if(response.ok){
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            setShowAlert(true);
        } else {
            console.log("Neuspeh slanja");
        }

    }

   
    return <Container sx={{justifyContent:"center", alignContent:"center", flexWrap:"wrap", width:"80%"}}>
        <Box sx={{display:"flex", width:"100%", flexDirection:"column", alignItems:"end"}}>
            {/* <div className="input_label">User username:</div>
            <input className="input_field" type="text" onChange={((e)=> setUsername(e.target.value))}/>
            <div className="input_label">User password:</div>
            <input className="input_field" type="password" onChange={((e)=> setPassword(e.target.value))}/>
            <div className="input_label">User email:</div>
            <input className="input_field" type="email" onChange={((e)=> setEmail(e.target.value))}/>
            <div className="input_label">User role:</div>
            <input className="input_field" type="text" onChange={((e)=> setRole(e.target.value))}/> */}
        <TextField sx={{width:"100%", marginBottom:4}} id="outlined" label="username" variant="outlined" type="text" onChange={(e)=>
            {
                if(e.target.value === ""){
                    setShowError(true);
                    setHelperText("Polje ne moze da bude prazno");
                    setUsername(e.target.value);
                    } else{
                        setShowError(false);
                        setHelperText("");
                        setUsername(e.target.value);
                    }}}
                    required
                    error={showError}
                    helperText={helperText}/>
        <TextField sx={{width:"100%", marginBottom:4}} id="outlined" type="password" label="password"  variant="outlined" onChange={(e)=>
              {
                if(e.target.value === ""){
                    setShowError(true);
                    setHelperText2("Polje ne moze da bude prazno");
                    setPassword(e.target.value);
                    } else{
                        setShowError(false);
                        setHelperText2("");
                        setPassword(e.target.value);
                    }}}
                    required
                    error={showError}
                    helperText={helperText2}/>
        <TextField sx={{width:"100%", marginBottom:4}} id="outlined" label="email" variant="outlined" type="email" onChange={(e)=>
              {
                if(e.target.value === ""){
                    setShowError(true);
                    setHelperText3("Polje ne moze da bude prazno");
                    setEmail(e.target.value);
                    } else{
                        setShowError(false);
                        setHelperText3("");
                        setEmail(e.target.value);
                    }}}
                    required
                    error={showError}
                    helperText={helperText3}/>
        <TextField sx={{width:"100%", marginBottom:4}} id="outlined" label="role" variant="outlined" type="text" onChange={(e)=>
              {
                if(e.target.value === ""){
                    setShowError(true);
                    setHelperText4("Polje ne moze da bude prazno");
                    setRole(e.target.value);
                    } else{
                        setShowError(false);
                        setHelperText4("");
                        setRole(e.target.value);
                    }}}
                    required
                    error={showError}
                    helperText={helperText4}/>
        {showAlert &&<Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>uspesno</Alert>}
        <Button variant="outlined" className="save_button" onClick={addNewUser}>Save</Button>
    </Box>
    </Container>
}
export default NewUser;