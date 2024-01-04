import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ShowSubjects from './Subjects/ShowSubjects';
import NewSubject from './Subjects/NewSubject';
import Subject from './Subjects/Subject';
import ShowUsers from './Users/ShowUsers';
import NewUser from './Users/NewUser';
import User from './Users/User';
import EditSubject from './Subjects/EditSubject';
import EditUser from './Users/EditUser';
import ShowTeachers from './Teachers/ShowTeachers';
import Teacher from './Teachers/Teacher';
import NewTeacher from './Teachers/NewTeacher';
import TeacherEdit from './Teachers/TeacherEdit';
import { check_login } from './login_logic';
import ErrorDisplay from './ErrorDisplay';
import {UserRoles} from './login_logic.js';



const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/subjects",
    element:<ShowSubjects/>,
    loader: async()=>{
      //proveravamo ulogovanog korisnika i dozvoljava samo adminu da pogleda predmete
    const user = check_login([UserRoles.ADMIN]);
      return fetch("http://localhost:8080/api/v1/subjects");
    },
    errorElement: <ErrorDisplay entity="predmeti"/>
  },
  {
    path:"subjects/add_new_subject",
    element:<NewSubject/>
  },
  {
    path:"subjects/findById/:id",
    element:<Subject/>,
    loader: async({params})=>{
      const user = check_login([UserRoles.ADMIN, UserRoles.TEACHER]);
       return fetch(`http://localhost:8080/api/v1/subjects/findById/${params.id}`);
    },
    errorElement: <ErrorDisplay entity="predmeti"/>
  },
  {
    path:"subjects/update/:id",
    element:<EditSubject/>, 
    loader: async({params})=>{
      return fetch(`http://localhost:8080/api/v1/subjects/findById/${params.id}`)
    }
  },
  {
    path:"/users",
    element:<ShowUsers/>,
    loader: async()=>{
      return fetch("http://localhost:8080/api/v1/users");
    }
  },
  {
    path:"users/add_new_user",
    element:<NewUser/>
  },
  {
    path:"users/findById/:id",
    element:<User/>,
    loader: async ({params})=>{
    return fetch(`http://localhost:8080/api/v1/users/findById/${params.id}`);
  }
  },
  {
    path:"/users/:id",
    element:<EditUser/>,
    loader: async ({params})=>{
      return fetch(`http://localhost:8080/api/v1/users/findById/${params.id}`);
    }
  },
  {
    path:"teachers",
    element:<ShowTeachers/>,
    loader: async()=>{
      const user = check_login();
      return fetch("http://localhost:8080/api/v1/teachers")
    }
  },
  {
    path: "teachers/add_new_teacher/:userId",
    element: <NewTeacher />
},

  {
    path:"teachers/findById/:id",
    element:<Teacher/>,
    loader: async ({params})=>{
      return fetch(`http://localhost:8080/api/v1/teachers/findById/${params.id}`);
    }
  },
  {
    path:"teachers/update/:id",
    element:<TeacherEdit/>,
    errorElement:<ErrorDisplay entity="nastavnik"/>,
    loader: async({params})=>{
      const user = check_login([UserRoles.ADMIN]);
      return fetch(`http://localhost:8080/api/v1/teachers/findById/${params.id}`);
    }
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
