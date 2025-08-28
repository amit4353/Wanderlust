const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn , isOwner , validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


//Index route to show all listing on home page
// router.route marge with same page address so we don't need to define every time address of page

router
    .route("/") 
    .get(wrapAsync(listingControllers.indexListing))
    .post( isLoggedIn,
        upload.single("listing[image]"), 
        validateListing, 
        wrapAsync( listingControllers.createListing ));//create route

// new route
router.get("/new", isLoggedIn , listingControllers.renderNewForm);

router
    .route("/:id")
    .get(listingControllers.showListing) //show route
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync( listingControllers.updateListing )) //update route
    .delete(isLoggedIn, isOwner , listingControllers.destroyListing ); //Delete route


//edit route
router.get("/:id/edit", isLoggedIn , isOwner , listingControllers.editListing);

module.exports = router;
