import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("MongoDB Connecting...");
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MongoDB URI not found in environment variables");
      process.exit(1);
    }
    await mongoose.connect(mongoUri, {});
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
