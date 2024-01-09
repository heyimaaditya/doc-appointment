const userModel=require('../models/userModels');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const loginController=async(req,res)=>{
  try {
    const user=await user.findOne({email:req.body.email});
    if(!user){
      return res.status(200).send({message:'User not Found',success:false})
    }
    const password=await bcrypt.compare(req.body.password,user.password);
    if(!password){
      return res.status(200).send({message:'Email or Password is wrong',success:false});
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.status(200).send({message:'Login Successfull',success:true,token:token});
  } catch (error) {
    console.log(error);
    res.status(200).send({message:`Error in login controller ${error.message}`});
    
  }
}
const registerController=async(req,res)=>{
  try {
    const existingUser=await userModel.findOne({email:req.body.email});
    if(existingUser){
      return res.status(200).send({message:'User already exist',success:false})
    }
    //password
    const password=req.body.password;
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    req.body.password=hashedPassword;
    //new user
    const newUser=new userModel(req.body);
    await newUser.save();
    res.status(201).send({message:'registeration successfully',success:true});


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:`Register controller error ${error.message}`
    })
    
  }
}
module.exports={loginController,registerController};
