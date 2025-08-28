const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

//index route for show all listing on home page
module.exports.indexListing = async(req,res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{ allListing });
};

// new render form page
module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
};

//show route
module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({ path : "reviews",populate : { path : "author"}})
    .populate("owner");
    if(!listing){
        req.flash("error","The listing are you trying to access dosn't exist");
        res.redirect("/listings");
    };
    // console.log(listing);
    res.render("listings/show.ejs",{listing});
};

//Create route
module.exports.createListing = async (req,res,next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename};
    await newListing.save();
    // console.log(newListing);
    req.flash("success","New listing created successfully");
    res.redirect("/listings");
};

//Edit route
module.exports.editListing = async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","The listing are you trying to access dosn't exist");
        res.redirect("/listings");
    };

    let originalImageUrl = listing.image.url;
    console.log("-----before--->>>>>>>>>", originalImageUrl)

    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300/w_250");

    console.log("-------->>>>>>>>>", originalImageUrl)
    res.render("listings/edit.ejs", { listing , originalImageUrl });
};

//Update route
module.exports.updateListing = async (req,res,next) => {
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");
    }
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let filename = req.file.filename;
        let url = req.file.path;
        listing.image = {url , filename};
        await listing.save();
    }

    req.flash("success","Listing Updated Successfully");
    res.redirect(`/listings/${id}`);
};

//Delete route
module.exports.destroyListing = async (req,res) =>{
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted Listing : ",deletedListing);
    req.flash("success","Listing Deleted Successfully");
    res.redirect("/listings");
}