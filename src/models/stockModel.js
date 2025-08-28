import pool from '../config/db.js';

export const getStocksByUser = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM "Stock_portfolio".user_stocks WHERE user_id = $1',
    [userId]
  );
  return result.rows;
};

export const findStockByName = async (userId, stockName) => {
  const result = await pool.query(
    'SELECT * FROM "Stock_portfolio".user_stocks WHERE user_id=$1 AND UPPER(stock_name) LIKE $2',
    [userId, `%${stockName.toUpperCase()}%`]
  );
  return result.rows[0]; 
};

export const insertStock = async (userId, stockName, ticker, price) => {
  const result = await pool.query(
    'INSERT INTO "Stock_portfolio".user_stocks (user_id, stock_name, ticker, price,quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [userId, stockName, ticker,price, 1]
  );
  return result.rows[0];
};
export const updateStockPrice = async (stockId, userId, price) => {
  const result = await pool.query(
    'UPDATE "Stock_portfolio".user_stocks SET price = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
    [price, stockId, userId]
  );
  return result.rows[0];
};

export const deleteStock = async (stockId, userId) => {
  const result = await pool.query(
    'DELETE FROM "Stock_portfolio".user_stocks WHERE id = $1 AND user_id = $2 RETURNING *',
    [stockId, userId]
  );
  return result.rows[0];
};