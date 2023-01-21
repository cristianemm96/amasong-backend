import mongoose from "mongoose";

const sellSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      require: true,
      trim: true,
    },
    productID:{
      type: String,
      required: true,
      trim: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Sell", sellSchema);
