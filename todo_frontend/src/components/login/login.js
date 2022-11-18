import "./login.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = async () => {
    if(password!==''||email!=='')
    {

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      };
      const userData = await fetch("user/email", requestOptions);
      const res = await userData.json();
      console.log(res)
      if (res.status === true) {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("userId", res.id);
        localStorage.setItem("userName",res.userName);
        navigate("/user");
      } else {
        alert("Invalid Login Credentials");
      }
    }
    else{
        alert("Please Enter Values");
    }
  };

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("isAuthenticated"))){
      navigate('/user')
    }
  })

  return (
    <div className="main">
      <h1>SignIn to Continue...</h1>
      <div className="loginBox">
        <h1>Login</h1>
        <div className="lockIcon">
          <LockOpenIcon></LockOpenIcon>
        </div>
        <div className="box">
          <TextField
            required
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
        </div>
        <div className="box">
          <TextField
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
        </div>
        <div className="button">
          <Button variant="contained" onClick={authenticate}>
            Sign In
          </Button>
        </div>
      </div>
      <h3>Don't have an account?...<Link to="/signup">SignUp</Link></h3>
    </div>
  );
}

export default Login;
