import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    durationMinutes: {
      type: Number,
      default: 30
    },
    questions: [questionSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
