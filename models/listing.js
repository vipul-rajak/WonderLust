const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default: "https://unsplash.com/photos/man-riding-on-boat-near-golden-mosque-dskdujAQU44",
        set:(v) => v==="" ? "https://unsplash.com/photos/man-riding-on-boat-near-golden-mosque-dskdujAQU44"  :v,
    },
    price:Number,
    location:String,
    country:String,
    reviews :[ {
        type:Schema.Types.ObjectId,
        ref:"Review",
    },
],
   owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
   },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;