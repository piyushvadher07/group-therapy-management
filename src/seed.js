import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Group from './models/Group.js';
import bcrypt from 'bcryptjs';
dotenv.config();
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/group_therapy';
async function seed(){
  await mongoose.connect(MONGO);
  await User.deleteMany({}); await Group.deleteMany({});
  const admin = await User.create({ firstName:'Admin', email:'admin@gt.com', password: await bcrypt.hash('password',10), role:'Admin' });
  const therapist = await User.create({ firstName:'Therapist', email:'therapist@gt.com', password: await bcrypt.hash('password',10), role:'Therapist' });
  const member = await User.create({ firstName:'Member', email:'member@gt.com', password: await bcrypt.hash('password',10), role:'Member' });
  const g = await Group.create({ name:'Anxiety Group', description:'Weekly anxiety support', capacity:10, therapist: therapist._id, members:[member._id] });
  console.log('Seed done. Users:', admin.email, therapist.email, member.email);
  process.exit(0);
}
seed();
