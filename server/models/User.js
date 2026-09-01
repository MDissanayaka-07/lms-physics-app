import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student"
    },
    fullName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    school: {
      type: String
    },
    nicNumber: {
      type: String
    },
    academicYear: {
      type: String
    },
    district: {
      type: String
    },
    parentPhone: {
      type: String
    },
    profileImageUrl: {
      type: String
    },
    dateOfBirth: {
      type: String
    },
    stream: {
      type: String,
      default: "Physical Science"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
