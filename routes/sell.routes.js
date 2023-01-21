import { Router } from "express";
import { getSell, addSell } from "../controllers/sell.controllers.js";
import { verifyToken } from "../middleware/authJwt.js";

const sellRouter = Router();

sellRouter.get("/:id", verifyToken, getSell);
sellRouter.post("/", verifyToken, addSell);

export default sellRouter;
