import { connectDB } from '@/lib/mongoose'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  await connectDB()
  const { email, password } = await req.json()

  if (!email || !password) {
    return Response.json({ error: 'Missing fields' }, { status: 400 })
  }

  const existing = await User.findOne({ email })
  if (existing) {
    return Response.json({ error: 'User already exists' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({ email, password: hashed })

  return Response.json({ message: 'User created', userId: user._id })
}
