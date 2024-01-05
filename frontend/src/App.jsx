import { useState } from "react";
import {BrowserRouter as Router , Routes, Route} from  'react-router-dom'
import "./App.css";
import Header from "./component/layout/Header/Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header/>}>
          
        </Route>
      </Routes>

    </Router>
  )
}

export default App;
