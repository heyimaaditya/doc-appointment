const express=require('express');
const {loginController,registerController,getUserDataController, applyDoctorController, deleteAllNotificationController, getAllNotificationController, getAllDoctorsController}=require('../controllers/userControllers');
const { authMiddleware } = require('../middlewares/authMiddlewares');
const router=express.Router();
router.post('/login',loginController);
router.post('/register',registerController);
router.post('/getUserData',authMiddleware,getUserDataController);
router.post('/apply-doctor',authMiddleware,applyDoctorController);
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

// delete Notification doctor routes ( post method)

router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
module.exports=router;