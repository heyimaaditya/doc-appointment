const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  getDoctorProfileController,
} = require("../controllers/doctorController");

const router = express.Router();

// Single doctor info( post method)
router.post("/getDoctorProfile", authMiddleware, getDoctorProfileController);

module.exports = router;