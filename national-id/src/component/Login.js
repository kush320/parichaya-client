import React from "react";
import "./Login.css";
import {Link} from "react-router-dom"
export default function Login() {
  return (
    <>
      <div className="wrapper">
        <div className="row">Welcome Back!</div>
        <div className="box">Login</div>
        <form className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              required
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <input
              type="password"
              name="Password"
              placeholder="Password"
              autoComplete="off"
              required
            />
          </div>
          <Link to="register">
          <button className="btn">Login
          </button>
          </Link>
        </form>
        <div className="fw">
          <a href="ok">Forgot password?</a>
        </div>
      </div>
    </>
  );
}
