const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

 const postModel = new mongoose.Schema({
  user : {type: mongoose.Schema.Types.ObjectId,
          ref : "User"},
  title : {type:String},
  description : {type:String},
  postImage : {type:String},
});

postModel.plugin(plm)
module.exports = mongoose.model("Post",postModel)