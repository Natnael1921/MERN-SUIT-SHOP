import User from "../models/auth.model.js";
import Order from "../models/order.model.js"; 

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); 
    const totalOrders = await Order.countDocuments(); 

    res.status(200).json({
      success: true,
      totalUsers,
      totalOrders,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

