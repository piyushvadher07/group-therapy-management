import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();
router.post('/register', [
  body('firstName').notEmpty(), body('email').isEmail(), body('password').isLength({min:6})
], async (req,res)=>{
  const errors = validationResult(req); if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
  const { firstName,lastName,email,password,role } = req.body;
  let exists = await User.findOne({ email }); if(exists) return res.status(400).json({ msg: 'Exists' });
  const hashed = await bcrypt.hash(password,10);
  const user = await User.create({ firstName,lastName,email,password:hashed, role: role || 'Member' });
  res.json({ msg: 'Registered', id: user._id });
});
router.post('/login', [body('email').isEmail(), body('password').exists()], async (req,res)=>{
  const errors = validationResult(req); if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
  const { email,password } = req.body; const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ msg: 'Invalid' });
  const ok = await bcrypt.compare(password, user.password); if(!ok) return res.status(400).json({ msg: 'Invalid' });
  const token = jwt.sign({ user: { id: user._id, role: user.role } }, process.env.JWT_SECRET || 'secret', { expiresIn: '12h' });
  res.json({ token });
});
export default router;
