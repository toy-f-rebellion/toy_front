import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Home from "./component/home";
import Calendar from './component/calendar';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <BrowserRouter>
        {/* <GlobalStyles/>           */}
          {/* <Header /> */}
            <Routes>
              {/* 홈 */}
              <Route exact path="/" element={<Home />}/>
              {/* 홈 */}
              <Route exact path="home" element={<Home />}/>
            </Routes>
            {/* <a><Footer /></a> */}
      </BrowserRouter> 
    </div>
  );
}

export default App;
