import jwt from 'jsonwebtoken';
import { findUserById } from '../models/userModel.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token', error: err.message });
  }
};
