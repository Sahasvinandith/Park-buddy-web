import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/components/homepage/Homepage";
import LoginForm from "./pages/components/LoginForm/LoginForm";
function App() {
  return (
    <div className>
      <Routes>
        <Route index element={<LoginForm/>}/>   
        <Route path="/Home" exact element={<Homepage/>}/>
      </Routes>
    </div>
  );
}

export default App;


/* import LoginForm from './components/LoginForm/LoginForm';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

 function App() {
  return (
    <div>
      <LoginForm />
    </div>
  
  );
}

export default App;   */