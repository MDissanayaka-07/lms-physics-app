import { pool } from "../config/db.js";

export const getAllStudents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, role, phone_number, full_name, school, nic_number, academic_year, district, parent_phone, profile_completed FROM users WHERE role = 'student' ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

