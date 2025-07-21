import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  clothId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cloth",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
}, {
  timestamps: true,
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
