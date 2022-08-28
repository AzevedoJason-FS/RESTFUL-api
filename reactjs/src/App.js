import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import Movie from './pages/Movie';
import authService from './services/auth.service';

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if(user){
      setCurrentUser(user)
    }
  }, []);

  const logOut = () => {
    authService.logout();
  }

  return (
    <div>
      <h1>logging in</h1>
      <div>
        {currentUser
        ? <h2>Logged in</h2>
        : <h2>logged out</h2>
        }
      </div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/movie/:id" exact element={<Movie />} />
      </Routes>
    </div>
  );
}

export default App;
