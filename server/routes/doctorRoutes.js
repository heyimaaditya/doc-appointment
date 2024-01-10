const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddlewares");
const {
  getDoctorProfileController, updateDoctorProfileController, getDoctorByIdController,
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
module.exports = router;