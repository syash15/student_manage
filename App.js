import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';

function App(){
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(()=>{ setToken(localStorage.getItem('token')); }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={token ? <Profile/> : <Navigate to="/login" />} />
        <Route path="/" element={token ? <StudentList/> : <Navigate to="/login" />} />
        <Route path="/add" element={token ? <AddStudent/> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
