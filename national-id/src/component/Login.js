import React from "react";
import { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://65.109.161.97:3000/users/login/",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/register");
      // window.location.href = "/register";
    } catch (error) {
      setError("Invalid Username or Password");
    }
  };

  return (
    <>
      <div className="wrapper">
       
      <div className="kush">PARICHAYA</div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
        
          <div className="name">Username</div>
          <div className="form-field d-flex align-items-center">
            <input
              type="text"
              placeholder="username"
              id="username"
              required="required"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="name">Password</div>
          <div className="form-field d-flex align-items-center">
            <input
              type="password"
              placeholder="password"
              id="password"
              required="required"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <center>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </center>
          {/* <Link to="register"> */}
          <button className="btn">Login</button>
          {/* </Link> */}
          
        </form>
        <h1 className="fw">Forgot password?</h1>

      </div>
    </>
  );
}
