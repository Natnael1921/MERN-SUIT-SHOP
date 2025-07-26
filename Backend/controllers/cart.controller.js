import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  console.log("Received body:", req.body);
  const { userId, clothId, quantity } = req.body;
  if (!userId || !clothId) return res.status(400).json({ message: "Missing fields" });

  try {
    const existingItem = await Cart.findOne({ userId, clothId });
    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const newItem = await Cart.create({ userId, clothId, quantity });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cartItems = await Cart.find({ userId }).populate("clothId");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
