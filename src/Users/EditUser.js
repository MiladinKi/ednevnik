import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const EditUser = () =>{
    const user = useLoaderData();

    const[username, setUsername] = useState(user.username);
    const[password, setPassword] = useState(user.password);
    const[email, setEmail] = useState(user.email);
    const[role, setRole] = useState(user.role);

    
    const[showError, setShowError] = useState(false);
    const[helperText, setHelperText] = useState("");
    const[helperText2, setHelperText2] = useState("");
    const[helperText3, setHelperText3] = useState("");
    const[helperText4, setHelperText4] = useState("");

    const submitForm = async() =>{
        let response = await fetch(`http://localhost:8080/api/v1/users/${user.id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                username: username,
                password: password,
                email: email,
                role: role
            }),
        });
        if(response.ok){
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
        } else {
            console.log("Neuspeh slanja");
        }
    }
    return <div className="form_container">
        {/* <div className="input_container">
            <div className="input_label">Username:</div>
            <input className="input_field" type="text" value={username} onChange={((e)=> setUsername(e.target.value))}/>
            <div className="input_label">Password:</div>
            <input className="input_field" type="password" value={password} onChange={((e)=> setPassword(e.target.value))}/>
            <div className="input_label">Email:</div>
            <input className="input_field" type="email" value={email} onChange={((e)=>setEmail(e.target.value))}/>
            <div className="input_label">Role:</div>
            <input className="input_field" type="text" value={role} onChange={((e)=> setRole(e.target.value))}/>
        </div> */}
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
        <Button variant="outlined" className="save_button" onClick={submitForm}>Update</Button>
    </div>
}
export default EditUser;