import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        clothId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Cloth",
        },
        image: String,
        description: String,
        price: Number,
        size: String,
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
