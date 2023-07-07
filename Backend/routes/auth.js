const express = require('express');
const User=require('../models/User')
const router=express.Router();
const { query, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET="Harryisagoodb$oy"
// Route1:create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    query('email',"Enter a valid Email-id").isEmail(),
],async (req,res)=>{
  let success=false;
  // If there are errors ,return Bad request and the error
    const result = validationResult(req);
  if (result.isEmpty()) {
    res.json({ success:success,result: result.array() }).status(400);
  }
  // check whether the user with same email exist already
  try{
  let user=await User.findOne({email:req.body.email});
  if(user){
    return res.status(400).json({success:success,error:"Sorry a user with this email already exists."})
  }
  const salt=await bcrypt.genSalt(10);
  const secPass=await bcrypt.hash(req.body.password,salt);
  // Create a new user
  user=await User.create({
    name:req.body.name,
    password:secPass, 
    email:req.body.email
})
const data={
  user:{
    id:user.id
  }
}
const authToken=jwt.sign(data,JWT_SECRET);
  res.json({success:true,authToken})
} catch(error){
  console.error(error.message);
  res.status(400).json({success:success,error:"Some Error Occured."})
}
})
// Route2:Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login',[
  query('email',"Enter a valid Email-id").isEmail(),
  query('password',"Password cannot be blank").exists(),
],async (req,res)=>{
   // If there are errors ,return Bad request and the error
   let success=false;
   const result = validationResult(req);
   if (result.isEmpty()) {
     res.status(400).json({success:success,result: result.array() });
   }

   const{email,password}=req.body;
   try{
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({success:success,error:"Please try to login with correct credentials"})
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({success:success,error:"Please try to login with correct credentials"})
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
      res.json({success:true,authToken})
   }
   catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured.")
  }
})

// Route 3:Get loggedin User Details using:POST "/api/auth/getuser". Login required
router.post('/getuser'
,fetchuser,async (req,res)=>{
try{
  userId=req.user.id;
  const user=await User.findById(userId).select("-password")
  res.send(user);
}catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server Error Occured.")
}
});
module.exports=router