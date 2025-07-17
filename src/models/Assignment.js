import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String,
  submittedAt: Date,
  status: { type: String, enum: ['submitted', 'pending', 'graded'], default: 'pending' },
  grade: Number,
  feedback: String,
  plagiarismScore: Number,
})

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  dueDate: Date,
  submissions: [submissionSchema],
  status: { type: String, enum: ['active', 'closed'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema)

export default Assignment 