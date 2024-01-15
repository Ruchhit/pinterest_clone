var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel =require ('../routes/users')

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()))
/* GET home page. */

const isLoggedIn = (req,res,next)=>{
  if(req.isAuthenticated())
  {
    return next()
  }
  res.redirect("/");
}
router.get("/profile",isLoggedIn,(req,res)=>{
  res.render("profile")
})
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/register",(req,res)=>{
  res.render('register');
})
 

router.post("/register",(req,res)=>{
  var userData = new userModel({
    username : req.body.username,
    name : req.body.name,
    email : req.body.email,
  });
  userModel.register(userData,req.body.password)
  .then(()=>passport.authenticate("local")(req,res,()=>{res.redirect("/profile")}))

})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}));


router.get("/logout",(req,res,next)=>{
  req.logout((err)=>{
    if(err) return nrxt(err);
    res.redirect("/")
  })
})

 





module.exports = router;

