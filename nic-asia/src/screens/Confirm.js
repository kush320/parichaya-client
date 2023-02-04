import React from "react";
import "./Confirm.css";


export default function Confirm() {
  return (

    <>
 
      <div className="wrapper1">
        
        <center>
          <img src="Nic.png" style={{ width: 150, height: 150 }} alt="Nic" />
        </center>
        <form className="p-3 mt-3">
          <center>
            <div className="text" style={{ color: "red"}}>
              <p>Sarbashrestha Sunya Maujdat Bachat Khata </p>
            </div>
          </center>
          <center>
            <div className="text" style={{ color: "#0a81ff",marginTop:30 }}>
              <p>Name</p>
              <p>CitizenshipNumber</p>
              <p>Gender</p>
            </div>
          </center>
          <button className="btn">
            Proceed
        </button>
        </form>
      </div>
    </>
  );
}
