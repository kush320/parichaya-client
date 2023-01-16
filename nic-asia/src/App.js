
import './App.css';
// import Login from "./component/Login";
import Qr from "./scanner/Qr"
import Scan from "./scanner/Scan";
import Confirm from "./scanner/Confirm";
import {BrowserRouter, Routes, Route,} from 'react-router-dom'



function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element= {<Qr/>}/>
    <Route exact path="Scan" element= {<Scan/>}/>
    <Route exact path="Confirm" element= {<Confirm/>}/>
    
    </Routes>
    </BrowserRouter>
    {/* <Login/> */} 
    </>
  );
}

export default App;
