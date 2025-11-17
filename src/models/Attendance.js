import mongoose from 'mongoose';
const attendanceSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'GTUser' },
  status: { type: String, enum: ['Present','Absent','Excused'], default: 'Present' },
}, { timestamps: true });
export default mongoose.model('Attendance', attendanceSchema);
