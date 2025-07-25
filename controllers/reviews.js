const listing =require("../models/listing.js");
const review =require("../models/review.js");

module.exports.createReview =async (req,res)=>{
     console.log(req.params.id);
    let Listing= await listing.findById(req.params.id);
    let newReview = new review(req.body.review);
    newReview.author = req.usser._id,
    console.log(newReview);
    Listing.reviews.push(newReview);

     await newReview.save();
     await listing.save();
     req.flash("success","new Review  created!");
     console.log("new review saved");
     res.redirect(`/listings/${req.params.id}`);
   
};
module.exports.destroyReview = async (req,res)=>{
   let{id, reviewId}= req.params;

    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review deleted!");
    res.redirect(`/listings/${id}`);
};
