import mongoose from "mongoose";
import express from "express";
import { connectDB } from "./config/db.js";
import clothRoutes from "./routes/cloth.route.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";

import dotenv from "dotenv";
import cors from "cors";
 console.log('All routes:', {
  orderRoutes: orderRoutes.stack.map(layer => layer.route?.path),
  clothRoutes: clothRoutes.stack.map(layer => layer.route?.path)
});
dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Suit Api Ready!!");
});

app.use("/api/orders", orderRoutes);
app.use("/api/clothes", clothRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

app.listen(5000, () => {
  console.log("server connected at: http://localhost:5000");
});
