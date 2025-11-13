import React, {useState} from 'react';
import axios from 'axios';

export default function Register(){
  const [form,setForm] = useState({username:'', password:'', fullName:'', email:'', role:'staff'});
  const [msg,setMsg] = useState('');
  const handle = async (e)=>{
    e.preventDefault();
    try {
      await axios.post((process.env.REACT_APP_API||'') + '/api/auth/signup', form);
      setMsg('Registered — please login');
    } catch (err) {
      setMsg(err.response?.data?.message || err.message);
    }
  }
  return (
    <form onSubmit={handle} style={{maxWidth:600, margin:'20px auto'}}>
      <h2>Register</h2>
      {msg && <div>{msg}</div>}
      <div><input placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} /></div>
      <div><input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} /></div>
      <div><input placeholder="Full name" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} /></div>
      <div><input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
      <div>
        <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
          <option value="staff">Staff</option>
          <option value="student">Student</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
