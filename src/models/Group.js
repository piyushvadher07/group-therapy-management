import mongoose from 'mongoose';
const groupSchema = new mongoose.Schema({
  name: String,
  description: String,
  capacity: Number,
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'GTUser' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GTUser' }]
}, { timestamps: true });
export default mongoose.model('Group', groupSchema);
