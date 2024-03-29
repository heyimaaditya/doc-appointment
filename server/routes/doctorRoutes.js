const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddlewares");
const {
  getDoctorProfileController, updateDoctorProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController,
} = require("../controllers/doctorController");

const router = express.Router();

// Single doctor info( post method)
router.post("/getDoctorProfile", authMiddleware, getDoctorProfileController);
router.post(
  "/updateDoctorProfile",
  authMiddleware,
  updateDoctorProfileController
);
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);
router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);

// update status (post method)
router.post("/update-status", authMiddleware, updateStatusController);
module.exports = router;