import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String, // for credentials only
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  provider: String, // 'credentials' or 'google'
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
