import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials,setCredentials]=useState({email:"",password:''});
    let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
          });
          const json= await response.json();
          console.log(json)
          if(json.success){
            localStorage.setItem('token',json.authToken);
            navigate("/");
          }
          else{
            alert("Invalid Credentials")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    } 
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input htmlFor="email" className="form-control" name="email" id="email" value={credentials.email} placeholder="Enter email" onChange={onChange} required/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" placeholder="Password" onChange={onChange} value={credentials.password} name="password" minLength={5}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
