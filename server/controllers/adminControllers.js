const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
//get all users
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Users data",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error, //get all doctors
    });
  }
};

//get all doctors
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors data",
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
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });

    const notification = user.notification;
    notification.push({
      type: "Doctor Account request updated",
      message: `Your Doctor Account Request has been ${status}`,
      onClickPath: "/notification",
    });

    user.isDoctor =status=== "accepted" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Doctor account status",
      error,
    });
  }
};
const getAdminProfileController = async (req, res) => {
  try {
    const admin = await userModel.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Admin data fetch Successfully",
      data: admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Admin Info",
      error,
    });
  }
};

//update doctor profile

const updateAdminProfileController = async (req, res) => {
  try {
    const admin = await userModel.findOneAndUpdate(
      { _id: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Admin Profile Updated Successfully",
      data: admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Profile update",
      error,
    });
  }
};
const removeUserController = async (req, res) => {
  try {
    const { userId } = req.body;

    // Assuming you have a userModel for managing users
    const user = await userModel.findByIdAndDelete({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If user is a doctor, you might want to handle additional logic
    // to remove the corresponding doctor profile if needed

    res.status(200).json({
      success: true,
      message: "User removed successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in removing user",
      error: error.message,
    });
  }
};
module.exports = { getAllUsersController, getAllDoctorsController,changeAccountStatusController,updateAdminProfileController,getAdminProfileController,removeUserController };