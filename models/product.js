import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    categorie: {
      type: String,
      require: true,
      trim: true,
    },
    desc: {
      type: String,
      require: true,
      trim: true,
    },
    imgUrl: {
      type: String,
      require: true,
      trim: true,
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
    },
    selled:{
      type:Number,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", productSchema);
