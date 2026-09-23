import Mark from "../models/Mark.js";

export const addMark = async (req, res) => {
  try {
    const { studentId, examName, score, maxScore, remarks } = req.body;
    const mark = await Mark.create({
      studentId,
      examName,
      score,
      maxScore: maxScore || 100,
      remarks
    });
    res.status(201).json(mark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMarksByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const marks = await Mark.find({ studentId }).sort({ examDate: -1 });
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
