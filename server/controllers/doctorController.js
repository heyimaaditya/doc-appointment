const doctorModel = require("../models/doctorModel");

//to get single  doctor info
const getDoctorProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor data fetch Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Doctors Info",
      error,
    });
  }
};
const updateDoctorProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Doctor Profile Updated Successfully",
      data: doctor,
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
module.exports = { getDoctorProfileController,updateDoctorProfileController};