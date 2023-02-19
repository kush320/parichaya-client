// import "./App.css";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import SidebarWithHeader from "./component/SideNav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterNID from "./component/RegisterNID";
import RegisterCTZ from "./component/RegisterCTZ";
import RegisterDVL from "./component/RegisterDVL";
import { useContext, useEffect } from "react";
import AuthContext from "./store/auth-context";


function App() {
  const authContext = useContext(AuthContext)

  if (!authContext.isLoggedIn) {
    return <Login onLogin={authContext.onLogin} />
  }
  return (
    <>

      <BrowserRouter>

        <SidebarWithHeader >
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/nid/register" element={<RegisterNID />} />
            <Route exact path="/ctz/register" element={<RegisterCTZ />} />
            <Route exact path="/dvl/register" element={<RegisterDVL />} />
          </Routes>
        </SidebarWithHeader>
      </BrowserRouter>
    </>
  );
}
export default App;
