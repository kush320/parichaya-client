
import './App.css';
// import Login from "./component/Login";
import ApplyScreen from "./screens/ApplyScreen"
import ScanScreen from "./screens/ScanScreen";
import Confirm from "./screens/Confirm";
import { BrowserRouter, Routes, Route, } from 'react-router-dom'



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ApplyScreen />} />
          <Route exact path="Scan" element={<ScanScreen />} />
          <Route exact path="Confirm" element={<Confirm />} />

        </Routes>
      </BrowserRouter>
      {/* <Login/> */}
    </>
  );
}

export default App;
