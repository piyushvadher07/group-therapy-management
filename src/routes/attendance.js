import express from 'express';
import Attendance from '../models/Attendance.js';
import auth from '../middleware/auth.js';
const router = express.Router();
router.post('/', auth, async (req,res)=>{
  if(!['Therapist','Admin'].includes(req.user.role)) return res.status(403).json({ msg: 'Forbidden' });
  const a = await Attendance.create(req.body);
  res.json(a);
});
router.get('/session/:id', auth, async (req,res)=>{ const rec = await Attendance.find({ session: req.params.id }).populate('member','firstName lastName'); res.json(rec); });
export default router;
