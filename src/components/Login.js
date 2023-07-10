import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alertContext';

const Login = () => {
  const aContext=useContext(alertContext);
  const {showAlert}=aContext;
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
            showAlert("Succesfully Loged in","success")
          }
          else{
            showAlert("Invalid Credentials","danger")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    } 
  return (
    <div className='mt-2'>
      <h2>Login To Continue to iNotebook</h2>
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
