import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:userId", getMyOrders);
router.get("/", getAllOrders);

export default router;
