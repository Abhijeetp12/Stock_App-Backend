import express from 'express';
import {
  getUserStocks,
  createStockFromAPI,
  updateStock,
  removeStock,
} from '../controllers/stockController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getUserStocks);
router.post('/', createStockFromAPI); // now uses external API
router.put('/:stockId', updateStock);
router.delete('/:stockId', removeStock);

export default router;
