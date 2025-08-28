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
    console.log("Connected to Database");
    client.release();
  })
  .catch(err => {
    console.error("Error connecting to Database:", err);
  });

export default pool;
