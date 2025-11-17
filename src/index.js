import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import groupRoutes from './routes/groups.js';
import sessionRoutes from './routes/sessions.js';
import attendanceRoutes from './routes/attendance.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/attendance', attendanceRoutes);
const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/group_therapy')
  .then(()=> app.listen(PORT, ()=> console.log('Group Therapy API running on', PORT)))
  .catch(err=> console.error(err));
