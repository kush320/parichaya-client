import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <div className="wrapper1">
        <div className="reg">Dashboard</div>
        <div className="row">
          <div className="column">
            <div className="card">
              <img
                src="gov-transport.png"
                class="card-image-center"
                alt="govlogo"
              />
              <center>
                <Link to="form">
                  <p>Click here to Register</p>
                </Link>
              </center>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="addstaff.png"
                class="card-image-center"
                alt="govlogo"
              />
              <center>
                <Link to="addstaff">
                <p>Click here to Add Staff</p>
                </Link>
              </center>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
