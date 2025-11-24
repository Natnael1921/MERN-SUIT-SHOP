import mongoose from "mongoose";

const clothSchema = mongoose.Schema({
  image: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
});
const Cloth = mongoose.model("Cloth", clothSchema);
export default Cloth;
