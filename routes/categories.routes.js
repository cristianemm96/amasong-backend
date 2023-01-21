import { Router } from "express";
import { getCategories, addCategorie } from "../controllers/categorie.controllers.js";
import { verifyToken, isAdmin } from "../middleware/authJwt.js";

const categorieRouter = Router();

categorieRouter.get("/", getCategories);
categorieRouter.post("/", [verifyToken, isAdmin], addCategorie);

export default categorieRouter