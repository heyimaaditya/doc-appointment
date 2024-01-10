const express=require('express');
const {loginController,registerController,getUserDataController}=require('../controllers/userControllers');
const { authMiddleware } = require('../middlewares/authMiddlewares');
const router=express.Router();
router.post('/login',loginController);
router.post('/register',registerController);
router.post('/getUserData',authMiddleware,getUserDataController);
module.exports=router;