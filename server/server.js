const express=require('express');
const colors=require('colors');
const morgan=require('morgan');
const dotenv=require('dotenv');
//const cors=require('cors');
dotenv.config();
const app=express();
app.use(express.json());
app.use(morgan("dev"));
app.get('/',(req,res)=>{
  res.status(200).send({
    message:'server is running successfully',
  });
});
const port=process.env.PORT||4000;
app.listen(port,()=>{
  console.log(`Server is running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.bgWhite)
})