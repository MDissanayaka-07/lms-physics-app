import { sql } from "../config/db.js";

export const getStudentProfile = async (req, res) => {
  try {
    if (!sql) return res.status(500).json({ message: "Database not connected" });
    const rows = await sql`SELECT id, full_name, email, phone_number, school, nic_number, academic_year, district, parent_phone, role FROM users WHERE id = ${req.user.id} LIMIT 1`;
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentMarks = async (req, res) => {
  try {
    if (!sql) return res.status(500).json({ message: "Database not connected" });
    const marks = await sql`SELECT * FROM marks WHERE user_id = ${req.user.id} ORDER BY exam_date DESC`;
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
