import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles:[{
      ref:"Role",
      type: Schema.Types.ObjectId,
    }],
  },
  { timestamps: true, versionKey: false }
);

userSchema.statics.encryptPass = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

userSchema.statics.comparePass = async(password, receivedPassword)=>{
    return await bcrypt.compare(password, receivedPassword)
}

export default mongoose.model("User", userSchema);
