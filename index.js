import express from "express";
import productModel from "./model/product.js";
import reviewModel from "./model/review.js";
import dotenv from "dotenv";
import connection from "./utils/db.js";
import productRouter from "./routes/product.route.js";

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api",productRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Server is running on port : ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
