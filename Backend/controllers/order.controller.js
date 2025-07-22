import Order from "../models/order.model.js";

// POST /api/orders - create order
export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const order = await Order.create({ userId, items });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/:userId - get orders of a user
export const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders - get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
