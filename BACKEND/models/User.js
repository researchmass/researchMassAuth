import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  passportNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  passportCountry: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);