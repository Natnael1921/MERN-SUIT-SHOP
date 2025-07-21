import express from "express";
import {
  addToCart,
  getUserCart,
  deleteCartItem,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getUserCart);
router.delete("/:id", deleteCartItem);

export default router;
