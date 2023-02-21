
import './App.css';
// import Login from "./component/Login";
import ApplyScreen from "./screens/ApplyScreen"
import ScanScreen from "./screens/ScanScreen";
import Confirm from "./screens/Confirm";
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import NavBar from './component/NavBar';
import ReceivedDetails from './screens/ReceivedDetails';



function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />


        <Routes>
          <Route exact path="/" element={<ApplyScreen />} />
          <Route exact path="/scan" element={<ScanScreen />} />
          <Route exact path="/confirm" element={<Confirm />} />

        </Routes>
      </BrowserRouter>
      {/* <Login/> */}
    </>
  );
}

export default App;
