import express from "express";
import categorieRouter from "./routes/categories.routes.js";
import productsRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
import sellRouter from "./routes/sell.routes.js";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import { createRoles } from "./libs/initialSetup.js";

const app = express();
createRoles();
app.use((req, res, next) => {
  res.header("x-acess-token");
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header(
  //  "Access-Control-Allow-Headers",
  //  "Origin, X-Requested-With, Content-Type, Accept"
  //);
  next();
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/categories", categorieRouter);
app.use("/products", productsRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/sell", sellRouter);

export default app;
