import { useLoaderData } from "react-router-dom";
import "./teachers.css"
const Teacher = () =>{
    const teacher = useLoaderData();
    return <div className="teacher-overviewcard">
    <div className="teacher-name-container">
        <p className="teacher-name">Name: {teacher.firstname} {teacher.lastname}</p>
    </div>
    <div className="subject-info">
        <div>ID: {teacher.id}</div>
        <div>Age: {teacher.age}</div>
    </div>

</div>
}
export default Teacher;