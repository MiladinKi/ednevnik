import { useLoaderData } from "react-router-dom";

const Subject = () =>{
const subject = useLoaderData();
console.log(subject);



    return <div className="subject-overviewcard">
<div className="subject-name-container">
    <p className="subject-name">Name: {subject.name}</p>
</div>
<div>
    <div className="subject-info">ID: {subject.id}</div>
    <div className="subject-info">Fund: {subject.weekClassFund}</div>
</div>
    </div>
}
export default Subject;