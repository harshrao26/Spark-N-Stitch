import { connectDB } from '@/lib/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import Order from '@/models/Order';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  return Response.json(orders);
}
