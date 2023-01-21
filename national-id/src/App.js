import React from "react";
import "./App.css";
import Login from "./component/Login";
import Register from "./component/Register";
import Form from "./component/Form";
import Addstaff from "./component/Addstaff";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNID from "./component/AddNID";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<AddNID />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="register/form" element={<Form />} />
          <Route exact path="register/addstaff" element={<Addstaff />} />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
      {/* <Register/> */}
    </>
  );
}
export default App;
