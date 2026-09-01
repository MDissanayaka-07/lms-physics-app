import pg from "pg";
const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.PGUSER || "neondb_owner"}:${process.env.PGPASSWORD || "npg_1dWKtqgQhE3X"}@ep-rapid-bird-a5i0b323-pooler.us-east-2.aws.neon.tech/Physics_LMS?sslmode=require`;

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Neon PostgreSQL Database Connected Successfully!");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        role VARCHAR(50) DEFAULT 'student',
        phone_number VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        avatar_url VARCHAR(500) DEFAULT '/avatar.jpg',
        school VARCHAR(255),
        nic_number VARCHAR(100),
        academic_year VARCHAR(100),
        district VARCHAR(100),
        parent_phone VARCHAR(50),
        profile_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500) DEFAULT '/avatar.jpg';

    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS otps (
        id SERIAL PRIMARY KEY,
        phone_number VARCHAR(50) NOT NULL,
        otp_code VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    client.release();
    console.log("Neon DB schema initialized (users & otps tables ready).");
  } catch (error) {
    console.error("Neon PostgreSQL Connection Error:", error.message);
  }
};

export default connectDB;