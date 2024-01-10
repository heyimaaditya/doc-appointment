const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");

// register controller
const registerController = async (req, res) => {
  try {
    // existingUser
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }

    // password

    const password = req.body.password;
    console.log(password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // replace password with hashed password
    req.body.password = hashedPassword;

    // new User

    const newUser = new userModel(req.body);
    //or anther method
    // const newUser = new userModel({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: hashedPassword,
    // });
    await newUser.save();
    res
      .status(201)
      .send({ message: "Registration Successfull", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller Error ${error.message}`,
    });
  }
};

// Login controller
const loginController=async(req,res)=>{
  try {

    const user=await userModel.findOne({email:req.body.email});
    if(!user){
      return res.status(200).send({message:'user not found',success:false})
    }
    const password=await bcrypt.compare(req.body.password,user.password);
    if(!password){
      return res.status(200).send({message:'Password is wrong',success:false});
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    res.status(200).send({message:'Login Successful',success:true,token:token});
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:`Register controller error ${error.message}`})
    
  }

};
const getUserDataController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in  getUserDataController ",
      success: false,
      error,
    });
  }
};
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();

    // to send notificaton to admin
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "appy-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied as a Doctor`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while applying for Doctor",
    });
  }
};

module.exports={loginController,registerController,getUserDataController,applyDoctorController};