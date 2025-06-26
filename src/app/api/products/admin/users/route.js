import { connectDB } from '@/lib/mongoose'
import User from '@/models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 403 })
  }

  await connectDB()
  const users = await User.find({}, 'email role')
  return Response.json(users)
}

export async function PUT(req) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { email, role } = await req.json()
  await connectDB()
  await User.updateOne({ email }, { role })
  return Response.json({ message: 'Role updated' })
}
