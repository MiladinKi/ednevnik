import { Button, FormControl, InputLabel, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const TeacherEdit = () =>{
    const teacher = useLoaderData();
    // const { userId } = useParams();

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
    const [user, setUser] = useState(teacher.user ? teacher.user.id : ""); // Postavljamo ID postojećeg korisnika ako postoji

    

    useEffect(() => {
        const fetchUsers = async () => {
          let response = await fetch("http://localhost:8080/api/v1/users");
          let usersData = await response.json();
          setUsers(usersData);
        };
    
        fetchUsers();
      }, []);

      const teacherUsers = users.filter((u) => u.role === "TEACHER");

    const submitForm = async() =>{
        let response = await fetch(`http://localhost:8080/api/v1/teachers/${teacher.id}`,
        {
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                age: age,
               user: { id: user },
            }),
        });
        if(response.ok){
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
        } else{
            console.log("Neuspeh slanja");
        }
    }
    return <div div className="form_container">
        {/* <div className="input_container">
            <div className="input_label">Firstname:</div>
            <input className="input_field" type="text" value={firstname} onChange={((e)=> setFirstname(e.target.value))}/>
            <div className="input_label">Lastname:</div>
            <input className="input_field" type="text" value={lastname} onChange={((e)=> setLastname(e.target.value))}/>
            <div className="input_label">Age:</div>
            <input className="input_field" type="number" value={age} onChange={((e)=> setAge(e.target.value))}/>
            <div className="input_label">User:</div>
            <select value={user} onChange={(e) => setUser(e.target.value)}>
          <option value="">Select User</option>
          {teacherUsers.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
        </div> */}
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
          helperText={helperText2}/>
    <TextField sx={{width:"100%", marginBottom:4}} id="outlined" label="age" variant="outlined" type="number" onChange={(e)=>{
      if(e.target.value<24){
        setShowError(true);
        setHelperText3("Vrednost mora biti veca od 24");
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
        <Button variant="outlined"  onClick={submitForm}>Update</Button>
    </div>
}
export default TeacherEdit;