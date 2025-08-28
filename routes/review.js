const express = require("express");
const router = express.Router({mergeParams : true}); //!importent
// Note : - 
// mergeParams: true => parent route (listing ka id) ke params 
// ko bhi access karne deta hai is router ke andar

const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn ,isReviewAuthor} = require("../middleware.js")
const reviewControllers = require("../controllers/reviews.js");


//show reviews route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewControllers.createReview));

// Delete Reviews Route

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync ( reviewControllers.destroyReview));

module.exports = router;