import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function StudentList(){
  const [students,setStudents]=useState([]);
  useEffect(()=>{ fetchStudents(); },[]);
  const fetchStudents = async ()=>{
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get((process.env.REACT_APP_API||'') + '/api/students',{ headers: { Authorization: 'Bearer ' + token } });
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  const remove = async (id)=>{
    const token = localStorage.getItem('token');
    await axios.delete((process.env.REACT_APP_API||'') + '/api/students/' + id, { headers: { Authorization: 'Bearer ' + token } });
    fetchStudents();
  }
  return (
    <div style={{padding:20}}>
      <h2>Students</h2>
      <Link to="/add">Add student</Link> | <Link to="/profile">Profile</Link>
      <table border="1" cellPadding="6" style={{marginTop:10}}>
        <thead><tr><th>Name</th><th>Email</th><th>Roll No</th><th>Course</th><th>Phone</th><th>Actions</th></tr></thead>
        <tbody>
          {students.map(s=> (
            <tr key={s._id}>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.email}</td>
              <td>{s.rollNo}</td>
              <td>{s.course}</td>
              <td>{s.phone}</td>
              <td><button onClick={()=>remove(s._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
