const mongoose=require('mongoose');
const colors=require('colors');
const connectDB=async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Mongodb connected successfully ${mongoose.connection.host}` .bgBlue.white);
  } catch (error) {
    console.log(`MongoDB server error ${error}.bgRed.bgwhite`)
    
  }
}
module.exports=connectDB;