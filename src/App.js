import  React  from "react" ;
import "./index.css"
import  Header from "./Header";
import SideBar from "./SideBar";
import Data from "./Data"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Router } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
   const signIn = () =>{
     window.location.href="/Drive" ;
   }

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/Drive" element={
                <div>
                <Header  />
                <div className="App">
                <SideBar />
                <Data />
                </div>
               
               </div>
              } />
              <Route path="/" element={
                <div   id="div">
                <img src="data:image/png;base64,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" />
                <button
               onClick={signIn}
                id="button"
                
                >
                <span class="material-symbols-outlined">
                      login
                  </span>
                </button>
                
            </div>
              } />
          </Routes>
      </BrowserRouter>
    
  </div>


   
  );
}

export default App;
