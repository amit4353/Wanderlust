const Listing = require("./models/listing.js");
const Review = require("./models/review.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema} = require("./schema.js");

// module.exports.isLoggedIn = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         if (req.originalUrl.includes("/reviews")) {
//             // review wale POST route ko save na kare, instead uske listing show page ko save kare
//             const listingId = req.params.id; 
//             req.session.redirectUrl = `/listings/${listingId}`;
//         } else {
//             req.session.redirectUrl = req.originalUrl;
//         }
//         req.flash("error", "You must be logged in first!");
//         return res.redirect("/login");
//     }
//     next();
// };


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (req.originalUrl.includes("/reviews") && req.params.id) {
            req.session.redirectUrl = `/listings/${req.params.id}`;
        } else {
            req.session.redirectUrl = req.originalUrl || "/listings";
        }

        req.flash("error", "You must be logged in first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not owner of this listing");
        return res.redirect(`/listings/${ id }`);
    };
    next();
};

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};



module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


module.exports.isReviewAuthor = async(req,res,next) => {
    let { reviewId , id} = req.params;
    let review = await Review.findById(reviewId);
    if (!review){
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not owner of this Review");
        return res.redirect(`/listings/${id}`);
    };
    next();
}; 