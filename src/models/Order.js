import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userEmail: String,
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
  address: {
    name: String,
    phone: String,
    line1: String,
    city: String,
    pincode: String,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
