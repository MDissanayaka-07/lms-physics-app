import pg from "pg";
import { neon } from "@neondatabase/serverless";

const { Pool } = pg;

let pool = null;
let sql = null;

const connectDB = async () => {
  const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

  if (!connectionString) {
    console.log("==================================================================");
    console.log("⚠️ NEON DATABASE NOT CONNECTED YET");
    console.log("Please add your NEON DATABASE_URL to server/.env:");
    console.log('DATABASE_URL="postgresql://user:password@ep-xyz.us-east-1.aws.neon.tech/neondb?sslmode=require"');
    console.log("==================================================================");
    return null;
  }

  try {
    // Initialize Neon Serverless HTTP SQL driver
    sql = neon(connectionString);

    // Also initialize Pool for standard queries
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false }
    });

    // Test connection
    const result = await sql`SELECT NOW()`;
    console.log(`✅ Connected to Neon PostgreSQL Database! Server time: ${result[0].now}`);

    // Auto-create initial tables if they don't exist
    await initTables();

    return { sql, pool };
  } catch (error) {
    console.error(`❌ Neon Database Connection Error: ${error.message}`);
    return null;
  }
};

/**
 * Auto-create LMS tables in Neon Database
 */
const initTables = async () => {
  try {
    if (!sql) return;

    // Create Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        role VARCHAR(20) DEFAULT 'student',
        full_name VARCHAR(150) NOT NULL,
        email VARCHAR(150) UNIQUE,
        phone_number VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        school VARCHAR(150),
        nic_number VARCHAR(50),
        academic_year VARCHAR(50),
        district VARCHAR(100),
        parent_phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create Marks table
    await sql`
      CREATE TABLE IF NOT EXISTS marks (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        exam_name VARCHAR(150) NOT NULL,
        score NUMERIC(5,2) NOT NULL,
        max_score NUMERIC(5,2) DEFAULT 100,
        exam_date DATE DEFAULT CURRENT_DATE
      );
    `;

    console.log("🐘 LMS Physics tables verified in Neon PostgreSQL Database.");
  } catch (err) {
    console.error("Error creating Neon DB tables:", err.message);
  }
};

export { sql, pool };
export default connectDB;