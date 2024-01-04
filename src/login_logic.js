// Enum za uloge korisnika
const UserRoles = {
    TEACHER: 'TEACHER',
    ADMIN: 'ADMIN',
    PUPIL: 'PUPIL',
    PARENT: 'PARENT',
  };

  export { UserRoles };

//da dobavi usera
export const get_login = () =>{
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
}

//da proveri usera
export const check_login = (roles) =>{
    const user = get_login();
    if(user === null){
        const err = {
            cause: "login",
            message:"Korisnik nije ulogovan"
        };
        throw err;
    } else if(roles){
        if(!roles.includes(user.role)){
            const err = {
                cause: "security",
                message:"Korisnik nema pravo pristupa"
            }; 
            throw err;
        }
    }
   
        return user;
    
}

export const valid_login = (roles) =>{
    const user = get_login();
    if(user === null){
       return false;
    } else if(roles){
        if(!roles.includes(user.role)){
           return false;
        }
    }
    
        return true;
    
}
