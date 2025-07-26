import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/order.controller.js";

console.log("✅ order.route.js loaded"); 

const router = express.Router();

router.post("/create", createOrder);
router.get("/", getAllOrders);
router.get("/:userId", getMyOrders);

export default router;
