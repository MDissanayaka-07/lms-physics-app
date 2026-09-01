import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignmentTitle: {
      type: String,
      required: true
    },
    note: {
      type: String
    },
    filePath: {
      type: String
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Graded"],
      default: "Pending"
    },
    score: {
      type: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
