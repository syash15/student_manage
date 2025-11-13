import React, {useState} from 'react';
import axios from 'axios';

export default function Login(){
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');

  const handle = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post((process.env.REACT_APP_API||'') + '/api/auth/login',{username,password});
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/';
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  }
  return (
    <form onSubmit={handle} style={{maxWidth:400, margin:'40px auto'}}>
      <h2>Login</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <div><input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" /></div>
      <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" /></div>
      <button type="submit">Login</button>
      <div style={{marginTop:10}}>No account? <a href="/register">Register</a></div>
    </form>
  );
}
