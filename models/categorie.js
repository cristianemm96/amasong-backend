import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema(
    {
        categorie:{
            type: String,
            require: true,
            trim: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export default mongoose.model('Categorie', categorieSchema);