import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false, // Not required for OAuth users
  },
  image: String,
  subscription: {
    type: String,
    enum: ['free', 'trial', 'premium', 'cancelled'],
    default: 'trial'
  },
  institutionSubscription: {
    type: String,
    enum: ['free', 'trial', 'premium', 'cancelled'],
    default: 'free'
  },
  trialEndDate: {
    type: Date,
    default: function() {
      const now = new Date();
      now.setDate(now.getDate() + 7);
      return now;
    }
  },
  institutionTrialEndDate: {
    type: Date,
    default: null
  },
  paypalSubscriptionId: {
    type: String,
    default: null
  },
  subscriptionCancelledAt: {
    type: Date,
    default: null
  },
  assignmentsUsed: {
    type: Number,
    default: 0
  },
  assignmentsLimit: {
    type: Number,
    default: 3,
  },
  lastResetDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['student', 'professor', 'admin'],
    default: 'student',
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
})

// Reset assignment count monthly
userSchema.methods.resetAssignmentCount = function() {
  const now = new Date()
  const lastReset = new Date(this.lastResetDate)
  
  if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
    this.assignmentsUsed = 0
    this.lastResetDate = now
    return true
  }
  return false
}

// Check if user can create assignment
userSchema.methods.canCreateAssignment = function() {
  this.resetAssignmentCount()
  return this.assignmentsUsed < this.assignmentsLimit
}

// Increment assignment count
userSchema.methods.incrementAssignmentCount = function() {
  this.assignmentsUsed += 1
  this.updatedAt = new Date()
}

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User 