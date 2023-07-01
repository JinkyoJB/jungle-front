//css
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToTop from './components/Main/ScrollTopTop'

import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";


// login set
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Login/Signup.jsx";
import Forgotpw from "./pages/Login/Forgotpw.jsx";
import Passwordchange from "./pages/Login/Passwordchange.jsx";

//editor set

import Editor2 from "./pages/Editor/Editor2.jsx"
import Editor4 from "./pages/Editor/Editor4.jsx"
import {Modal} from "./pages/Modal/Modal.jsx"
import Report from "./pages/Report/Report.jsx"

// flowchart set 
import Flowchart from "./pages/Flowchart/Flowchart.jsx"


//react query practice set
import Practice from "./pages/Practice/Practice.jsx"
import Test from "./pages/Practice/Test.jsx"

import { MainPage } from './pages/Main/Main.jsx'
import Mypage from "./pages/Mypage/Mypage";
import Myproject from "./pages/Myproject/Myproject";
import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";

import Navbar from './components/form/Navbar'
// import ForcedDirectedTree from "./pages/Editor/forcedTree.jsx"
// import VennDiagram from "./pages/Editor/venndiagram.jsx"

function App() {
  const [load, upadateLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            upadateLoad(false);
        }, 1200);

        // Clean up the timer
        return () => clearTimeout(timer);
    }, []);

  return (
    <BrowserRouter>
      <Preloader load={load} />
      <div className="App">
      <Navbar />
      <ScrollToTop />
      <Routes>
        
          {/* Main */}
          <Route path="/" element={<MainPage />} />
          {/* login set */}
          <Route path="/Login" element={<Login />} />
          <Route path="/forgotpw" element={<Forgotpw />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset/:token" element={<Passwordchange />} />
          {/* My page */}
          <Route path="/mypage" element={<Mypage />} />

          {/* editor set */}
          <Route path="/modal" element={<Modal />} />
          <Route path="/newproject/:projectId" element={<Editor2 />} />
          <Route path="/existingproject" element={<Editor4 />} />

          {/* writing report  */}
          <Route path="/report/:projectId" element={<Report />} />

          {/* writing flowchart */}
          <Route path="flowchart" element={<Flowchart/>}/>

          {/* react query sample */}
          <Route path="/practice" element={<Practice />} />
          <Route path="/Test" element={<Test />} />

          <Route path="/myproject" element={<Myproject />} /> 
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;