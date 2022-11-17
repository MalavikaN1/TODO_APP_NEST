import Login from "../login/login";
import InputComp from "../input/InputComp";

function User() {
    if(localStorage.getItem("isAuthenticated"))
    {
        console.log(localStorage.getItem("isAuthenticated"))
        return ( <InputComp/>);
    }
    else
    return (<Login/>)
}

export default User;