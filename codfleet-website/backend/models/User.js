const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
   name: { type: String,required: true, },
  password_hash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['freelancer', 'company' , 'institute'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'disabled'],
    default: 'pending',
  },
  verificationToken: { // Add this field
    type: String
  },
  isVerified: { // Add this field
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
   hasCompletedOnboarding: {
    type: Boolean,
    default: false, // new users haven’t filled the role form
  }
});

module.exports = mongoose.model('User', userSchema);
