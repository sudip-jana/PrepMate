
// Middleware to protect routes
import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1]; //split(" ") splits it into ["Bearer", "token"]

  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next(); //If all goes well, next() passes control to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default protect;
