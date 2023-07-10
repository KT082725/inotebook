import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alertContext';
const Signup = () => {
    const [credentials,setCredentials]=useState({name:"",email:"",password:'',cpassword:""});
    let navigate=useNavigate();
    const aContext=useContext(alertContext);
    const {showAlert}=aContext;
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
          });
          const json= await response.json();
          console.log(json)
          if(credentials.password===credentials.cpassword && json.success){
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
      <h2>Create a new user to use iNotebook</h2>
       <form onSubmit={handleSubmit}>
  <div className="form-group">
  <div className="form-group">
    <label htmlFor="name">Password</label>
    <input type="text" className="form-control" id="name" placeholder="Name"  name="name" onChange={onChange} required/>
  </div>
    <label htmlFor="email">Email address</label>
    <input htmlFor="email" className="form-control" name="email" id="email"  placeholder="Enter email" onChange={onChange} required />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" placeholder="Password"  name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword">Password</label>
    <input type="password" className="form-control" id="cpassword" placeholder="Confirm Password"  name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Signup
