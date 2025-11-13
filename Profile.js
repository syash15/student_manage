import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Profile(){
  const [user,setUser]=useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token) return;
    axios.get((process.env.REACT_APP_API||'') + '/api/auth/me', { headers: { Authorization: 'Bearer ' + token } })
      .then(res=>setUser(res.data)).catch(()=>{});
  },[]);
  if (!user) return <div>Loading...</div>;
  return (
    <div style={{padding:20}}>
      <h2>Profile</h2>
      <div><strong>Full name:</strong> {user.fullName}</div>
      <div><strong>Username:</strong> {user.username}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Role:</strong> {user.role}</div>
    </div>
  );
}
