const express=require('express');
const colors=require('colors');
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const cors=require('cors');
//const cors=require('cors');
dotenv.config();
connectDB()
const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/admin',require('./routes/adminRoutes'));
app.use('/api/v1/doctor',require('./routes/doctorRoutes'));
const port=process.env.PORT||4000;
app.listen(port,()=>{
  console.log(`Server is running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.bgWhite)
})