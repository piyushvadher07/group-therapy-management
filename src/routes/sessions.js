import express from 'express';
import Session from '../models/Session.js';
import Group from '../models/Group.js';
import auth from '../middleware/auth.js';
const router = express.Router();
router.post('/', auth, async (req,res)=>{
  if(!['Therapist','Admin'].includes(req.user.role)) return res.status(403).json({ msg: 'Forbidden' });
  const session = await Session.create(req.body);
  res.json(session);
});
router.get('/group/:groupId', auth, async (req,res)=>{
  const sessions = await Session.find({ group: req.params.groupId });
  res.json(sessions);
});
export default router;
