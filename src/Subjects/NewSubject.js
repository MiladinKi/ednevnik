import { Alert, Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";

const NewSubject = () =>{
    const[name, setName] = useState("");
    const[weekClassFund, setWeekClassFund] = useState("");
    const[subject, setSubject] = useState("");
    
    const[showAlert, setShowAlert] = useState(false);
    const[showError, setShowError] = useState(false);
    const[helperText, setHelperText] = useState("");
    const[helperText2, setHelperText2] = useState("");
    const[helperText3, setHelperText3] = useState("");

const addNewSubject = async() =>{
let response = await fetch('http://localhost:8080/api/v1/subjects', {
    method: "POST",
    headers: {
        "Content-Type":"application/json"},
        body: JSON.stringify({
            weekClassFund: weekClassFund,
            name: name
        }),
    
});
if(response.ok){
    let d= await response.json();
    console.log(JSON.stringify(d, null, 4));
    setShowAlert(true);
} else {
    console.log("Neuspeh slanja!");
}
}
return <Container sx={{justifyContent:"center", alignContent:"center", flexWrap:"wrap", width:"80%"}}>
    <Box sx={{display:"flex", width:"100%", flexDirection:"column", alignItems:"end"}}>
        {/* <div className="input_label">Subject Name</div>
        <input className="input_field" type="text" onChange={(e)=>setName(e.target.value)}/>
        <div className="input_label">Week Class Fund</div>
        <input className="input_field" type="number" onChange={(e)=>setWeekClassFund(e.target.value)}/> */}
    <TextField sx={{width:"100%", marginBottom:4}} id="outlined" label="name" variant="outlined" type="text" onChange={(e)=>
        {
            if(e.target.value == ""){
                setShowError(true);
                setHelperText("Polje ne moze da bude prazno");
                setName(e.target.value);
            } else{
                setShowError(false);
                setHelperText("");
                setName(e.target.value);
            }
            }}
            required
            error={showError}
            helperText={helperText}/>
    <TextField sx={{width:"100%", marginBottom:4}} id="outlined" label="week class fund" variant="outlined" type="number" onChange={(e)=>
        {
            if(e.target.value<0 || e.target.value>10){
                setShowError(true);
                setHelperText2("Broj casova ne sme da bude manje od 0 i vece od 10");
                setWeekClassFund(e.target.value);
            }else{
                setShowError(false);
                setHelperText2("");
                setWeekClassFund(e.target.value);
    }}}
    required
    error={showError}
    helperText={helperText2}/>
    {showAlert &&<Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>uspesno</Alert>}
   
    <Button variant="outlined" className="save_button" onClick={addNewSubject}>Save</Button>
    </Box>
</Container>
}
export default NewSubject;