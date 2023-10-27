import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: String,
    description: String,
    cDate: { type: Date, default: Date.now },
    uDate: { type: Date, default: Date.now },
  });

const reviewModel = mongoose.model("Review",reviewSchema);

export default reviewModel;