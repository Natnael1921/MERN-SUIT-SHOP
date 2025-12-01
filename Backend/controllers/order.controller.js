import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const order = await Order.create({ userId, items });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; 

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("items.clothId", "description"); 
    const suitNames = recentOrders.flatMap(order =>
      order.items.map(item => item.clothId?.description)
    );

    res.status(200).json({
      success: true,
      data: suitNames,
    });

  } catch (err) {
    console.error("Error fetching recent orders:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
