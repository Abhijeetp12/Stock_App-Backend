import axios from 'axios';
import {
  getStocksByUser,
  findStockByName,
  insertStock,
  updateStockPrice,
  deleteStock
} from '../models/stockModel.js';

export const createStockFromAPI = async (req, res) => {
  const inputName = req.body.StockName;
  const userId = req.user.id;

  try {
    const normalizedInput = inputName.trim().toUpperCase();

    // Check duplicate
    const existingStock = await findStockByName(userId, normalizedInput);
    if (existingStock) {
      return res.status(409).json({ message: 'Stock already added' });
    }

    // Check stock limit
    const userStocks = await getStocksByUser(userId);
    if (userStocks.length >= 5) {
      return res.status(403).json({ message: 'Stock Limit Reached' });
    }

    // Fetch stock details
    const response = await axios.get(
      `${process.env.API_URL}/query?function=SYMBOL_SEARCH&keywords=${normalizedInput}&apikey=${process.env.API_KEY}`
    );
    const stock = response.data.bestMatches?.[0];
    if (!stock) return res.status(404).json({ message: 'Stock not found' });

    const stockName = stock['2. name'];
    let stockSymbol = stock['1. symbol'];
    const ticker = stockSymbol.replace('.BSE', '');

    // Fetch stock price
    const quoteResponse = await axios.get(
      `${process.env.API_URL}/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.API_KEY}`
    );
    const price = quoteResponse.data['Global Quote']?.['05. price'];
    if (!price) return res.status(404).json({ message: 'Price not available' });

    // Insert into DB
    const inserted = await insertStock(userId, stockName, ticker, price);

    return res.status(201).json({ stock: inserted }); // ✅ 201 Created
  } catch (error) {
    console.error('Error adding stock:', error);
    return res.status(500).json({ message: 'Error adding stock' });
  }
};

export const getUserStocks = async (req, res) => {
  try {
    const userId = req.user.id;
    const stocks = await getStocksByUser(userId);

    return res.status(200).json({ stocks }); // ✅ matches frontend: response.data.stocks
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching stocks' });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { stockId } = req.params;
    const { price } = req.body;
    const userId = req.user.id; // comes from auth middleware

    const updated = await updateStockPrice(stockId, userId, price);
    if (!updated) return res.status(404).json({ message: 'Stock not found or unauthorized' });

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating stock' });
  }
};

export const removeStock = async (req, res) => {
  try {
    const { stockId } = req.params;
    const userId = req.user.id;

    const deleted = await deleteStock(stockId, userId);
    if (!deleted) return res.status(404).json({ message: 'Stock not found or unauthorized' });

    return res.status(200).json({ message: 'Stock deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting stock' });
  }
};
