import { useLoaderData } from "react-router-dom";

const User = () =>{
    const user = useLoaderData();
    console.log(user);
    return <div className="user-overviewcard">
        <div className="user-name-container">
            <p className="user-name">Username: {user.username}</p>
        </div>
        <div>
            <div className="user-info">ID: {user.id}</div>
            <div className="user-info">Email: {user.email}</div>
        </div>

    </div>
}
export default User;