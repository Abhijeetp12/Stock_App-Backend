// db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(client => {
    console.log("✅ Connected to Neon PostgreSQL");
    client.release();
  })
  .catch(err => {
    console.error("❌ Error connecting to Neon:", err);
  });

export default pool;
