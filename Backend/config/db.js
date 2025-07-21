import mongoose from "mongoose";
export async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("Error connecting DB:", error);
    process.exit(1);
  }
}
