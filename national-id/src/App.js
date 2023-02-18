import React from "react";
import "./App.css";
import Login from "./component/Login";
import Register from "./component/Register";
import Search from "./component/Search";
// import Form from "./component/Form";
// import Addstaff from "./component/Addstaff";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNID from "./component/AddNID";
function App() {
  return (
    <>
     
      <BrowserRouter>
     
        <Routes>
          {/* <Route exact path="/" element={<AddNID />} /> */}
          <Route exact path="/" element={<Login />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="register/addNid" element={<AddNID />} />
          <Route exact path="register/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
      {/* <Register/> */}
    </>
  );
}
export default App;
