import Submission from "../models/Submission.js";

export const getSubmissions = async (req, res) => {
  try {
    const filter = req.user?.role === "student" ? { studentId: req.user.id } : {};
    const submissions = await Submission.find(filter).populate("studentId", "fullName phoneNumber");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSubmission = async (req, res) => {
  try {
    const { assignmentTitle, note } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : "";
    const submission = await Submission.create({
      studentId: req.user?.id,
      assignmentTitle,
      note,
      filePath
    });
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
