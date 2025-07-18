import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Men", "Women", "Kids"]
  },
  subCategory: {
    type: String,
    required: true,
    enum: ["Topwear", "Bottomwear", "Winterwear"]
  },
  images: {
    type: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
      }
    ],
    required: true,
    validate: [
      (images) => Array.isArray(images) && images.length > 0,
      "At least one image is required"
    ]
  },
  price: { type: Number, required: true },
  sizes: { type: Array, required: true },
  bestSeller: { type: Boolean, default: false },
  date: { type: Number }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
