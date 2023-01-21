import React from "react";
import "./ApplyScreen.css";
import { Link } from "react-router-dom"
// import w3cwebsocket from 'websocket';
export default function ApplyScreen() {

  return (
    <>
      <div className="wrapper">
        <center>
          <img src="Nic.png" style={{ width: 150, height: 150 }} alt="Nic" />
        </center>
        <form className="p-3 mt-3">
          <center>
            <div className="text" style={{ color: "red" }}>
              <p>Sarbashrestha Sunya Maujdat Bachat Khata </p>
            </div>
          </center>
          <center>
            <div className="text" style={{ color: "#0a81ff", marginTop: 30 }}>
              <p>Open Account using Parichaya App</p>
            </div>
          </center>
          <Link to="scan">
            <button className="btn">Apply with Parichaya</button>
          </Link>
        </form>
      </div>
    </>
  );
}
