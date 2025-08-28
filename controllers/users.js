const User = require("../models/user.js");


module.exports.showSignUpForm = (req,res) => {
    res.render("users/signup.ejs");
};


module.exports.signUpPage = async (req,res) => {
    try{
        let {username , email , password} = req.body;
        const newUser = new User({username , email});
        const registeredUser = await User.register(newUser,password);
        // console.log("registeredUser : " , registeredUser);
        req.login(registeredUser , (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success" , "Welcome to Wanderlust"); 
            // console.log(registeredUser)
            res.redirect("/listings");
        })
    } catch(err){
        req.flash("error" , err.message);
        res.redirect("/signup");
    }
};


module.exports.showLoginForm = async(req,res) => {
    res.render("users/login.ejs");
};


module.exports.loginPage = async(req,res) => {
    req.flash("success","Welcome to Wanderlust! You are logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};


module.exports.logOutPage = (req,res) => {
    req.logOut((err) => {
        if(err){
            next(err);
        } else {
            req.flash("success" , "You are logged out! ");
            res.redirect("/login");
        }
    });
};