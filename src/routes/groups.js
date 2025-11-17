import express from 'express';
import Group from '../models/Group.js';
import auth from '../middleware/auth.js';
const router = express.Router();
router.post('/', auth, async (req,res)=>{
  if(!['Therapist','Admin'].includes(req.user.role)) return res.status(403).json({ msg: 'Forbidden' });
  const g = await Group.create({ ...req.body, therapist: req.user.id });
  res.json(g);
});
router.get('/', auth, async (req,res)=>{ const groups = await Group.find().populate('therapist','firstName lastName'); res.json(groups); });
router.post('/:id/join', auth, async (req,res)=>{
  const group = await Group.findById(req.params.id);
  if(!group) return res.status(404).json({ msg: 'Not found' });
  if(group.members.length >= (group.capacity || 100)) return res.status(400).json({ msg: 'Full' });
  if(group.members.includes(req.user.id)) return res.status(400).json({ msg: 'Already member' });
  group.members.push(req.user.id); await group.save(); res.json(group);
});
export default router;
