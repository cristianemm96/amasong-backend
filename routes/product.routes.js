import { Router } from "express";
import { getProducts, getProduct, addProduct, addSellToProduct } from "../controllers/product.controllers.js";
import { verifyToken, isAdmin } from "../middleware/authJwt.js";


const productsRouter = Router();

productsRouter.get("/", getProducts)
productsRouter.get("/:id", verifyToken, getProduct)
productsRouter.post("/", [verifyToken, isAdmin],addProduct)
productsRouter.put("/add-sell/:id", verifyToken, addSellToProduct)

export default productsRouter;