import { useState } from "react";
import {BrowserRouter as Router , Routes, Route} from  'react-router-dom'
import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={[<Footer/>]}></Route>        
      </Routes>

    </Router>
  )
}

export default App;
