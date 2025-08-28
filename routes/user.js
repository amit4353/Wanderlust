const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl  } = require("../middleware.js");
const userControllers = require("../controllers/users.js");



router.route("/signup")
    .get(userControllers.showSignUpForm) //show sign Up form
    .post(wrapAsync( userControllers.signUpPage)); //sign up




router.route("/login")
    .get(userControllers.showLoginForm) // show login page
    .post( // login set-up
        saveRedirectUrl, 
        passport.authenticate("local",{
            failureRedirect : "/login", 
            failureFlash : true,
        }), userControllers.loginPage
    );




//logout page
router.get("/logout",userControllers.logOutPage);


module.exports = router;
