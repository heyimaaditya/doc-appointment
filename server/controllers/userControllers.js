const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
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
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;

    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;

    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

// Delete All Notification  Controller

const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to delete all Notifications",
      error,
    });
  }
};
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "accepted" });
    res.status(200).send({
      success: true,
      message: "Doctors list fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching doctors",
      error,
    });
  }
};
const bookAppointmentController = async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new Appointment Request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });

    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Booked Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Booking Appointment",
      error,
    });
  }
};
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = (req.body.date, "DD-MM-YYYY");
    const fromOfficeTime = (req.body.officeTime, "HH:mm");
    const toOfficeTime = (req.body.officeTime, "HH:mm");

    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      officeTime: {
        $gte: fromOfficeTime,
        $lte: toOfficeTime,
      },
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available at this time ",
        success: true,
      });
    } else {
      return res.status(200).send({
        message: "Appointments Available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Booking Availability",
      error,
    });
  }
};
const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "user Appointment fetched Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user appointments",
      error,
    });
  }
};
module.exports={loginController,registerController,getUserDataController,applyDoctorController,getAllNotificationController,deleteAllNotificationController,getAllDoctorsController,bookAppointmentController,bookingAvailabilityController,userAppointmentsController};