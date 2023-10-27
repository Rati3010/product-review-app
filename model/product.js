import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  cDate: { type: Date, default: Date.now },
  uDate: { type: Date, default: Date.now },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const productModel = mongoose.model("Product",productSchema);

export default productModel;