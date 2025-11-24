import Cloth from "../models/cloth.model.js";

export async function addCloths(req, res) {
  const { image, description, size, price, type, color } = req.body;
  if (!description || !size || !price || !image || !type || !color) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }
  try {
    const cloth = await Cloth.create({
      image,
      description,
      size,
      price,
      type,
      color,
    });
    res.status(201).json({ message: "Cloth Added successfully !", cloth });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getCloths(req, res) {
  try {
    const { type, color } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (color) filter.color = color;

    const clothes = await Cloth.find(filter);
    res.status(200).json({ success: true, data: clothes });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function deleteCloths(req, res) {
  const { id } = req.params;
  try {
    const cloth = await Cloth.findByIdAndDelete(id);
    if (!cloth) {
      return res
        .status(404)
        .json({ success: false, message: "Cloth not found" });
    }
    res.json({ success: true, message: "Cloth deleted" });
  } catch (error) {
    console.error("Error deleting cloth:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
