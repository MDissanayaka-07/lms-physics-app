import { sql } from "../config/db.js";

export const addMark = async (req, res) => {
  try {
    const { studentId, examName, score, maxScore } = req.body;
    if (!sql) return res.status(500).json({ message: "Database not connected" });
    const rows = await sql`
      INSERT INTO marks (user_id, exam_name, score, max_score)
      VALUES (${studentId}, ${examName}, ${score}, ${maxScore || 100})
      RETURNING *
    `;
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMarksByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!sql) return res.status(500).json({ message: "Database not connected" });
    const marks = await sql`SELECT * FROM marks WHERE user_id = ${studentId} ORDER BY exam_date DESC`;
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
