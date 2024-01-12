const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddlewares");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  updateAdminProfileController,
  getAdminProfileController,
} = require("../controllers/adminControllers");

const router = express.Router();

//get All users (get method)
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//get All Doctors (get method)
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);
router.post("/getAdminProfile", authMiddleware, getAdminProfileController);

// update Admin Profile ( post method)

router.post(
  "/updateAdminProfile",
  authMiddleware,
  updateAdminProfileController
);
module.exports = router;