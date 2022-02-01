import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './components/LandingComponents/Login';
import Register from './components/LandingComponents/Register';
import Landing from './components/LandingComponents/Landing';

function App() {
  const [ isLoggedIn, setIsLoggedIn] = useState(false)
  const loginUser = () => setIsLoggedIn(!isLoggedIn)

  useEffect(() => {
    if(localStorage.getItem('id')) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <div className="App">
      
      <Routes>
        <Route path="*" element={isLoggedIn ? <Landing /> : <Login loginFunction={loginUser}/>} />
        <Route path="register" element={<Register />} />
        {/* <Route path="/landing" element={<Landing />} /> */}
      </Routes>
    </div>
  );
}

export default App;
