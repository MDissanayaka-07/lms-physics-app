import User from "../models/User.js";
import Mark from "../models/Mark.js";

export const getStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentMarks = async (req, res) => {
  try {
    const marks = await Mark.find({ studentId: req.user.id }).sort({ examDate: -1 });
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
