import mongoose from "mongoose";

export const currentRoles = ["user", "admin"]

const roleSchema = mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);

export default mongoose.model("Role", roleSchema)