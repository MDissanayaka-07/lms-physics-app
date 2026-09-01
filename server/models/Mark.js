import mongoose from "mongoose";

const markSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    examName: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      default: "Physics"
    },
    score: {
      type: Number,
      required: true
    },
    maxScore: {
      type: Number,
      default: 100
    },
    examDate: {
      type: Date,
      default: Date.now
    },
    remarks: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Mark", markSchema);
