import pool from '../config/db.js'; 

export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM "Stock_portfolio".users WHERE email = $1', [email]);
  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM "Stock_portfolio".users WHERE id = $1', [id]);
  return result.rows[0];
};

export const createUser = async (email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO "Stock_portfolio".users (email, password) VALUES ($1, $2) RETURNING id, email',
    [email, hashedPassword]
  );
  return result.rows[0];
};

export const getUserPortfolio = async (userId) => {
  const result = await pool.query('SELECT * FROM "Stock_portfolio".user_stocks WHERE user_id = $1', [userId]);
  return result.rows;
};
