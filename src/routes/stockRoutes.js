import express from 'express';
import {
  getUserStocks,
  AddStock,
  updateStock,
  removeStock,
} from '../controllers/stockController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getUserStocks);
router.post('/', AddStock);
router.put('/:stockId', updateStock);
router.delete('/:stockId', removeStock);

export default router;
