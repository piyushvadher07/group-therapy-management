import mongoose from 'mongoose';
const sessionSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  title: String,
  startsAt: Date,
  durationMinutes: Number,
  notes: String
}, { timestamps: true });
export default mongoose.model('Session', sessionSchema);
