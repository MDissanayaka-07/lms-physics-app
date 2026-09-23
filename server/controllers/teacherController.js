import { sql } from "../config/db.js";

export const getAllStudents = async (req, res) => {
  try {
    if (!sql) return res.status(500).json({ message: "Database not connected" });
    const students = await sql`SELECT id, full_name, email, phone_number, school, nic_number, academic_year, district, parent_phone, role FROM users WHERE role = 'student' ORDER BY created_at DESC`;
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
