import mongoose from "mongoose";
import express from "express";
import { connectDB } from "./config/db.js";
import clothRoutes from "./routes/cloth.route.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Suit Api Ready!!");
});

app.use("/api/clothes", clothRoutes);

app.listen(5000, () => {
  console.log("server connected at: http://localhost:5000");
});
