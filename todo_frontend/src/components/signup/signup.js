import { Button, TextField } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./signup.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [eyeicon, setEyeIcon] = useState("password");
  const [eyeFlag, setEyeFlag] = useState(true);
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");

  const addUserData = async () => {
    if (email === "" || pwd === "" || uname === "")
      alert("Please Enter Values");
    else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: uname, password: pwd, email: email }),
      };
      const data = await fetch("http://localhost:9000/user", requestOptions);
      const res = await data.json();
      if(res.flag)
      navigate("/");
      else{
        alert("User Already Exists");
      }
    }
  };

  useEffect(() => {
    if (eyeFlag) setEyeIcon("password");
    else setEyeIcon("text");
  }, [eyeFlag]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isAuthenticated"))) {
      navigate("/user");
    }
  });

  return (
    <div className="main">
      <h1>Create Your Own To-Do List..</h1>
      <div className="signupBox">
        <h1>Sign Up</h1>
        <div className="lockIcon">
          <LockOpenIcon></LockOpenIcon>
        </div>
        <div className="box">
          <TextField
            onChange={(e) => setUname(e.target.value)}
            required
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
        </div>
        <div className="box">
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            required
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
        </div>
        <div className="box">
          <TextField
            onChange={(e) => setPwd(e.target.value)}
            required
            type={eyeicon}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <VisibilityIcon
            sx={{ cursor: "pointer" }}
            onClick={(e) => setEyeFlag(!eyeFlag)}
          ></VisibilityIcon>
        </div>
        <div className="button">
          <Button variant="contained" onClick={addUserData}>
            Sign Up
          </Button>
        </div>
      </div>
      <h3>
        Already have an account?...<Link to="/">SignIn</Link>
      </h3>
    </div>
  );
}

export default SignUp;
