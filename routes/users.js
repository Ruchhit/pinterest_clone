 const mongoose = require('mongoose')
 require("dotenv").config();
 mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
  console.log("connected to mongooo")
 })
  .catch(()=> {console.log("cant conect to mongoo")})
 const userSchema = new mongoose.Schema({
   username : {type:String},
   name : {type:String},
   email : {type:String},
   password : {type:String},
   profileImage : {type:String},
   boards : { type : Array , default : []}
 });
 module.exports = mongoose.model("User",userSchema)