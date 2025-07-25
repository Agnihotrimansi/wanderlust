const express= require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const review = require("../models/review.js");
const listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor,} = require("../middleware.js");
const { isRef } = require("joi");

const reviewController= require("../controllers/reviews.js");

//post review route
router.post("/",
    isLoggedIn,
    validateReview ,wrapAsync( reviewController.createReview));
//delete route
router.delete("/:reviewId",
     isLoggedIn,
     isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports=router;