import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      default: "Physics"
    },
    year: {
      type: String
    },
    fileUrl: {
      type: String
    },
    category: {
      type: String,
      default: "Model Paper"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Paper", paperSchema);
