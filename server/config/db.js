import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connStr =
      process.env.MONGODB_URI ||
      process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/lms_physics_app";
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2500
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}`);
    console.warn("Backend server running (MongoDB connection optional/pending).");
  }
};

export default connectDB;