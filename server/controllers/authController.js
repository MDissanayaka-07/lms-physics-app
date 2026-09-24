import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";
import { generateVerificationCode, sendVerificationEmail } from "../utils/emailService.js";

// In-memory OTP storage map: email -> { code, expiresAt }
const otpStore = new Map();

/**
 * Send OTP verification code to student's email
 */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Valid email address is required." });
    }

    const cleanEmail = email.toLowerCase().trim();
    const code = generateVerificationCode();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Save code to in-memory store
    otpStore.set(cleanEmail, { code, expiresAt });

    // Send email using Nodemailer (Gmail madhudissa07@gmail.com)
    await sendVerificationEmail(cleanEmail, code);

    console.log(`[OTP SENT] Code '${code}' sent to ${cleanEmail}`);

    res.json({
      success: true,
      message: `Verification code sent to ${cleanEmail}`,
      code: code
    });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).json({ message: "Failed to send verification email: " + error.message });
  }
};

/**
 * Verify OTP code entered by student
 */
export const verifyOtp = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and verification code are required." });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanCode = code.toString().trim();

    const storedOtp = otpStore.get(cleanEmail);

    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        message: "No verification code found for this email. Please request a new code."
      });
    }

    if (Date.now() > storedOtp.expiresAt) {
      otpStore.delete(cleanEmail);
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please click resend to get a new code."
      });
    }

    if (storedOtp.code !== cleanCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code. The 6-digit code entered does not match."
      });
    }

    // Verification successful! Remove from OTP store
    otpStore.delete(cleanEmail);

    // Look up or auto-create user tuple in Neon PostgreSQL database
    let user = null;
    if (sql) {
      try {
        const users = await sql`SELECT id, full_name, email, role FROM users WHERE LOWER(email) = ${cleanEmail} LIMIT 1`;
        if (users && users.length > 0) {
          user = users[0];
        } else {
          // Auto create user tuple in Neon DB users table so table is never empty
          const defaultName = cleanEmail.split("@")[0] || "Student";
          const defaultPhone = "07" + Math.floor(10000000 + Math.random() * 90000000).toString();
          const hashedPassword = await bcrypt.hash("123456", 10);

          const newRows = await sql`
            INSERT INTO users (role, full_name, email, phone_number, password)
            VALUES ('student', ${defaultName}, ${cleanEmail}, ${defaultPhone}, ${hashedPassword})
            RETURNING id, full_name, email, role
          `;
          if (newRows && newRows.length > 0) {
            user = newRows[0];
            console.log(`✅ [NEON DB] Saved new user tuple into 'users' table: ID ${user.id} (${cleanEmail})`);
          }
        }
      } catch (err) {
        console.warn("Neon DB query error:", err.message);
      }
    }

    const token = jwt.sign(
      { id: user ? user.id : "temp-id", email: cleanEmail },
      process.env.JWT_SECRET || "default_jwt_secret",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Email verified successfully!",
      token,
      user: {
        id: user ? user.id : "temp-id",
        email: cleanEmail,
        fullName: user ? user.full_name : "Student"
      }
    });
  } catch (error) {
    console.error("verifyOtp Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Register User in Neon PostgreSQL
 */
export const registerUser = async (req, res) => {
  try {
    const {
      role,
      fullName,
      email,
      phoneNumber,
      password,
      school,
      nicNumber,
      academicYear,
      district,
      parentPhone
    } = req.body;

    const cleanEmail = email ? email.toLowerCase().trim() : null;

    if (sql) {
      // Check existing user in Neon DB
      const existing = await sql`
        SELECT id FROM users 
        WHERE (email IS NOT NULL AND LOWER(email) = ${cleanEmail}) 
           OR phone_number = ${phoneNumber} 
        LIMIT 1
      `;

      if (existing && existing.length > 0) {
        return res.status(400).json({ message: "User with this email or phone number is already registered." });
      }

      const hashedPassword = await bcrypt.hash(password || "123456", 10);

      const rows = await sql`
        INSERT INTO users (
          role, full_name, email, phone_number, password, 
          school, nic_number, academic_year, district, parent_phone
        )
        VALUES (
          ${role || 'student'}, ${fullName}, ${cleanEmail}, ${phoneNumber}, ${hashedPassword},
          ${school || null}, ${nicNumber || null}, ${academicYear || null}, ${district || null}, ${parentPhone || null}
        )
        RETURNING id, role, full_name, email, phone_number
      `;

      const user = rows[0];

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "default_jwt_secret",
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        token,
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          phoneNumber: user.phone_number,
          role: user.role
        }
      });
    }

    res.status(500).json({ message: "Neon Database is not connected." });
  } catch (error) {
    console.error("registerUser Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Login User in Neon PostgreSQL
 */
export const loginUser = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;
    const cleanEmail = email ? email.toLowerCase().trim() : null;

    if (sql) {
      const rows = await sql`
        SELECT * FROM users 
        WHERE (email IS NOT NULL AND LOWER(email) = ${cleanEmail})
           OR phone_number = ${phoneNumber}
        LIMIT 1
      `;

      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "User account not found." });
      }

      const user = rows[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "default_jwt_secret",
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          phoneNumber: user.phone_number,
          role: user.role,
          school: user.school || "",
          nicNumber: user.nic_number || "",
          academicYear: user.academic_year || "A/L 2026",
          district: user.district || "",
          parentPhone: user.parent_phone || "",
          profilePic: user.profile_pic || "",
          bio: user.bio || ""
        }
      });
    }

    res.status(500).json({ message: "Neon Database is not connected." });
  } catch (error) {
    console.error("loginUser Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get User Profile
 */
export const getProfile = async (req, res) => {
  try {
    const { identifier } = req.params;

    if (!sql) {
      return res.status(500).json({ message: "Database not connected." });
    }

    const rows = await sql`
      SELECT id, role, full_name, email, phone_number, school, nic_number, academic_year, district, parent_phone, profile_pic, bio, created_at
      FROM users
      WHERE id::text = ${identifier} OR LOWER(email) = ${identifier.toLowerCase()} OR phone_number = ${identifier}
      LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "User profile not found." });
    }

    const user = rows[0];
    res.json({
      success: true,
      user: {
        id: user.id,
        role: user.role,
        fullName: user.full_name,
        email: user.email,
        phoneNumber: user.phone_number,
        school: user.school || "",
        nicNumber: user.nic_number || "",
        academicYear: user.academic_year || "A/L 2026",
        district: user.district || "",
        parentPhone: user.parent_phone || "",
        profilePic: user.profile_pic || "",
        bio: user.bio || "",
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error("getProfile Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update User Profile
 */
export const updateProfile = async (req, res) => {
  try {
    const {
      id,
      email,
      fullName,
      phoneNumber,
      school,
      nicNumber,
      academicYear,
      district,
      parentPhone,
      profilePic,
      bio,
      password
    } = req.body;

    if (!sql) {
      return res.status(500).json({ message: "Database not connected." });
    }

    const cleanEmail = email ? email.toLowerCase().trim() : "";
    let hashedPassword = null;
    if (password && password.length >= 6) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const rows = await sql`
      UPDATE users
      SET 
        full_name = COALESCE(${fullName}, full_name),
        phone_number = COALESCE(${phoneNumber}, phone_number),
        school = ${school || null},
        nic_number = ${nicNumber || null},
        academic_year = ${academicYear || null},
        district = ${district || null},
        parent_phone = ${parentPhone || null},
        profile_pic = ${profilePic || null},
        bio = ${bio || null},
        password = COALESCE(${hashedPassword}, password)
      WHERE id = ${id || 0} OR (email IS NOT NULL AND LOWER(email) = ${cleanEmail})
      RETURNING id, role, full_name, email, phone_number, school, nic_number, academic_year, district, parent_phone, profile_pic, bio
    `;

    let user = rows && rows.length > 0 ? rows[0] : null;

    if (!user) {
      return res.status(404).json({ message: "User not found in Neon database to update." });
    }

    console.log(`✅ [NEON DB] Profile updated for user ID ${user.id} (${user.full_name})`);

    res.json({
      success: true,
      message: "Profile updated successfully!",
      user: {
        id: user.id,
        role: user.role,
        fullName: user.full_name,
        email: user.email,
        phoneNumber: user.phone_number,
        school: user.school || "",
        nicNumber: user.nic_number || "",
        academicYear: user.academic_year || "A/L 2026",
        district: user.district || "",
        parentPhone: user.parent_phone || "",
        profilePic: user.profile_pic || "",
        bio: user.bio || ""
      }
    });
  } catch (error) {
    console.error("updateProfile Error:", error);
    res.status(500).json({ message: error.message });
  }
};

