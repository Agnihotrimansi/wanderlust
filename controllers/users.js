const User = require("../models/user");
const listing = require("../models/listing");
module.exports.renderSingupform=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup =async (req,res)=>{
    try{
        let {username,email,password} =req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next (err);
        }
        req.flash("success","welcomr to Wanderlust");
         res.redirect("/listings");
    });
    //req.flash("success","welcome to Wanderlust");
    //res.redirect("/listings");
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
 };

 module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
 };

 
 module.exports.login=async(res,req)=>{
 res.flash("success","welcome back to Wanderlust" );
 let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
 };

 module.exports.logout=(req,res,next)=>{
 req.logout((err) => {
    if(err) {
     return  next(err);
    }
    req.flash("success","you are loged out");
    res.redirect("/listings");
 })

 };
 