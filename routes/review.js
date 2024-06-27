const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isOwner, isLoggedIn,isReviewAuthor } = require("../middleware.js");



//  Post Review Route
router.post("/", 
    isOwner,
    validateReview, 
    wrapAsync( async (req, res) =>{
        console.log(req.params.id);
        let listing = await  Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        newReview = new Review(req.body.review);
        console.log(newReview);
        listing.reviews.push(newReview);
    
        await newReview.save();
        req.flash("success", "New review created");
        await listing.save();
        
    
        console.log("new review saved");
      res.redirect(`/listings/${listing._id}`);
    
    }));
    
   
    
    // Delete Review Route
    router.delete(  
        "/:reviewId",
        isLoggedIn,
        isReviewAuthor,
        wrapAsync( async (req,res) =>{
            let {id, reviewId } = req.params;
    
            await Listing.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
            await Review.findByIdAndDelete(reviewId);
            req.flash("success", "Review deleted");
    
            res.redirect(`/listings/${id}`);
        })
    );

    module.exports = router;
    