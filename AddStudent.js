import React, {useState} from 'react';
import axios from 'axios';

export default function AddStudent(){
  const [form,setForm] = useState({firstName:'', lastName:'', email:'', rollNo:'', course:'', phone:'', address:''});
  const [err,setErr] = useState('');
  const handle = async (e)=>{
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post((process.env.REACT_APP_API||'') + '/api/students', form, { headers: { Authorization: 'Bearer ' + token } });
      window.location.href = '/';
    } catch (error) {
      setErr(error.response?.data?.error || error.message);
    }
  }
  return (
    <form onSubmit={handle} style={{maxWidth:600, margin:'20px auto'}}>
      <h2>Add Student</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <div><input placeholder="First name" value={form.firstName} onChange={e=>setForm({...form, firstName: e.target.value})} /></div>
      <div><input placeholder="Last name" value={form.lastName} onChange={e=>setForm({...form, lastName: e.target.value})} /></div>
      <div><input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} /></div>
      <div><input placeholder="Roll No" value={form.rollNo} onChange={e=>setForm({...form, rollNo: e.target.value})} /></div>
      <div><input placeholder="Course" value={form.course} onChange={e=>setForm({...form, course: e.target.value})} /></div>
      <div><input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} /></div>
      <div><input placeholder="Address" value={form.address} onChange={e=>setForm({...form, address: e.target.value})} /></div>
      <button type="submit">Save</button>
    </form>
  );
}
