var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel =require ('../routes/users')
const localStrategy = require("passport-local");
const upload = require('./multer');
passport.use(new localStrategy(userModel.authenticate()))
/* GET home page. */

const isLoggedIn = (req,res,next)=>{
  if(req.isAuthenticated())
  {
    return next()
  }
  res.redirect("/login");
}
router.get("/profile",isLoggedIn,async(req,res)=>{
  const user = await userModel.findOne({username : req.session.passport.user});
  res.render("profile",{user,nav:true})
})
router.get('/', function(req, res, next) {
  res.render('register',{nav : false});
});

router.get("/register",(req,res)=>{
  res.render('register',{nav : false});
})
router.get("/login",(req,res)=>{
  res.render('login',{nav : false});
})
router.get("/logout",(req,res,next)=>{
  req.logout((err)=>{
    if(err) return next(err);
    res.redirect("/")
  })
})

router.post("/register",(req,res)=>{
  const{username,name,email}=req.body;
  var userData = new userModel({username,name,email});
  userModel.register(userData,req.body.password)
  .then(()=>passport.authenticate("local")(req,res,()=>{res.redirect("/profile")}))

})

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
}, (req, res) => {
  // This function will only be called if authentication succeeds
  console.log('Login successful');
  console.log(req.session); // Log the session to inspect it
  console.log(req.flash('error')); // Log flash messages
  res.redirect("/profile")
});




router.post("/fileUpload",isLoggedIn,upload.single("image"),async function(req,res){
  const user = await userModel.findOne({username : req.session.passport.user});
  user.profileImage = req.file.filename;
  await user.save();
  res.redirect("/profile")
})
 





module.exports = router;

