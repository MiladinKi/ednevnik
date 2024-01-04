import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const EditSubject = () =>{
    
    const subject = useLoaderData();
    const[name, setName] = useState(subject.name);
    const[weekClassFund, setWeekClassFund] = useState(subject.weekClassFund);
    const[showAlert, setShowAlert] = useState(false);
    const[showError, setShowError] = useState(false);
    const[helperText, setHelperText] = useState("");
    const[helperText2, setHelperText2] = useState("");
   

    const submitForm = async() =>{

        let response = await fetch(`http://localhost:8080/api/v1/subjects/${subject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                name: name,
                weekClassFund: weekClassFund
            }),
        });
        if(response.ok){
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
        }else{
            console.log("Neuspeh slanja!");
        }
    }

    return <div className="form_container">
        {/* <div className="input_container">
            <div className="input_label">Name:</div>
            <input className="input_field" type="text" value={name} onChange={((e)=> setName(e.target.value))}/>
            <div className="input_label">Week Class Fund:</div>
            <input className="input_field" type="number" value={weekClassFund} onChange={((e)=> setWeekClassFund(e.target.value))}/>
        </div> */}
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
    <TextField sx={{width:"100%", marginBottom:4}} id="outlined" label="week class fund" variant="outlined" onChange={(e)=>
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
        <Button variant="outlined" className="save_button" onClick={submitForm}>Update</Button>
    </div>
}
export default EditSubject;