 const mongoose = require('mongoose')
 require("dotenv").config();
 const plm = require('passport-local-mongoose')
 mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
  console.log("connected to mongooo")
 })
  .catch(()=> {console.log("cant conect to mongoo")})
 
  const userModel = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
   name : {type:String},
   email : {type:String},
   password : {type:String},
   profileImage : {type:String},
   boards : { type : Array , default : []},
   posts : [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref : "Post"
    },
   ]
 });

 userModel.plugin(plm)
 module.exports = mongoose.model("User",userModel)