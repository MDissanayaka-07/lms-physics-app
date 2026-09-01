import { pool } from "../config/db.js";

export const getStudentProfile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, role, phone_number, full_name, school, nic_number, academic_year, district, parent_phone, profile_completed FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found." });
    }
    const student = result.rows[0];
    res.json({
      id: student.id,
      role: student.role,
      phoneNumber: student.phone_number,
      fullName: student.full_name,
      school: student.school,
      nicNumber: student.nic_number,
      academicYear: student.academic_year,
      district: student.district,
      parentPhone: student.parent_phone,
      profileCompleted: student.profile_completed
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentMarks = async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

